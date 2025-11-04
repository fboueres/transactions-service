import { Account } from "./account";
import { Transaction } from "./transaction";

describe("Transaction Entity", () => {
    it("should create a transaction instance", () => {
        const sendingAccount = new Account("Sending Account");
        const receivingAccount = new Account("Receiving Account");

        const transaction = new Transaction(
            sendingAccount,
            receivingAccount,
            500.00
        );

        expect(transaction).toBeInstanceOf(Transaction);
    });
});