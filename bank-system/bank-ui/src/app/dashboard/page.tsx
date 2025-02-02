'use client';

import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { UserCircleIcon, ArrowDownIcon, ArrowUpIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
import { accountService } from '@/services/api/accountService';
import { TransactionModal } from '@/components/features/transactions/TransactionModal';
import { ValidationError } from '@/types/auth';
import { AnimatePresence, motion } from 'framer-motion';
import {AccountDto, TransactionDto} from "@/types/user";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};

const accountFetcher = async () => accountService.getMyAccount();
const transactionsFetcher = async () => accountService.getTransactions();

export default function DashboardPage() {
    const [modalType, setModalType] = useState<'deposit' | 'withdraw' | 'transfer' | null>(null);
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const { data: account, mutate: mutateAccount } = useSWR<AccountDto>('account', accountFetcher, {
        refreshInterval: 5000,
        revalidateOnFocus: false
    });

    const { data: transactions, mutate: mutateTransactions } = useSWR<TransactionDto[]>('transactions', transactionsFetcher, {
        refreshInterval: 5000,
        revalidateOnFocus: false
    });

    const handleTransaction = async (amount: number, destinationId?: string) => {
        try {
            if (modalType === 'deposit') await accountService.deposit(amount);
            else if (modalType === 'withdraw') await accountService.withdraw(amount);
            else if (modalType === 'transfer' && destinationId) await accountService.transfer(destinationId, amount);

            await Promise.all([mutateAccount(), mutateTransactions()]);
            setModalType(null);
            setErrors([]);
        } catch (error: any) {
            const validationErrors = error?.validationErrors || [];
            setErrors(Array.isArray(validationErrors) ? validationErrors : []);
        }
    };

    if (!account || !transactions) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="relative flex flex-col items-center space-y-4">
                    <div className="h-20 w-20 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white shadow-lg"></div>
                    </div>
                    <p className="text-lg font-medium text-blue-900">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6"
            >
                <AnimatePresence>
                    {errors.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-4 right-4 z-50"
                        >
                            <div className="rounded-xl bg-white/80 backdrop-blur-sm border-l-4 border-red-500 p-4 shadow-lg">
                                {errors.map((error, index) => (
                                    <p className="text-sm font-medium text-red-700" key={`${error.propertyName}-${index}`}>
                                        {error.errorMessage}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mx-auto max-w-7xl space-y-8">
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="mb-2 text-xl font-bold text-blue-100">Total Balance</h2>
                                <div className="text-5xl font-extrabold text-white">
                                    ${account.balance.toFixed(2)}
                                </div>
                            </div>
                            <Link href={`/profile/${account.accountId}`}>
                                <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20">
                                    <UserCircleIcon className="h-8 w-8 text-white" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                        <button
                            onClick={() => setModalType('deposit')}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
                        >
                            <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />
                            <ArrowDownIcon className="mx-auto mb-2 h-8 w-8" />
                            <span>Deposit</span>
                        </button>
                        <button
                            onClick={() => setModalType('withdraw')}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
                        >
                            <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />
                            <ArrowUpIcon className="mx-auto mb-2 h-8 w-8" />
                            <span>Withdraw</span>
                        </button>
                        <button
                            onClick={() => setModalType('transfer')}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
                        >
                            <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />
                            <ArrowsRightLeftIcon className="mx-auto mb-2 h-8 w-8" />
                            <span>Transfer</span>
                        </button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
                    >
                        <h2 className="mb-6 text-2xl font-bold text-gray-800">Recent Transactions</h2>
                        <div className="divide-y divide-gray-100">
                            {transactions.map((transaction, index) => {
                                const isDeposit = transaction.type === 0;
                                const isWithdraw = transaction.type === 1;
                                const isTransfer = transaction.type === 2;
                                const isReceivedTransfer = isTransfer && transaction.destinationAccountId === account.accountId;
                                const isSentTransfer = isTransfer && transaction.accountId === account.accountId;

                                const formattedDate = new Date(transaction.occurredOn).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZone: 'UTC'
                                });

                                const transactionType = isDeposit
                                    ? 'Deposit'
                                    : isWithdraw
                                        ? 'Withdrawal'
                                        : isReceivedTransfer
                                            ? 'Received Transfer'
                                            : isSentTransfer
                                                ? 'Sent Transfer'
                                                : 'Transfer';

                                const isPositiveTransaction = isDeposit || isReceivedTransfer;

                                return (
                                    <motion.div
                                        key={`${transaction.id}-${index}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="group flex items-center justify-between py-4 transition-all hover:bg-white/50"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`rounded-full p-3 transition-colors ${
                                                    isPositiveTransaction
                                                        ? 'bg-green-100 text-green-600 group-hover:bg-green-200'
                                                        : 'bg-red-100 text-red-600 group-hover:bg-red-200'
                                                }`}
                                            >
                                                {isPositiveTransaction ? <ArrowDownIcon className="h-6 w-6" /> : <ArrowUpIcon className="h-6 w-6" />}
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-gray-800">{transactionType}</p>
                                                <p className="text-sm font-medium text-gray-500">{formattedDate}</p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xl font-extrabold ${
                                                isPositiveTransaction ? 'text-green-600' : 'text-red-600'
                                            }`}
                                        >
                      {isPositiveTransaction ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <TransactionModal
                    isOpen={modalType !== null}
                    onClose={() => setModalType(null)}
                    type={modalType || 'deposit'}
                    onSubmit={handleTransaction}
                />
            </motion.div>
        </AnimatePresence>
    );
}
