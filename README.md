# Smart Bookmark App

A modern, real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS. Save and organize your favorite links with instant synchronization across all your devices.

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with Google (no passwords needed)
- ⚡ **Real-time Sync** - Changes appear instantly across all browser tabs
- 🔒 **Private & Secure** - Your bookmarks are private and isolated per user
- 🎨 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication & Database**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Real-time**: Supabase Realtime

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account
- Google Cloud Console account (for OAuth)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd bookmarks-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

Follow the detailed setup guide in `supabase_setup_guide.md` to:
- Create a Supabase project
- Set up Google OAuth
- Create database tables
- Configure Row Level Security
- Enable Realtime

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace with your actual Supabase credentials from the project settings.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bookmarks-app/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── AddBookmarkForm.tsx       # Add bookmark form
│   ├── AuthButton.tsx            # Google sign-in button
│   └── BookmarkList.tsx          # Bookmarks list with real-time
├── lib/
│   └── supabase/
│       ├── client.ts             # Browser Supabase client
│       ├── server.ts             # Server Supabase client
│       └── middleware.ts         # Auth middleware helper
├── types/
│   └── database.types.ts         # TypeScript types
├── middleware.ts                 # Next.js middleware
└── package.json
```

## 🎯 How It Works

### Authentication
- Users sign in with Google OAuth
- Supabase handles session management
- Middleware protects routes and refreshes sessions

### Database
- **profiles** table: Stores user information
- **bookmarks** table: Stores user bookmarks
- Row Level Security ensures users only see their own data

### Real-time Sync
- Supabase Realtime listens for database changes
- When a bookmark is added/deleted in one tab, all other tabs update instantly
- No page refresh needed

## 🔒 Security

- Row Level Security (RLS) policies ensure data isolation
- Users can only read/write their own bookmarks
- Google OAuth provides secure authentication
- Environment variables keep credentials safe

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Update Google OAuth redirect URLs to include production URL
5. Update Supabase Site URL to production URL

```bash
npm run build  # Test production build locally
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.
