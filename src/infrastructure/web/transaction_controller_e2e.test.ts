import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import { AccountRepository } from "../../domain/repositories/account_repository";
import { AccountService } from "../../application/services/account_service";
import { AccountController } from "./account_controller";
import { TransactionService } from "../../application/services/transaction_service";
import { TransactionRepository } from "../../domain/repositories/transaction_repository";
import { AccountEntity } from "../persistence/entities/account_entity";
import { TransactionEntity } from "../persistence/entities/transaction_entity";
import { TypeORMAccountRepository } from "../repositories/typeorm_account_repository";
import { TypeORMTransactionRepository } from "../repositories/typeorm_transaction_repository";
import { TransactionController } from "../web/transaction_controller";

const app = express();

let dataSource: DataSource;
let accountController: AccountController;
let accountService: AccountService;
let accountRepository: AccountRepository;
let transactionController: TransactionController;
let transactionService: TransactionService;
let transactionRepository: TransactionRepository;

beforeAll(async () => {
    dataSource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [AccountEntity, TransactionEntity],
        synchronize: true,
        logging: false,
    });

    await dataSource.initialize();

    accountRepository = new TypeORMAccountRepository(
        dataSource.getRepository(AccountEntity),
    );
    accountService = new AccountService(accountRepository);
    accountController = new AccountController(
        accountService,
    );

    transactionRepository = new TypeORMTransactionRepository(
        dataSource.getRepository(TransactionEntity),
    );
    transactionService = new TransactionService(
        transactionRepository,
        accountService,
    );
    transactionController = new TransactionController(
        transactionService,
    );

    app.post("/accounts", (req, res, next) => {
        accountController.createAccount(req, res).catch((err) => next(err));
    });
    app.post("/transactions", (req, res, next) => {
        transactionController.createTransaction(req, res).catch((err) => next(err));
    });
    app.delete("/transactions/:id", (req, res, next) => {
        transactionController.deleteTransaction(req, res).catch((err) => next(err));
    });
});

afterAll(async () => {
    await dataSource.destroy();
});

describe("TransactionController E2E", () => {
    it("should create a transaction and retrieve it by ID", async () => {
        const sendingAccount = await request(app)
            .post("/accounts")
            .send({
                name: "Sending Account",
            });

        const receivingAccount = await request(app)
            .post("/accounts")
            .send({
                name: "Receiving Account",
            });
        
        const res = await request(app)
            .post("/transactions")
            .send({
                sending_account_id: sendingAccount.body.id,
                receiving_account_id: receivingAccount.body.id,
                amount: 500.00,
            });

        expect(res.status).toBe(201);
        expect(res.body._links.self).not.toBeNull();
        
        expect(res.body._embedded.sending_account._links.self)
            .toBe(`/accounts/${sendingAccount.body.id}`);
        expect(res.body._embedded.sending_account.id)
            .toBe(sendingAccount.body.id);
        expect(res.body._embedded.sending_account.name)
            .toBe(sendingAccount.body.name);
        
        expect(res.body._embedded.receiving_account._links.self)
            .toBe(`/accounts/${receivingAccount.body.id}`);
        expect(res.body._embedded.receiving_account.id)
            .toBe(sendingAccount.body.id);
        expect(res.body._embedded.receiving_account.name)
            .toBe(receivingAccount.body.name);

        expect(res.body.sending_account_id)
            .toBe(sendingAccount.body.id);
        expect(res.body.receiving_account_id)
            .toBe(receivingAccount.body.id);
        expect(res.body.amount).toBe(500);
    });

    
    it("should delete a transaction", async () => {
        const sendingAccount = await request(app)
            .post("/accounts")
            .send({
                name: "Sending Account",
            });

        const receivingAccount = await request(app)
            .post("/accounts")
            .send({
                name: "Receiving Account",
            });
        
        const transaction = await request(app)
            .post("/transactions")
            .send({
                sending_account_id: sendingAccount.body.id,
                receiving_account_id: receivingAccount.body.id,
                amount: 500.00,
            });

        const res = await request(app).delete(`/transactions${transaction.body.id}`);

        expect(res.status).toBe(204);
    });
});