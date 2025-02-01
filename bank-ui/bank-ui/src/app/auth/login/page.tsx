'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/api/authService';
import { LoginDto } from '../../../types/auth';
import { ValidationError } from '@/types/auth';


const initialFormState: LoginDto = {
    email: '',
    password: ''
};

export default function LoginPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [formData, setFormData] = useState<LoginDto>(initialFormState);
    const [errors, setErrors] = useState<ValidationError[]>([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.login(formData);
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
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
            <div className="w-full max-w-md px-6">
                <div className="bg-white/95 space-y-8 rounded-3xl p-8 shadow-2xl backdrop-blur-lg">
                    <div className="space-y-3 text-center">
                        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-gray-600 md:text-base">
                            Sign in to access your banking dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.length > 0 && (
                            <div className="border-l-4 rounded-lg border-red-500 bg-red-50 p-4">
                                {errors.map((error, index) => (
                                    <p className="text-sm font-medium text-red-700" key={`${error.propertyName}-${index}`}>
                                        {error.errorMessage}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="bg-white/80 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-medium text-white transition duration-200 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-200"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="pt-4 text-center">
                        <Link
                            href="/auth/register"
                            className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700"
                        >
                            New user? Create an account →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
