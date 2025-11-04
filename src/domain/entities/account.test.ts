import { Account } from "./account";

describe("Account Entity", () => {
    it("should create a Account instance", () => {
        const account = new Account(
            "id",
            "Name of the Account",
        );

        expect(account).toBeInstanceOf(Account);
    });

    it("should return a Account ID", () => {
        const account = new Account(
            "id",
            "Name of the Account",
        );

        expect(account.getId()).toBe("id");
    });

    it("should return a Account name", () => {
        const account = new Account(
            "id",
            "Name of the Account",
        );

        expect(account.getName()).toBe("Name of the Account");
    });
});