import { Account } from "./account";

export class Transaction {
    private readonly id: string;
    private readonly sending_account: Account;
    private readonly receiving_account: Account;
    private readonly amount: number;

    constructor(
        id: string,
        sending_account: Account,
        receiving_account: Account,
        amount: number,
    ) {
        this.id = id;
        this.sending_account = sending_account;
        this.receiving_account = receiving_account;
        this.amount = amount;
    }

    getId(): string {
        return this.id;
    }

    getSendingAccount(): Account {
        return this.sending_account;
    }

    getReceivingAccount(): Account {
        return this.receiving_account;
    }

    getAmount(): number {
        return this.amount;
    }
}