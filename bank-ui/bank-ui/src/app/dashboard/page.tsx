'use client';

import { useEffect, useState } from 'react';
import { accountService, AccountDto, TransactionDto } from '@/services/api/accountService';
import { TransactionModal } from '@/components/features/transactions/TransactionModal';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [account, setAccount] = useState<AccountDto | null>(null);
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | 'transfer' | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [accountData, transactionsData] = await Promise.all([
        accountService.getMyAccount(),
        accountService.getTransactions()
      ]);
      setAccount(accountData);
      setTransactions(transactionsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const handleTransaction = async (amount: number, destinationId?: string) => {
    try {
      if (modalType === 'deposit') await accountService.deposit(amount);
      else if (modalType === 'withdraw') await accountService.withdraw(amount);
      else if (modalType === 'transfer' && destinationId) await accountService.transfer(destinationId, amount);
      await loadData();
      setModalType(null);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="flex flex-col items-center">
          <div className="border-4 h-16 w-16 animate-spin rounded-full border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
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
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8"
      >
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Balance Card */}
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-2xl transition-transform duration-300 hover:scale-105"
          >
            <h2 className="mb-2 text-xl font-bold text-blue-100">Total Balance</h2>
            <div className="text-5xl font-extrabold text-white">
              ${account?.balance.toFixed(2)}
            </div>
          </motion.div>

          {/* Transaction Actions */}
          <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <button
              onClick={() => setModalType('deposit')}
              className="group flex flex-col items-center justify-center rounded-xl bg-green-500 p-6 text-lg font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <span className="mb-2 text-3xl">↓</span>
              <span>Deposit</span>
            </button>
            <button
              onClick={() => setModalType('withdraw')}
              className="group flex flex-col items-center justify-center rounded-xl bg-red-500 p-6 text-lg font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <span className="mb-2 text-3xl">↑</span>
              <span>Withdraw</span>
            </button>
            <button
              onClick={() => setModalType('transfer')}
              className="group flex flex-col items-center justify-center rounded-xl bg-blue-500 p-6 text-lg font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span className="mb-2 text-3xl">↔</span>
              <span>Transfer</span>
            </button>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Recent Transactions</h2>
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction, index) => {
                const isDeposit = transaction.type === 0;
                const isWithdraw = transaction.type === 1;
                const formattedDate = new Date(transaction.occurredOn).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC'
                });
                return (
                  <motion.div
                    key={`${transaction.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between py-4 transition-colors duration-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`rounded-full p-3 ${
                          isDeposit
                            ? 'bg-green-100 text-green-600'
                            : isWithdraw
                            ? 'bg-red-100 text-red-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        <span className="text-xl font-bold">
                          {isDeposit ? '↓' : isWithdraw ? '↑' : '↔'}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">
                          {isDeposit ? 'Deposit' : isWithdraw ? 'Withdrawal' : 'Transfer'}
                        </p>
                        <p className="text-sm font-semibold text-gray-500">{formattedDate}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xl font-extrabold ${
                        isDeposit ? 'text-green-600' : isWithdraw ? 'text-red-600' : 'text-blue-600'
                      }`}
                    >
                      {isDeposit ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
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
