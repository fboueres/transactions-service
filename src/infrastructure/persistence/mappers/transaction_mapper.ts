import { Transaction } from "../../../domain/entities/transaction";
import { TransactionEntity } from "../entities/transaction_entity";
import { AccountMapper } from "./account_mapper";

export class TransactionMapper {
    static toDomain(entity: TransactionEntity): Transaction {
        return new Transaction(
            entity.id,
            AccountMapper.toDomain(entity.sending_account),
            AccountMapper.toDomain(entity.receiving_account),
            entity.amount,
        );
    }
    
    static toPersistente(domain: Transaction): TransactionEntity {
        const entity = new TransactionEntity();
        entity.id = domain.getId();
        entity.sending_account = AccountMapper.toPersistence(domain.getSendingAccount());
        entity.receiving_account = AccountMapper.toPersistence(domain.getReceivingAccount());
        entity.amount = domain.getAmount();
        return entity;
    }
}   