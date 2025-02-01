'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'deposit' | 'withdraw' | 'transfer';
    onSubmit: (amount: number, destinationId?: string) => Promise<void>;
}

export const TransactionModal = ({ isOpen, onClose, type, onSubmit }: TransactionModalProps) => {
    const [amount, setAmount] = useState<number>(0);
    const [destinationId, setDestinationId] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(amount, type === 'transfer' ? destinationId : undefined);
        setAmount(0);
        setDestinationId('');
        onClose();
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-black/50 fixed inset-0 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-lg font-semibold text-gray-700">
                                    Amount
                                </label>
                                <div className="relative">
                                    <span className="-translate-y-1/2 absolute left-4 top-1/2 text-xl font-bold text-gray-500">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required
                                        className="border-2 w-full rounded-xl border-gray-200 bg-gray-50 px-10 py-4 text-xl font-bold text-gray-800 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        value={amount || ''}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {type === 'transfer' && (
                                <div className="space-y-2">
                                    <label className="block text-lg font-semibold text-gray-700">
                                        Destination Account ID
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="border-2 w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-4 text-lg font-semibold text-gray-800 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        value={destinationId}
                                        onChange={(e) => setDestinationId(e.target.value)}
                                        placeholder="Enter account ID"
                                    />
                                </div>
                            )}

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-bold text-white transition-all hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-200"
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 border-2 rounded-xl border-gray-200 py-4 text-lg font-bold text-gray-600 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
