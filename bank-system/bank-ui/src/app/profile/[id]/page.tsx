'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { accountService, AccountDto } from '@/services/api/accountService';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, CreditCardIcon, UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="relative flex flex-col items-center space-y-4">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white shadow-lg"></div>
            </div>
            <p className="text-lg font-medium text-blue-900">Loading your profile...</p>
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
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-8"
        >
          <div className="mx-auto max-w-5xl">
            <motion.button
                variants={itemVariants}
                onClick={() => router.back()}
                className="group mb-8 flex items-center space-x-2 rounded-xl bg-white/80 px-5 py-3 text-blue-700 shadow-lg backdrop-blur-sm transition-all hover:bg-blue-700 hover:text-white"
            >
              <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Return to Dashboard</span>
            </motion.button>

            <motion.div
                variants={itemVariants}
                className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl backdrop-blur-lg"
            >
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-8 pb-32">
                <div className="absolute inset-0 bg-white/10"></div>
                <div className="relative">
                  <h1 className="text-4xl font-bold text-white">Account Profile</h1>
                  <p className="mt-2 text-blue-100">Manage your account details and preferences</p>
                </div>
              </div>

              <div className="relative -mt-24 space-y-8 p-8">
                <motion.div
                    variants={itemVariants}
                    className="grid gap-6 md:grid-cols-3"
                >
                  <div className="flex items-start space-x-4 rounded-2xl bg-white p-6 shadow-lg">
                    <UserCircleIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account Holder</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{account?.ownerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl bg-white p-6 shadow-lg">
                    <CreditCardIcon className="h-8 w-8 text-indigo-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account ID</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{account?.accountId}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl bg-white p-6 shadow-lg">
                    <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account Status</p>
                      <p className="mt-1 text-lg font-semibold text-green-600">Active</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-blue-100">Available Balance</p>
                      <p className="mt-2 text-5xl font-bold">${account?.balance.toFixed(2)}</p>
                    </div>
                    <div className="hidden rounded-full bg-white/20 p-4 backdrop-blur-sm md:block">
                      <CreditCardIcon className="h-12 w-12 text-white" />
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
