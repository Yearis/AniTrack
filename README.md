# AniTrack 🎌

A modern, responsive anime discovery and tracking web application powered by the **AniList GraphQL API** and backed by **Supabase**.

🌐 **Live Demo:** [ani-track.netlify.app](https://ani-track.netlify.app/)

---

## ✨ Features

- **🔥 Discover Anime:** Browse curated interactive carousels of Trending, All-Time Popular, and Top Rated anime with live scores, genre tags, and airing metadata.
- **🔍 Real-Time Search & Multi-Filters:** Instant debounced search combined with genre, format (TV, Movie, OVA, etc.), and airing status filtering.
- **📖 In-Depth Anime Details:** Rich details view featuring synopses, studios, release schedules, community scores, character cast & voice actors, related anime, recommendations, and embedded YouTube trailers.
- **⚡ Custom Playlists & Watchlist:** Create multiple personalized playlists (e.g. *Watchlist*, *Favorites*, *Plan to Watch*), add or remove anime instantly, and manage your collections directly from the sidebar.
- **🔐 Cloud Authentication (Supabase):** Secure email/password authentication, persistent sessions, and cloud-synced user playlists powered by Supabase with PostgreSQL Row Level Security (RLS).
- **🌓 Dynamic Light & Dark Mode:** Handcrafted dual-theme system with high-contrast accessibility and smooth transitions across all components.
- **📂 Collapsible Sidebar:** Space-saving collapsible sidebar with quick playlist icons, accordion views, user profile management, and one-click Sign In / Sign Out access.
- **⌨️ Keyboard Shortcuts:**
  - `Space` — Quick-focus search bar from anywhere.
  - `Escape` — Dismiss modal dialogs and details view.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Routing:** [React Router](https://reactrouter.com/) (Single Page Application architecture)
- **Backend as a Service:** [Supabase](https://supabase.com/) (PostgreSQL Database, Authentication, Row Level Security)
- **Data Source:** [AniList GraphQL API v2](https://anilist.gitbook.io/anilist-apiv2-docs/)
- **Styling:** CSS Modules (`*.module.css`) with unified design tokens
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Netlify](https://www.netlify.com/) with automated SPA redirects

---

## 🗂️ Project Structure

```text
src/
├── components/
│   ├── anime/       # AnimeCard, DetailsModal, ReleaseCarousel, etc.
│   ├── layout/      # SideBar, NavBar, SearchBar, Filter, Box, Main
│   ├── playlist/    # Playlists, AddToListDialog, CreateNewListDialog, ListItem
│   └── ui/          # Reusable Button, List, Spinner, ErrorMessage
├── constants/       # Filter options & metadata constants
├── contexts/        # AuthContext, ListContext, ThemeContext
├── hooks/           # useAuth, useLists, useTheme, useAnimeDetails, useAnimes
├── pages/           # HomePage, LoginPage, AppLayout, PageNotFound
└── services/        # Supabase client configuration
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Yearis/AniTrack.git
cd AniTrack
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
