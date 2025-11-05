import { ulid } from "ulid";
import { TransactionEntity } from "../entities/transaction_entity";
import { AccountEntity } from "../entities/account_entity";
import { Transaction } from "../../../domain/entities/transaction";
import { Account } from "../../../domain/entities/account";
import { TransactionMapper } from "./transaction_mapper";

describe("TransactionMapper", () => {
    it("should map TransactionEntity to Transaction", () => {
        const sending_account = new AccountEntity();
        sending_account.id = ulid();
        sending_account.name = "Sending Account";
        const receiving_account = new AccountEntity();
        receiving_account.id = ulid();
        receiving_account.name = "Receiving Account";
        const entity = new TransactionEntity();
        entity.id = ulid();
        entity.sending_account = sending_account;
        entity.receiving_account = receiving_account;
        entity.amount = 500.00;

        const domain = TransactionMapper.toDomain(entity);

        expect(domain).toBeInstanceOf(Transaction);
        expect(domain.getId()).toBe(entity.id);
        expect(
            domain.getSendingAccount().getId()
        ).toBe(
            entity.sending_account.id
        );
        expect(
            domain.getReceivingAccount().getId()
        ).toBe(
            entity.receiving_account.id
        );
        expect(domain.getAmount()).toBe(entity.amount);
    });

    it("should map Transaction to TransactionEntity", () => {
        const sending_account = new Account(
            ulid(),
            "Sending Account",
        );
        const receiving_account = new Account(
            ulid(),
            "Receiving Account",
        );
        const domain = new Transaction(
            ulid(),
            sending_account,
            receiving_account,
            500.00,
        );

        const entity = TransactionMapper.toPersistente(domain);

        expect(entity).toBeInstanceOf(TransactionEntity);
        expect(entity.id).toBe(domain.getId());
        expect(
            entity.sending_account.id
        ).toBe(
            domain.getSendingAccount().getId()
        );
        expect(
            entity.receiving_account.id
        ).toBe(
            domain.getReceivingAccount().getId()
        );
        expect(entity.amount).toBe(domain.getAmount());
    });
});