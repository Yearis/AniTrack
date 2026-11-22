import { useRef } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { GENRES, FORMATS, STATUSES } from "../constants/filters";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import SideBar from "./SideBar";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import Box from "./Box";
import NavBar from "./NavBar";
import Main from "./Main";
import { useKey } from "../hooks/useKey";

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
        <div className="app">
            <SideBar />

            <Main>
                <NavBar>
                    <nav className="nav-bar">
                        {/* 3 components */}
                        <h2
                            className="nav-title"
                            style={{ cursor: "pointer" }}
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

                        <p className="filter-label">Genre: </p>
                        <Filter
                            filterMap={Object.entries(GENRES)}
                            filter={genre}
                            setFilter={(val) => updateSearchParam("genre", val)}
                        />

                        <p className="filter-label">Format: </p>
                        <Filter
                            filterMap={Object.entries(FORMATS)}
                            filter={format}
                            setFilter={(val) =>
                                updateSearchParam("format", val)
                            }
                        />

                        <p className="filter-label">Status: </p>
                        <Filter
                            filterMap={Object.entries(STATUSES)}
                            filter={status}
                            setFilter={(val) =>
                                updateSearchParam("status", val)
                            }
                        />

                        <button
                            type="button"
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                        >
                            {theme === "dark" ? (
                                <Sun size={18} />
                            ) : (
                                <Moon size={18} />
                            )}
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
