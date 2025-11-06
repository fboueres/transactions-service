import { Account } from "../../domain/entities/account";
import { FakeAccountRepository } from "./fake_account_repository"

describe("FakeAccountRepository", () => {
    it("should a account by it's ID", async () => {
        const repository = new FakeAccountRepository();
        
        const account = await repository.findById("1");
        
        expect(account).not.toBeNull();
        expect(account).toBeInstanceOf(Account);
    });
});