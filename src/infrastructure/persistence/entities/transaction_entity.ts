import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { AccountEntity } from "./account_entity";

@Entity("transactions")
export class TransactionEntity {
    @PrimaryColumn("varchar", { length: 26 })
    id!: string;

    @ManyToOne(() => AccountEntity, (account) => account.sent_transactions)
    @JoinColumn({ name: "sending_account_id"})
    sending_account!: AccountEntity;
    
    @ManyToOne(() => AccountEntity, (account) => account.received_transactions)
    @JoinColumn({ name: "receiving_account_id"})
    receiving_account!: AccountEntity;

    @Column("decimal")
    amount!: number;

}