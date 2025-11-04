import { ulid } from "ulid";
import { Account } from "../../../domain/entities/account";
import { AccountEntity } from "../entities/account_entity";
import { AccountMapper } from "./account_mapper";

describe("AccountMapper", () => {
    it("should map AccountEntity to Account", () => {
        const entity = new AccountEntity();
        entity.id = ulid();
        entity.name = "Account 1";
        
        const domain = AccountMapper.toDomain(entity);

        expect(domain).toBeInstanceOf(Account);
        expect(domain.getId()).toBe(entity.id);
        expect(domain.getName()).toBe(entity.name);
    });

    it("should map Account to AccountEntity", () => {
        const domain = new Account(
            ulid(),
            "Account 1",
        );

        const entity = AccountMapper.toPersistence(domain);

        expect(entity).toBeInstanceOf(AccountEntity);
        expect(entity.id).toBe(domain.getId());
        expect(entity.name).toBe(domain.getName());
    });
});