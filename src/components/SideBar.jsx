import { useState } from "react";
import { useNavigate } from "react-router";
import {
    PanelLeft,
    ChevronRight,
    Heart,
    Bookmark,
    LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useLists } from "../hooks/useLists";
import List from "./List";
import ListItem from "./ListItem";
import Button from "./Button";

export default function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedLists, setExpandedLists] = useState({});
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

    const { user, logout } = useAuth();
    const { lists, savedAnimes } = useLists();
    const navigate = useNavigate();

    const userName =
        user?.user_metadata?.name ||
        user?.user_metadata?.username ||
        user?.email?.split("@")[0] ||
        "User";
    const userEmail = user?.email || "";
    const userInitial = (userName?.[0] || "U").toUpperCase();

    function toggleList(listId) {
        setExpandedLists((prev) => ({
            ...prev,
            [listId]: !(prev[listId] ?? true),
        }));
    }

    async function handleLogout() {
        setIsUserDialogOpen(false);
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err.message);
        }
    }

    if (isCollapsed) {
        return (
            <aside className="sidebar collapsed">
                <Button
                    className="sidebar-btn"
                    onClick={() => setIsCollapsed(false)}
                    title="Expand sidebar"
                >
                    <PanelLeft size={22} stroke="currentColor" strokeWidth={1.8} />
                </Button>

                {/* Collapsed List Icons */}
                <div className="sidebar-collapsed-icons">
                    {lists.map((list) => {
                        const isWatchlist =
                            list.name.toLowerCase() === "watchlist" ||
                            list.name.toLowerCase() === "favourites";
                        return (
                            <button
                                key={list.id}
                                className="sidebar-collapsed-icon-btn"
                                title={list.name}
                                onClick={() => setIsCollapsed(false)}
                            >
                                {isWatchlist ? (
                                    <Heart
                                        size={20}
                                        color="#ef4444"
                                        fill="#ef4444"
                                    />
                                ) : (
                                    <Bookmark size={20} color="#818cf8" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* User Avatar Circle at Bottom */}
                <div className="sidebar-collapsed-footer">
                    <button
                        type="button"
                        className="sidebar-avatar-circle"
                        onClick={() => setIsUserDialogOpen(true)}
                        title={`${userName} (${userEmail})`}
                    >
                        {userInitial}
                    </button>
                </div>

                {/* User Dialog */}
                {isUserDialogOpen && (
                    <div
                        className="user-dialog-backdrop"
                        onClick={() => setIsUserDialogOpen(false)}
                    >
                        <div
                            className="user-dialog-card"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="user-dialog-header">
                                <div className="sidebar-avatar-circle large">
                                    {userInitial}
                                </div>
                                <div className="user-dialog-details">
                                    <strong className="user-dialog-name">
                                        {userName}
                                    </strong>
                                    <small className="user-dialog-email">
                                        {userEmail}
                                    </small>
                                </div>
                            </div>
                            <div className="user-dialog-divider" />
                            <button
                                type="button"
                                className="user-dialog-logout-btn"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                )}
            </aside>
        );
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h3 className="sidebar-title">Playlists</h3>
                <Button
                    className="sidebar-btn"
                    onClick={() => setIsCollapsed(true)}
                    title="Collapse sidebar"
                >
                    <PanelLeft size={22} stroke="currentColor" strokeWidth={1.8} />
                </Button>
            </div>

            {/* Lists Accordion */}
            <div className="sidebar-lists-scroll">
                {lists.length === 0 ? (
                    <p className="sidebar-empty">No playlists yet.</p>
                ) : (
                    lists.map((list) => {
                        const isExpanded = expandedLists[list.id] ?? true;
                        const isWatchlist =
                            list.name.toLowerCase() === "watchlist" ||
                            list.name.toLowerCase() === "favourites";

                        const animesInList = savedAnimes
                            .filter((s) => s.list_id === list.id)
                            .map((s) => ({
                                id: s.anime_id,
                                savedId: s.id,
                                image: s.anime_image,
                                title: s.anime_title,
                                listId: list.id,
                            }));

                        return (
                            <div key={list.id} className="sidebar-list-group">
                                <button
                                    type="button"
                                    className="sidebar-list-header-btn"
                                    onClick={() => toggleList(list.id)}
                                >
                                    <ChevronRight
                                        size={16}
                                        className={`sidebar-chevron ${
                                            isExpanded ? "expanded" : ""
                                        }`}
                                    />
                                    {isWatchlist ? (
                                        <Heart
                                            size={16}
                                            color="#ef4444"
                                            fill="#ef4444"
                                        />
                                    ) : (
                                        <Bookmark size={16} color="#818cf8" />
                                    )}
                                    <span className="sidebar-list-name">
                                        {list.name}
                                    </span>
                                    <span className="sidebar-list-count">
                                        {animesInList.length}
                                    </span>
                                </button>

                                {isExpanded && (
                                    <div className="sidebar-items-wrapper">
                                        <List
                                            items={animesInList}
                                            ItemComponent={ListItem}
                                            listId={list.id}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* User Footer Profile */}
            <div className="sidebar-footer">
                <button
                    type="button"
                    className="sidebar-user-profile-btn"
                    onClick={() => setIsUserDialogOpen(true)}
                >
                    <div className="sidebar-avatar-circle">{userInitial}</div>
                    <div className="sidebar-user-text">
                        <span className="sidebar-user-name">{userName}</span>
                        <span className="sidebar-user-email">{userEmail}</span>
                    </div>
                </button>
            </div>

            {/* User Dialog */}
            {isUserDialogOpen && (
                <div
                    className="user-dialog-backdrop"
                    onClick={() => setIsUserDialogOpen(false)}
                >
                    <div
                        className="user-dialog-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="user-dialog-header">
                            <div className="sidebar-avatar-circle large">
                                {userInitial}
                            </div>
                            <div className="user-dialog-details">
                                <strong className="user-dialog-name">
                                    {userName}
                                </strong>
                                <small className="user-dialog-email">
                                    {userEmail}
                                </small>
                            </div>
                        </div>
                        <div className="user-dialog-divider" />
                        <button
                            type="button"
                            className="user-dialog-logout-btn"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
}