import type { Transaction } from "./transaction";

export class Account {
    private readonly id: string;
    private readonly name: string;
    private readonly sent_transactions: Transaction[] = [];
    private readonly received_transactions: Transaction[] = [];

    constructor(
        id: string,
        name: string,
    ) {
        this.id = id;
        this.name = name;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}