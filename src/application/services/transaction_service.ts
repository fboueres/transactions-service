import { ulid } from "ulid";
import { Transaction } from "../../domain/entities/transaction";
import { TransactionRepository } from "../../domain/repositories/transaction_repository";
import { CreateTransactionDTO } from "../dtos/create_transaction_dto";
import { AccountService } from "./account_service";

export class TransactionService {
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly accountService: AccountService,
    ) {}

    async createTransaction(dto: CreateTransactionDTO): Promise<Transaction> {
        const sendingAccount = await this.accountService.findAccountById(
            dto.sendingAccountId
        );
        const receivingAccount = await this.accountService.findAccountById(
            dto.receivingAccountId
        );

        const transaction = new Transaction(
            ulid(),
            sendingAccount,
            receivingAccount,
            dto.amount,
        );

        await this.transactionRepository.save(transaction);
        return transaction;
    }

    async findTransactionById(id: string): Promise<Transaction | null> {
        return this.transactionRepository.findById(id);
    }
    
    async deleteTransactionById(id: string): Promise<void> {
        return this.transactionRepository.deleteById(id);
    }
}