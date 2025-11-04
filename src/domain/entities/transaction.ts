import { Account } from "./account";

export class Transaction {
    private readonly sendingAccount: Account;
    private readonly receivingAccount: Account;
    private readonly amount: number;

    constructor(
        sendingAccount: Account,
        receivingAccount: Account,
        amount: number,
    ) {
        this.sendingAccount = sendingAccount;
        this.receivingAccount = receivingAccount;
        this.amount = amount;
    }
}