import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import { AccountController} from "./account_controller";
import { AccountEntity } from "../persistence/entities/account_entity";
import { AccountRepository } from "../../domain/repositories/account_repository";
import { AccountService } from "../../application/services/account_service";
import { TypeORMAccountRepository } from "../repositories/typeorm_account_repository";
import { TransactionEntity } from "../persistence/entities/transaction_entity";

const app = express();

let dataSource: DataSource;
let accountRepository: AccountRepository;
let accountService: AccountService;
let accountController: AccountController;

app.use(express.json());

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
        dataSource.getRepository(AccountEntity)
    );

    accountService = new AccountService(accountRepository);

    accountController = new AccountController(
        accountService,
    );

    app.post("/accounts", (req, res, next) => {
        accountController.createAccount(req, res).catch((err) => next(err));
    });
});

afterAll(async () => {
    await dataSource.destroy();
});

describe("AccountController", () => {
    it("should create a account", async () => {
        const res = await request(app).post("/accounts").send({
            name: "Account 1",
        });

        expect(res.status).toBe(201);
        expect(res.body._links.self).not.toBeNull();
        expect(res.body.name).not.toBeNull();
    });
});