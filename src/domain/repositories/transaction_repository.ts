import { Transaction } from "../../domain/entities/transaction";

export interface TransactionRepository {
    save(transaction: Transaction): Promise<void>;
    findById(id: string): Promise<Transaction | null>;
}