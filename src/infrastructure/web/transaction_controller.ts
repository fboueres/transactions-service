import type { Request, Response } from "express";
import type { TransactionService } from "../../application/services/transaction_service";
import type { CreateTransactionDTO } from "../../application/dtos/create_transaction_dto";

export class TransactionController {
    constructor(
        private transactionService: TransactionService,
    ) {}

    async createTransaction(req: Request, res: Response): Promise<Response> {
        const transactionDTO: CreateTransactionDTO = {
            sendingAccountId: req.body.sending_account_id,
            receivingAccountId: req.body.receiving_account_id,
            amount: req.body.amount,
        };

        const transaction = await this
            .transactionService.createTransaction(transactionDTO);

        return res
            .status(201)
            .json({
                _links: `/transactions/${transaction.getId()}`,
                _embedded: {
                    sendig_account: {
                        _links: {
                            self: `/accounts/${transaction.getSendingAccount().getId()}`
                        },
                        id: transaction.getSendingAccount().getId(),
                        name: transaction.getSendingAccount().getName(),
                    },
                    receiving_account: {
                        _links: {
                            self: `/accounts/${transaction.getReceivingAccount().getId()}`
                        },
                        id: transaction.getReceivingAccount().getId(),
                        name: transaction.getReceivingAccount().getName(),
                    }
                }
            });
    }

    async deleteTransaction(req: Request, res: Response): Promise<Response> {
        await this.transactionService.deleteTransactionById(req.params.id);

        return res.status(204);
    }
}