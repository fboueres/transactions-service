import { Account } from "../../../domain/entities/account";
import { AccountEntity } from "../entities/account_entity";

export class AccountMapper {
    static toDomain(entity: AccountEntity): Account {
        return new Account(
            entity.id,
            entity.name,
        );
    }

    static toPersistence(domain: Account): AccountEntity {
        const entity = new AccountEntity();
        entity.id = domain.getId();
        entity.name = domain.getName();
        return entity;
    }
}