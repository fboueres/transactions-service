import { ulid } from "ulid";
import { Account } from "../../domain/entities/account";
import { DataSource } from "typeorm";
import { AccountEntity } from "../persistence/entities/account_entity";
import { TypeORMAccountRepository } from "../repositories/typeorm_account_repository";
import { TransactionEntity } from "../persistence/entities/transaction_entity";

describe("TypeORMAccountRepository", () => {
    let dataSource: DataSource;
    let accountRepository: TypeORMAccountRepository;
    
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
    });
    
    afterAll(async () => {
        await dataSource.destroy();
    });
    
    it("should save a account and find it by ID", async () => {
        const account = new Account(
            ulid(),
            "Account 1",
        );
        await accountRepository.save(account);

        const savedAccount = await accountRepository.findById(account.getId());

        expect(savedAccount).not.toBeNull();
        expect(savedAccount?.getId()).toBe(account.getId());
        expect(savedAccount?.getName()).toBe(account.getName());        
    });
});