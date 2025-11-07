import { ulid } from "ulid";
import { Account } from "../../domain/entities/account";
import { AccountRepository } from "../../domain/repositories/account_repository";
import { CreateAccountDTO } from "../dtos/create_account_dto";

export class AccountService {
    constructor(
        private readonly accountRepository: AccountRepository,
    ) {}

    async createAccount(dto: CreateAccountDTO): Promise<Account> {
        const account = new Account(
            ulid(),
            dto.name,
        );

        await this.accountRepository.save(account);
        return account;
    }

    async findAccountById(id: string): Promise<Account> {
        return this.accountRepository.findById(id);
    }
}