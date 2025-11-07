import { Account } from "../../domain/entities/account";
import { AccountRepository } from "../../domain/repositories/account_repository";

export class FakeAccountRepository implements AccountRepository {
    private accounts: Account[] = [
        new Account(
            "1",
            "Account 1"
        ),
        new Account(
            "2",
            "Account 2"
        ),
    ];
    
    async save(account: Account): Promise<void> {
        this.accounts.push(account);
    }

    async findById(id: string): Promise<Account> {
        const account = this.accounts.find((account) => account.getId() === id);

        if (account == undefined) {
            throw new Error("No account was found.")
        } else {
            return account;
        }
    }
}