import { Request, Response } from "express";
import { AccountService } from "../../application/services/account_service";
import type { CreateAccountDTO } from "../../application/dtos/create_account_dto";

export class AccountController {
    constructor(
        private accountService: AccountService,
    ) {}

    async createAccount(req: Request, res: Response): Promise<Response> {
        const accountDTO: CreateAccountDTO = {
            name: req.body.name,
        }
        
        const account = await this.accountService.createAccount(accountDTO);

        return res
            .status(201)
            .json({
                _links: `/accounts/${account.getId()}`,
                name: account.getName(),
            });
    }
}