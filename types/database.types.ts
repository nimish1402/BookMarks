export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string | null;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    email?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string | null;
                    created_at?: string;
                };
            };
            bookmarks: {
                Row: {
                    id: string;
                    user_id: string;
                    url: string;
                    title: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    url: string;
                    title: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    url?: string;
                    title?: string;
                    created_at?: string;
                };
            };
        };
    };
}

export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
