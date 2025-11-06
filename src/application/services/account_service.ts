import type { Account } from "../../domain/entities/account";
import type { AccountRepository } from "../../domain/repositories/account_repository";

export class AccountService {
    constructor(
        private readonly accountRepository: AccountRepository,
    ) {}

    async findAccountById(id: string): Promise<Account> {
        return this.accountRepository.findById(id);
    }
}