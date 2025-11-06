import type { Transaction } from "../../domain/entities/transaction";
import type { TransactionRepository } from "../../domain/repositories/transaction_repository";

export class FakeTransactionRepository implements TransactionRepository {
    private transactions: Transaction[] = [];
    
    async save(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    }

    async findById(id: string): Promise<Transaction | null> {
        return this.transactions.find(
            (transaction) => transaction.getId() === id
        ) || null;
    }
}