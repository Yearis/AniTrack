import { useRef } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { GENRES, FORMATS, STATUSES } from "../constants/filters";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import SideBar from "../components/layout/SideBar";
import Filter from "../components/layout/Filter";
import SearchBar from "../components/layout/SearchBar";
import Box from "../components/layout/Box";
import NavBar from "../components/layout/NavBar";
import Main from "../components/layout/Main";
import { useKey } from "../hooks/useKey";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { theme, toggleTheme } = useTheme();

    const query = searchParams.get("query") || "";
    const genre = searchParams.get("genre") || "";
    const format = searchParams.get("format") || "";
    const status = searchParams.get("status") || "";

    useKey("Space", () => {
        inputRef.current?.focus();
    });

    function updateSearchParam(key, value) {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        setSearchParams(newParams);

        const queryString = newParams.toString();
        if (queryString) {
            navigate(`/app?${queryString}`);
        } else {
            navigate("/app");
        }
    }

    return (
        <div className={styles.app}>
            <SideBar />

            <Main>
                <NavBar>
                    <nav className={styles.navBar}>
                        <h2
                            className={styles.title}
                            onClick={() => {
                                setSearchParams({});
                                navigate("/app");
                            }}
                        >
                            Ani Track
                        </h2>

                        <SearchBar
                            ref={inputRef}
                            query={query}
                            setQuery={(val) => updateSearchParam("query", val)}
                        />

                        <div className={styles.filtersGroup}>
                            <Filter
                                label="Genre:"
                                filterMap={Object.entries(GENRES)}
                                filter={genre}
                                setFilter={(val) => updateSearchParam("genre", val)}
                            />

                            <Filter
                                label="Format:"
                                filterMap={Object.entries(FORMATS)}
                                filter={format}
                                setFilter={(val) => updateSearchParam("format", val)}
                            />

                            <Filter
                                label="Status:"
                                filterMap={Object.entries(STATUSES)}
                                filter={status}
                                setFilter={(val) => updateSearchParam("status", val)}
                            />
                        </div>

                        <button
                            type="button"
                            className={styles.themeToggleBtn}
                            onClick={toggleTheme}
                            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                        >
                            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                    </nav>
                </NavBar>

                <Box>
                    <Outlet />
                </Box>
            </Main>
        </div>
    );
}
