'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
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

export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="container mx-auto px-6 py-16 relative">
          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center min-h-[80vh] text-center"
          >
            <motion.div
                variants={itemVariants}
                className="max-w-4xl mb-16"
            >
              <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600">
                Welcome to the Future of Banking
              </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Banking Made Simple
              </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                Experience the next generation of digital banking with seamless transactions,
                real-time tracking, and enhanced security.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/auth/login">
                  <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(79, 70, 229, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl transition-all duration-200 shadow-[0_5px_15px_-3px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)]"
                  >
                    <span className="relative z-10">Get Started Now</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </Link>

                <Link href="/auth/register">
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200 shadow-lg border border-blue-100 hover:border-blue-200"
                  >
                    Create Free Account
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
            >
              {[
                {
                  icon: ShieldCheckIcon,
                  title: 'Enterprise Security',
                  description: 'Bank-grade encryption and advanced security protocols to protect your assets'
                },
                {
                  icon: BanknotesIcon,
                  title: 'Instant Transfers',
                  description: 'Send and receive money globally with zero delays and minimal fees'
                },
                {
                  icon: ChartBarIcon,
                  title: 'Smart Analytics',
                  description: 'Track your spending patterns and optimize your financial decisions'
                }
              ].map((feature, index) => (
                  <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-indigo-50"
                  >
                    <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
}
