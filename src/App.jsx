import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ListProvider } from "./contexts/ListContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import AppContent from "./pages/AppContent";
import AnimeDetails from "./pages/AnimeDetails";

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
