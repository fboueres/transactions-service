import { Account } from "../../domain/entities/account";
import { AccountService } from "./account_service";
import { CreateAccountDTO } from "../dtos/create_account_dto";
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

    it("should create a account and return it by ID", async () => {
        const accountDTO: CreateAccountDTO = {
            name: "Account 1",
        };

        const account = await accountService.createAccount(accountDTO);

        expect(account).not.toBeNull();
        expect(account).toBeInstanceOf(Account);
        expect(account.getId()).not.toBeNull();
        expect(account.getName()).toBe(accountDTO.name);

        const savedAccount = await accountService.findAccountById(account.getId());

        expect(savedAccount).not.toBeNull(),
        expect(savedAccount).toBeInstanceOf(Account);
        expect(savedAccount.getId()).toBe(account.getId());
        expect(savedAccount.getName()).toBe(account.getName());
    });
});