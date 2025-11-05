import { Repository } from "typeorm";
import { TransactionRepository } from "../../domain/repositories/transaction_repository";
import { TransactionEntity } from "../persistence/entities/transaction_entity";
import { TransactionMapper } from "../persistence/mappers/transaction_mapper";
import { Transaction } from "../../domain/entities/transaction";

export class TypeORMTransactionRepository implements TransactionRepository {
    private readonly repository: Repository<TransactionEntity>;

    constructor(repository: Repository<TransactionEntity>) {
        this.repository = repository;
    }

    async save(transaction: Transaction): Promise<void> {
        const transactionEntity = TransactionMapper.toPersistente(transaction);
        await this.repository.save(transactionEntity);        
    }

    async findById(id: string): Promise<Transaction | null> {
        const transactionEntity = await this.repository.findOne({
            where: { id },
            relations: ["sending_account", "receiving_account"],
        });
        return transactionEntity ? TransactionMapper.toDomain(transactionEntity) : null;
    }   
}