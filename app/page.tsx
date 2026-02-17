import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AuthButton from '@/components/AuthButton';

export default async function Home() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect('/dashboard');
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <div className="inline-block p-4 rounded-2xl glass mb-4">
                        <svg
                            className="w-16 h-16 text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Smart Bookmarks
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Save, organize, and access your favorite links from anywhere
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                    <div className="glass rounded-xl p-4 flex items-start space-x-3">
                        <svg
                            className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        <div>
                            <h3 className="font-semibold text-white">Real-time Sync</h3>
                            <p className="text-sm text-gray-400">
                                Changes appear instantly across all your devices
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-4 flex items-start space-x-3">
                        <svg
                            className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <div>
                            <h3 className="font-semibold text-white">Secure & Private</h3>
                            <p className="text-sm text-gray-400">
                                Your bookmarks are encrypted and private to you
                            </p>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-4 flex items-start space-x-3">
                        <svg
                            className="w-6 h-6 text-pink-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                            />
                        </svg>
                        <div>
                            <h3 className="font-semibold text-white">Simple & Fast</h3>
                            <p className="text-sm text-gray-400">
                                Clean interface focused on what matters
                            </p>
                        </div>
                    </div>
                </div>

                {/* Auth Button */}
                <div className="pt-4">
                    <AuthButton />
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500">
                    Sign in with Google to get started
                </p>
            </div>
        </main>
    );
}
