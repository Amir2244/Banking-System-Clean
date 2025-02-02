export interface AccountDto {
    accountId: string;
    balance: number;
    ownerName: string;
}

export interface TransactionDto {
    id: string;
    accountId: string;
    destinationAccountId?: string;
    amount: number;
    type: number;
    occurredOn: Date;
}
