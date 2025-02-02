'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { accountService, AccountDto } from '@/services/api/accountService';
import Cookies from 'js-cookie';

export default function DashboardLayout({
                                            children
                                        }: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const [accountData, setAccountData] = useState<AccountDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccountData();
    }, []);

    const loadAccountData = async () => {
        try {
            const data = await accountService.getMyAccount();
            setAccountData(data);
        } catch (error) {
            handleLogout();
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        const sessionId = sessionStorage.getItem('sessionId');
        if (sessionId) {
            Cookies.remove(`token-${sessionId}`);
        }
        sessionStorage.removeItem('sessionId');
        localStorage.clear();
        router.push('/auth/login');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="relative flex flex-col items-center space-y-4">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-white shadow-lg"></div>
                    </div>
                    <p className="text-lg font-medium text-blue-900">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center"
                        >
                            <Link href="/dashboard" className="flex items-center space-x-3">
                                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2">
                                    <UserCircleIcon className="h-8 w-8 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Banking Dashboard
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-6"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">
                                        {accountData?.ownerName?.[0]?.toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-gray-700 font-medium">
                                    {accountData?.ownerName}
                                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="group flex items-center space-x-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-white transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
                            >
                                <span>Logout</span>
                                <ArrowRightOnRectangleIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
