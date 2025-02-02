import {httpClient} from '../http-client';
import {AccountDto, TransactionDto} from "@/types/user";



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
