import { useState } from "react";
import { useNavigate } from "react-router";
import {
    PanelLeft,
    ChevronRight,
    Heart,
    Bookmark,
    LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useLists } from "../../hooks/useLists";
import List from "../ui/List";
import ListItem from "../playlist/ListItem";
import Button from "../ui/Button";
import styles from "./SideBar.module.css";

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
            <aside className={`${styles.sidebar} ${styles.collapsed}`}>
                <Button
                    className={styles.toggleBtn}
                    onClick={() => setIsCollapsed(false)}
                    title="Expand sidebar"
                >
                    <PanelLeft size={20} strokeWidth={1.8} />
                </Button>

                {/* Collapsed List Icons */}
                <div className={styles.collapsedIcons}>
                    {lists.map((list) => {
                        const isWatchlist =
                            list.name.toLowerCase() === "watchlist" ||
                            list.name.toLowerCase() === "favourites";
                        return (
                            <button
                                key={list.id}
                                className={styles.collapsedIconBtn}
                                title={list.name}
                                onClick={() => setIsCollapsed(false)}
                            >
                                {isWatchlist ? (
                                    <Heart
                                        size={18}
                                        color="#ef4444"
                                        fill="#ef4444"
                                    />
                                ) : (
                                    <Bookmark size={18} color="#818cf8" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* User Avatar Circle at Bottom */}
                <div className={styles.collapsedFooter}>
                    <button
                        type="button"
                        className={styles.avatarCircle}
                        onClick={() => setIsUserDialogOpen(true)}
                        title={`${userName} (${userEmail})`}
                    >
                        {userInitial}
                    </button>
                </div>

                {/* User Dialog */}
                {isUserDialogOpen && (
                    <div
                        className={styles.dialogBackdrop}
                        onClick={() => setIsUserDialogOpen(false)}
                    >
                        <div
                            className={styles.dialogCard}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.dialogHeader}>
                                <div className={`${styles.avatarCircle} ${styles.large}`}>
                                    {userInitial}
                                </div>
                                <div className={styles.dialogDetails}>
                                    <strong className={styles.dialogName}>
                                        {userName}
                                    </strong>
                                    <small className={styles.dialogEmail}>
                                        {userEmail}
                                    </small>
                                </div>
                            </div>
                            <div className={styles.dialogDivider} />
                            <button
                                type="button"
                                className={styles.dialogLogoutBtn}
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
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <h3 className={styles.title}>Playlists</h3>
                <Button
                    className={styles.toggleBtn}
                    onClick={() => setIsCollapsed(true)}
                    title="Collapse sidebar"
                >
                    <PanelLeft size={20} strokeWidth={1.8} />
                </Button>
            </div>

            {/* Lists Accordion */}
            <div className={styles.listsScroll}>
                {lists.length === 0 ? (
                    <p className={styles.empty}>No playlists yet.</p>
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
                            <div key={list.id} className={styles.listGroup}>
                                <button
                                    type="button"
                                    className={styles.listHeaderBtn}
                                    onClick={() => toggleList(list.id)}
                                >
                                    <ChevronRight
                                        size={15}
                                        className={`${styles.chevron} ${
                                            isExpanded ? styles.expanded : ""
                                        }`}
                                    />
                                    {isWatchlist ? (
                                        <Heart
                                            size={15}
                                            color="#ef4444"
                                            fill="#ef4444"
                                        />
                                    ) : (
                                        <Bookmark size={15} color="#818cf8" />
                                    )}
                                    <span className={styles.listName}>
                                        {list.name}
                                    </span>
                                    <span className={styles.listCount}>
                                        {animesInList.length}
                                    </span>
                                </button>

                                {isExpanded && (
                                    <div className={styles.itemsWrapper}>
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
            <div className={styles.footer}>
                <button
                    type="button"
                    className={styles.userProfileBtn}
                    onClick={() => setIsUserDialogOpen(true)}
                >
                    <div className={styles.avatarCircle}>{userInitial}</div>
                    <div className={styles.userText}>
                        <span className={styles.userName}>{userName}</span>
                        <span className={styles.userEmail}>{userEmail}</span>
                    </div>
                </button>
            </div>

            {/* User Dialog */}
            {isUserDialogOpen && (
                <div
                    className={styles.dialogBackdrop}
                    onClick={() => setIsUserDialogOpen(false)}
                >
                    <div
                        className={styles.dialogCard}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.dialogHeader}>
                            <div className={`${styles.avatarCircle} ${styles.large}`}>
                                {userInitial}
                            </div>
                            <div className={styles.dialogDetails}>
                                <strong className={styles.dialogName}>
                                    {userName}
                                </strong>
                                <small className={styles.dialogEmail}>
                                    {userEmail}
                                </small>
                            </div>
                        </div>
                        <div className={styles.dialogDivider} />
                        <button
                            type="button"
                            className={styles.dialogLogoutBtn}
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
