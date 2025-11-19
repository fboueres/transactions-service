import { ulid } from "ulid";
import { Account } from "../../domain/entities/account";
import { FakeTransactionRepository } from "./fake_transaction_repository";
import { Transaction } from "../../domain/entities/transaction";

describe("FakeTransactionRepository", () => {
    it("should save a transaction and return it by ID", async () => {
        const sendingAccount = new Account(
            ulid(),
            "Sending Account",
        );
        const receivingAccount = new Account(
            ulid(),
            "Receiving Account",
        );
        const transaction = new Transaction(
            ulid(),
            sendingAccount,
            receivingAccount,
            500.00
        );
        const repository = new FakeTransactionRepository();

        await repository.save(transaction);

        const savedTransaction = await repository.findById(transaction.getId());

        expect(savedTransaction).not.toBeNull();
        expect(savedTransaction).toBeInstanceOf(Transaction);
        expect(savedTransaction?.getId()).toBe(transaction.getId());
        expect(savedTransaction?.getSendingAccount().getId()).toBe(transaction.getSendingAccount().getId());
        expect(savedTransaction?.getId()).toBe(transaction.getId());
        expect(savedTransaction?.getAmount()).toBe(transaction.getAmount());
    });
    
    it("should delete a transaction by it's ID", async () => {
        const sendingAccount = new Account(
            ulid(),
            "Sending Account",
        );
        const receivingAccount = new Account(
            ulid(),
            "Receiving Account",
        );
        const transaction = new Transaction(
            ulid(),
            sendingAccount,
            receivingAccount,
            500.00
        );
        const repository = new FakeTransactionRepository();

        await repository.save(transaction);

        expect(repository.deleteById(transaction.getId())).resolves.not.toThrow();
    });
});