import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardContent from '@/components/DashboardContent';

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/');
    }

    // Sign out action
    async function signOut() {
        'use server';
        const supabase = await createClient();
        await supabase.auth.signOut();
        redirect('/');
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <header className="glass rounded-2xl p-6 animate-fade-in">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                                <svg
                                    className="w-8 h-8 text-white"
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
                            <div>
                                <h1 className="text-2xl font-bold text-white">My Bookmarks</h1>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        <form action={signOut}>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </header>

                {/* Dashboard Content (Add Form + Bookmarks List) */}
                <DashboardContent userId={user.id} />
            </div>
        </div>
    );
}
