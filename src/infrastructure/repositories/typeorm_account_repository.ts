import type { Repository } from "typeorm";
import type { AccountRepository } from "../../domain/repositories/account_repository";
import type { AccountEntity } from "../persistence/entities/account_entity";
import type { Account } from "../../domain/entities/account";
import { AccountMapper } from "../persistence/mappers/account_mapper";

export class TypeORMAccountRepository implements AccountRepository {
    private readonly repository: Repository<AccountEntity>;

    constructor(repository: Repository<AccountEntity>) {
        this.repository = repository;
    }

    async save(account: Account): Promise<void> {
        const accountEntity = AccountMapper.toPersistence(account);
        await this.repository.save(accountEntity);
    }

    async findById(id: string): Promise<Account> {
        const accountEntity = await this.repository.findOne({
            where: { id },
            relations: ["sent_transactions", "received_transactions"],
        });
        
        if (!accountEntity) {
            throw new Error("No account was found.");
        }

        return AccountMapper.toDomain(accountEntity);
    }
}