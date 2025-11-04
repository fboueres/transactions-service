import { Account } from "./account";
import { Transaction } from "./transaction";

describe("Transaction Entity", () => {
    it("should create a transaction instance", () => {
        const sendingAccount = new Account("1", "Sending Account");
        const receivingAccount = new Account("2", "Receiving Account");

        const transaction = new Transaction(
            sendingAccount,
            receivingAccount,
            500.00
        );

        expect(transaction).toBeInstanceOf(Transaction);
    });
});