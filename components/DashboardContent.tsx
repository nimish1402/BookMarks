'use client';

import { useState } from 'react';
import AddBookmarkForm from './AddBookmarkForm';
import BookmarkList from './BookmarkList';

interface DashboardContentProps {
    userId: string;
}

export default function DashboardContent({ userId }: DashboardContentProps) {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleBookmarkAdded = () => {
        // Increment the trigger to force BookmarkList to refresh
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <>
            {/* Add Bookmark Form */}
            <div className="animate-slide-up">
                <AddBookmarkForm userId={userId} onBookmarkAdded={handleBookmarkAdded} />
            </div>

            {/* Bookmarks List */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <BookmarkList userId={userId} refreshTrigger={refreshTrigger} />
            </div>
        </>
    );
}
