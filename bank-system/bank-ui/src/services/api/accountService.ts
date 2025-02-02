import {httpClient} from '../http-client';

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


export const accountService = {
    getMyAccount: async () => {
        const response = await httpClient.get<AccountDto>('/api/accounts/mine');
        return response.data;
    },

    getTransactions: async () => {
        const response = await httpClient.get<TransactionDto[]>('/api/accounts/transactions');
        return response.data;
    },

    deposit: async (amount: number) => {
        return httpClient.post('/api/accounts/deposit', {amount});
    },

    withdraw: async (amount: number) => {
        return httpClient.post('/api/accounts/withdraw', {amount});
    },

    transfer: async (destinationAccountId: string, amount: number) => {
        return httpClient.post('/api/accounts/transfer', {
            destinationAccountId,
            amount
        });
    }
};
