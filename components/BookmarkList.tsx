'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Bookmark } from '@/types/database.types';

interface BookmarkListProps {
    userId: string;
    refreshTrigger?: number;
}

export default function BookmarkList({ userId, refreshTrigger }: BookmarkListProps) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const supabase = createClient();

    const fetchBookmarks = async () => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching bookmarks:', error);
                // Check if it's a table not found error
                if (error.message?.includes('relation') || error.code === '42P01') {
                    console.error('⚠️ Database tables not found. Please run the SQL setup scripts in Supabase.');
                }
            } else {
                setBookmarks(data || []);
            }
        } catch (err) {
            console.error('Error fetching bookmarks:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, [userId, refreshTrigger]);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const { error } = await supabase.from('bookmarks').delete().eq('id', id);

            if (error) throw error;

            // Refresh the list after deletion
            await fetchBookmarks();
        } catch (err) {
            console.error('Error deleting bookmark:', err);
            alert('Failed to delete bookmark. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="glass rounded-2xl p-8">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                    <svg
                        className="animate-spin h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span>Loading bookmarks...</span>
                </div>
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="glass rounded-2xl p-8">
                <div className="text-center space-y-3">
                    <div className="inline-block p-4 rounded-full bg-indigo-500/10">
                        <svg
                            className="w-12 h-12 text-indigo-400"
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
                    <h3 className="text-xl font-semibold text-white">No bookmarks yet</h3>
                    <p className="text-gray-400">Add your first bookmark to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                    <svg
                        className="w-6 h-6 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                    <span>Your Bookmarks</span>
                </span>
                <span className="text-sm font-normal text-gray-400">
                    {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
                </span>
            </h2>

            <div className="space-y-3">
                {bookmarks.map((bookmark) => (
                    <div
                        key={bookmark.id}
                        className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white mb-1 truncate">
                                    {bookmark.title}
                                </h3>
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline truncate block"
                                >
                                    {bookmark.url}
                                </a>
                                <p className="text-xs text-gray-500 mt-2">
                                    Added {new Date(bookmark.created_at).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete(bookmark.id)}
                                disabled={deletingId === bookmark.id}
                                className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
                                title="Delete bookmark"
                            >
                                {deletingId === bookmark.id ? (
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
