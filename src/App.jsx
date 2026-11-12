import { useRef, useState } from "react";
import { GENRES, FORMATS, STATUSES } from "./constants/filters";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import AnimeDetails from "./components/AnimeDetails";
import SearchResults from "./components/SearchResults";
import SideBar from "./components/SideBar";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Box from "./components/Box";
import Discover from "./components/Discover";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useKey } from "./hooks/useKey";

export default function App() {
    // filters
    const [genre, setGenre] = useState("");
    const [format, setFormat] = useState("");
    const [status, setStatus] = useState("");

    // query
    const [query, setQuery] = useState("");

    const [detailId, setDetailId] = useState(null);

    const {
        elements: favouritesList,
        handleAddElement: handleAddElementsToFavourites,
        handleDeleteElement: handleDeleteElementsToFavourites,
    } = useLocalStorageState("favourite");

    const inputRef = useRef(null);

    useKey("Space", () => {
        inputRef.current.focus();
    });

    function handleClickDetails(id) {
        setDetailId(id);
    }

    return (
        <div className="app">
            <SideBar
                favouritesList={favouritesList}
                handleClickDetails={handleClickDetails}
                handleAddElementsToFavourites={handleAddElementsToFavourites}
                handleDeleteElementsToFavourites={
                    handleDeleteElementsToFavourites
                }
            />

            <Main>
                <NavBar>
                    <nav className="nav-bar">
                        {/* 3 components */}
                        <h2 className="nav-title">Ani Track</h2>

                        <SearchBar
                            ref={inputRef}
                            query={query}
                            setDetailId={setDetailId}
                            setQuery={setQuery}
                        />

                        <p className="filter-label">Genre: </p>
                        <Filter
                            filterMap={Object.entries(GENRES)}
                            filter={genre}
                            setFilter={setGenre}
                        />

                        <p className="filter-label">Format: </p>
                        <Filter
                            filterMap={Object.entries(FORMATS)}
                            filter={format}
                            setFilter={setFormat}
                        />

                        <p className="filter-label">Status: </p>
                        <Filter
                            filterMap={Object.entries(STATUSES)}
                            filter={status}
                            setFilter={setStatus}
                        />
                    </nav>
                </NavBar>

                <Box>
                    {detailId ? (
                        <AnimeDetails
                            id={detailId}
                            setDetailId={setDetailId}
                            favouritesList={favouritesList}
                            handleAddElementsToFavourites={
                                handleAddElementsToFavourites
                            }
                            handleDeleteElementsToFavourites={
                                handleDeleteElementsToFavourites
                            }
                        />
                    ) : query === "" &&
                      genre === "" &&
                      format === "" &&
                      status === "" ? (
                        <Discover
                            favouritesList={favouritesList}
                            handleClickDetails={handleClickDetails}
                            handleAddElementsToFavourites={
                                handleAddElementsToFavourites
                            }
                            handleDeleteElementsToFavourites={
                                handleDeleteElementsToFavourites
                            }
                        />
                    ) : (
                        <SearchResults
                            query={query}
                            genre={genre}
                            status={status}
                            format={format}
                            favouritesList={favouritesList}
                            handleClickDetails={handleClickDetails}
                            handleAddElementsToFavourites={
                                handleAddElementsToFavourites
                            }
                            handleDeleteElementsToFavourites={
                                handleDeleteElementsToFavourites
                            }
                        />
                    )}
                </Box>
            </Main>
        </div>
    );
}
