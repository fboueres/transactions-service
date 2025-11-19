import { ulid } from "ulid";
import { Account } from "../../domain/entities/account";
import { AccountEntity } from "../persistence/entities/account_entity";
import { Transaction } from "../../domain/entities/transaction";
import { DataSource } from "typeorm";
import { TransactionEntity } from "../persistence/entities/transaction_entity";
import { TypeORMTransactionRepository} from "./typeorm_transaction_repository";

describe("TypeORMTransactionRepository", () => {
    let dataSource: DataSource;
    let transactionRepository: TypeORMTransactionRepository;

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
        transactionRepository = new TypeORMTransactionRepository(
            dataSource.getRepository(TransactionEntity),
        );
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it("should save a transaction and find it by ID", async () => {
        const accountRepository = dataSource.getRepository(AccountEntity);
        
        const sendingAccountEntity_id = ulid();
        const sendingAccountEntity = accountRepository.create({
            id: sendingAccountEntity_id,
            name: "Sending Account"
        });
        await accountRepository.save(sendingAccountEntity);
        const sendingAccount = new Account(
            sendingAccountEntity_id,
            "Sending Account"
        );

        const receivingAccountEntity_id = ulid();
        const receivingAccountEntity = accountRepository.create({
            id: receivingAccountEntity_id,
            name: "Receiving Account"
        });
        await accountRepository.save(receivingAccountEntity);
        const receivingAccount = new Account(
            receivingAccountEntity_id,
            "Receiving Account"
        );
        
        const transaction = new Transaction(
            ulid(),
            sendingAccount,
            receivingAccount,
            500.00
        );
        await transactionRepository.save(transaction);

        const savedTransaction = await transactionRepository.findById(transaction.getId());
        
        expect(savedTransaction).not.toBeNull();
        expect(savedTransaction?.getId()).toBe(transaction.getId());
        expect(
            savedTransaction?.getReceivingAccount().getId()
        ).toBe(
            transaction.getReceivingAccount().getId()
        );
        expect(
            savedTransaction?.getSendingAccount().getId()
        ).toBe(
            transaction.getSendingAccount().getId()
        );
        expect(savedTransaction?.getAmount()).toBe(transaction.getAmount())
    });

    it("should delete a transaction by it's ID", async () => {
        const accountRepository = dataSource.getRepository(AccountEntity);
        
        const sendingAccountEntity_id = ulid();
        const sendingAccountEntity = accountRepository.create({
            id: sendingAccountEntity_id,
            name: "Sending Account"
        });
        await accountRepository.save(sendingAccountEntity);
        const sendingAccount = new Account(
            sendingAccountEntity_id,
            "Sending Account"
        );

        const receivingAccountEntity_id = ulid();
        const receivingAccountEntity = accountRepository.create({
            id: receivingAccountEntity_id,
            name: "Receiving Account"
        });
        await accountRepository.save(receivingAccountEntity);
        const receivingAccount = new Account(
            receivingAccountEntity_id,
            "Receiving Account"
        );
        
        const transaction = new Transaction(
            ulid(),
            sendingAccount,
            receivingAccount,
            500.00
        );
        await transactionRepository.save(transaction);

        expect(transactionRepository.deleteById(transaction.getId())).resolves.not.toThrow();
    });
});