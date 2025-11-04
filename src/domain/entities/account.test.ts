import { Account } from "./account";

describe("Account Entity", () => {
    it("should create a Account instance", () => {
        const account = new Account(
            "Name of the Account",
        );

        expect(account).toBeInstanceOf(Account);
    });
});