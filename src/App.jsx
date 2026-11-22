import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ListProvider } from "./contexts/ListContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import PageNotFound from "./components/PageNotFound";
import AppLayout from "./components/AppLayout";
import AppContent from "./components/AppContent";
import AnimeDetails from "./components/AnimeDetails";

export default function App() {
    return (
        <div>
            <ThemeProvider>
                <AuthProvider>
                    <ListProvider>
                        <WishlistProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route index element={<HomePage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/app" element={<AppLayout />}>
                                        <Route index element={<AppContent />} />

                                        <Route
                                            path="anime/:id"
                                            element={<AnimeDetails />}
                                        />
                                    </Route>

                                    <Route path="*" element={<PageNotFound />} />
                                </Routes>
                            </BrowserRouter>
                        </WishlistProvider>
                    </ListProvider>
                </AuthProvider>
            </ThemeProvider>
        </div>
    );
}
