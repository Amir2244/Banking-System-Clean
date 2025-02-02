'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { accountService, AccountDto } from '@/services/api/accountService';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [account, setAccount] = useState<AccountDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountData = await accountService.getMyAccount();
        setAccount(accountData);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [id]);

  if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-lg font-medium text-blue-800">Loading profile details...</p>
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
            className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8"
        >
          <div className="mx-auto max-w-4xl">
            <motion.button
                variants={itemVariants}
                onClick={() => router.back()}
                className="group mb-8 flex items-center space-x-2 rounded-lg px-4 py-2 text-blue-600 transition-colors hover:text-blue-800"
            >
              <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Dashboard</span>
            </motion.button>

            <motion.div
                variants={itemVariants}
                className="overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
                <h1 className="text-3xl font-bold text-white">Profile Information</h1>
              </div>

              <div className="divide-y divide-gray-100 p-8">
                <motion.div
                    variants={itemVariants}
                    className="space-y-8 py-6"
                >
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="rounded-2xl bg-blue-50 p-6">
                      <p className="text-sm font-medium text-blue-600">Account ID</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">{account?.accountId}</p>
                    </div>

                    <div className="rounded-2xl bg-indigo-50 p-6">
                      <p className="text-sm font-medium text-indigo-600">Owner Name</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">{account?.ownerName}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
                    <p className="text-sm font-medium text-blue-100">Current Balance</p>
                    <p className="mt-2 text-4xl font-bold">${account?.balance.toFixed(2)}</p>
                  </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="py-6"
                >
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">Account Status</h2>
                  <div className="rounded-xl bg-green-50 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <p className="text-sm font-medium text-green-800">Active</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
  );
}
