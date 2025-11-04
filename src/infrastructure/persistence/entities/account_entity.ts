import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { TransactionEntity } from "./transaction_entity";

@Entity("accounts")
export class AccountEntity {
    @PrimaryColumn("varchar", { length: 26})
    id!: string;

    @Column("name")
    name!: string;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.sending_account)
    sent_transactions!: TransactionEntity[];

    @OneToMany(() => TransactionEntity, (transaction) => transaction.receiving_account)
    received_transactions!: TransactionEntity[];
}