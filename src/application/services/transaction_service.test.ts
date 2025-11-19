import { Transaction } from "../../domain/entities/transaction";
import { CreateTransactionDTO } from "../dtos/create_transaction_dto";
import { AccountService } from "./account_service";
import { TransactionService } from "./transaction_service";
import { FakeTransactionRepository } from "../../infrastructure/repositories/fake_transaction_repository";

jest.mock("./account_service");

describe("TransactionService", () => {
    let transactionService: TransactionService;
    let fakeTransactionRepository: FakeTransactionRepository;
    let mockAccountService: jest.Mocked<AccountService>;

    beforeEach(() => {
        jest.clearAllMocks();

        const mockSendingAccount = {
            getId: jest.fn().mockReturnValue("1"),
        } as any;
        
        const mockReceivingAccount = {
            getId: jest.fn().mockReturnValue("2"),
        } as any;
        
        mockAccountService = {
            findAccountById: jest.fn(),
        } as any;
        
        mockAccountService.findAccountById
            .mockImplementation(
                (id: string) => {
                    switch (id) {
                        case "1":
                            return Promise.resolve(mockSendingAccount);
                        case "2":
                            return Promise.resolve(mockReceivingAccount);
                        default:
                            throw new Error("No account was found.")    
                    }
                }
            );
        
        fakeTransactionRepository = new FakeTransactionRepository();

        transactionService = new TransactionService(
            fakeTransactionRepository,
            mockAccountService,
        );

    });
    
    it("should create a transaction and return it by ID", async () => {
        const transactionDTO: CreateTransactionDTO = {
            sendingAccountId: "1",
            receivingAccountId: "2",
            amount: 500.00,
        };
        
        const result = await transactionService.createTransaction(transactionDTO);

        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(Transaction);
        expect(result?.getSendingAccount().getId()).toBe(transactionDTO.sendingAccountId);
        expect(result?.getReceivingAccount().getId()).toBe(transactionDTO.receivingAccountId);
        expect(result?.getAmount()).toBe(transactionDTO.amount);

        const savedResult = await transactionService.findTransactionById(result.getId());

        expect(savedResult).not.toBeNull();
        expect(savedResult).toBeInstanceOf(Transaction);
        expect(savedResult?.getId()).toBe(result?.getId());
        expect(savedResult?.getSendingAccount().getId()).toBe(result?.getSendingAccount().getId());
        expect(savedResult?.getReceivingAccount().getId()).toBe(result?.getReceivingAccount().getId());
        expect(savedResult?.getAmount()).toBe(result?.getAmount());
    });

    it("should delete a transaction by ID", async () => {
        const transactionDTO: CreateTransactionDTO = {
            sendingAccountId: "1",
            receivingAccountId: "2",
            amount: 500.00,
        };
        
        const transaction = await transactionService.createTransaction(transactionDTO);

        expect(await transactionService.deleteTransactionById(transaction.getId())).resolves.not.toThrow();
    });
});