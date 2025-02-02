'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/api/authService';
import { RegisterDto } from '@/types/auth';
import { ValidationError } from '@/types/auth';


const initialFormState: RegisterDto = {
    email: '',
    userName: '',
    password: '',
    ownerName: '',
    initialBalance: 0
};

export default function RegisterPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [formData, setFormData] = useState<RegisterDto>(initialFormState);
    const [errors, setErrors] = useState<ValidationError[]>([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            router.push('/dashboard');
        } catch (error: any) {
            const validationErrors = error?.validationErrors || [];
            setErrors(Array.isArray(validationErrors) ? validationErrors : []);
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
            <div className="w-full max-w-2xl px-6 py-8">
                <div className="bg-white/95 space-y-8 rounded-3xl p-8 shadow-2xl backdrop-blur-lg">
                    <div className="space-y-3 text-center">
                        <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                            Create Your Account
                        </h1>
                        <p className="text-sm text-gray-600 md:text-base">
                            Join our secure banking platform
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {errors.length > 0 && (
                            <div className="border-l-4 rounded-lg border-red-500 bg-red-50 p-4">
                                {errors.map((error, index) => (
                                    <p className="text-sm font-medium text-red-700" key={`${error.propertyName}-${index}`}>
                                        {error.errorMessage}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div className="grid-cols-1 grid gap-6 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="johndoe"
                                    value={formData.userName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="John Doe"
                                    value={formData.ownerName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Initial Deposit</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="0.00"
                                    value={formData.initialBalance}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        initialBalance: parseFloat(e.target.value)
                                    }))}
                                />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full transform rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 font-medium text-white transition duration-200 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 focus:ring-2 focus:ring-purple-200"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="pt-4 text-center">
                        <Link
                            href="/auth/login"
                            className="font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-700"
                        >
                            Already have an account? Sign in →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
