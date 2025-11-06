import { ulid } from "ulid";
import { Account } from "../../domain/entities/account";
import { AccountService } from "./account_service";
import { FakeAccountRepository } from "../../infrastructure/repositories/fake_account_repository";

describe("AccountService", () => {
    let accountService: AccountService;
    let fakeAccountRepository: FakeAccountRepository;

    beforeEach(() => {
        fakeAccountRepository = new FakeAccountRepository();

        accountService = new AccountService(
            fakeAccountRepository,
        );
    });

    it("should return a account by it's ID", async () => {
        const account = await accountService.findAccountById("1");

        expect(account).not.toBeNull(),
        expect(account).toBeInstanceOf(Account);
    });
});