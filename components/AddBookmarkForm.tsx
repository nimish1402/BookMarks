'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AddBookmarkFormProps {
    userId: string;
}

export default function AddBookmarkForm({ userId }: AddBookmarkFormProps) {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!url.trim() || !title.trim()) {
            setError('Please fill in all fields');
            return;
        }

        // Basic URL validation
        try {
            new URL(url);
        } catch {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);

        try {
            const { error: insertError } = await supabase.from('bookmarks').insert({
                user_id: userId,
                url: url.trim(),
                title: title.trim(),
            });

            if (insertError) {
                console.error('Error adding bookmark:', insertError);
                // Check if it's a table not found error
                if (insertError.message?.includes('relation') || insertError.code === '42P01') {
                    setError('Database not set up. Please run the SQL setup scripts in Supabase.');
                } else {
                    setError(`Failed to add bookmark: ${insertError.message || 'Unknown error'}`);
                }
                return;
            }

            // Clear form
            setUrl('');
            setTitle('');
        } catch (err) {
            console.error('Error adding bookmark:', err);
            setError('Failed to add bookmark. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
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
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                <span>Add New Bookmark</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="My Awesome Website"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                        URL
                    </label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        disabled={loading}
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center space-x-2">
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
                            <span>Adding...</span>
                        </span>
                    ) : (
                        'Add Bookmark'
                    )}
                </button>
            </form>
        </div>
    );
}
