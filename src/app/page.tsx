'use client'

import React, { useState, useEffect } from 'react';
import Movie from '../components/Movie';
import TMDBAuth from '../components/Login';
import { API_KEY, BASE_URL, searchURL, genres } from '../config/Config';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Favorites from '../components/Favorites';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMovies();
        }
    }, [selectedGenre, searchTerm, currentPage, isAuthenticated]);

    const fetchMovies = async () => {
        let url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
        if (searchTerm) {
            url = `${searchURL}&query=${searchTerm}`;
        }
        if (selectedGenre.length > 0) {
            url += `&with_genres=${encodeURI(selectedGenre.join(','))}`;
        }
        if (currentPage) {
            url += `&page=${currentPage}`;
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleGenreClick = (id: number) => {
        setSelectedGenre((prev) =>
            prev.includes(id)
                ? prev.filter((genreId) => genreId !== id)
                : [...prev, id]
        );
        if (window.innerWidth <= 968) {
            setIsMenuOpen(false); // Close the menu on selection in mobile view
        }
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchMovies();
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const loginHandler = () => {
        console.log('User authenticated');
        setIsAuthenticated(true);
    };

    const logoutHandler = () => {
        console.log('User logged out');
        setIsAuthenticated(false);
    };

    const toggleFavorite = (movieId: number) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(movieId)
                ? prevFavorites.filter((id) => id !== movieId)
                : [...prevFavorites, movieId]
        );
    };

    const handleBurgerClick = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/movies" /> : <TMDBAuth onLogin={loginHandler} />} />
                <Route path="/movies" element={isAuthenticated ? (
                    <div className={styles.mainPage}>
                        <header className={styles.header}>
                            <Link to="/movies/favorites" className={styles.favoritesLink}>
                                Favorites
                            </Link>
                            <form onSubmit={handleSearch} className={styles.searchForm}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles.search}
                                />
                            </form>
                            <button onClick={logoutHandler} className={styles.logoutButton}>Log out</button>
                            <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`} onClick={handleBurgerClick}>
                                <div className={`${styles.bar} ${styles.bar1}`}></div>
                                <div className={`${styles.bar} ${styles.bar2}`}></div>
                                <div className={`${styles.bar} ${styles.bar3}`}></div>
                            </div>
                            <div className={`${styles.genresDropdown} ${isMenuOpen ? styles.active : ''}`}>
                                {genres.map((genre) => (
                                    <div
                                        key={genre.id}
                                        className={`${styles.tag} ${selectedGenre.includes(genre.id) ? styles.highlight : ''}`}
                                        onClick={() => handleGenreClick(genre.id)}
                                    >
                                        {genre.name}
                                    </div>
                                ))}
                            </div>
                        </header>
                        <div className={`${styles.genresContainer} ${isMenuOpen ? styles.collapsed : ''}`}>
                            {genres.map((genre) => (
                                <div
                                    key={genre.id}
                                    className={`${styles.tag} ${selectedGenre.includes(genre.id) ? styles.highlight : ''}`}
                                    onClick={() => handleGenreClick(genre.id)}
                                >
                                    {genre.name}
                                </div>
                            ))}
                            {selectedGenre.length > 0 && (
                                <div
                                    className={styles.highlight}
                                    id="clear"
                                    onClick={() => {
                                        setSelectedGenre([]);
                                        fetchMovies();
                                    }}
                                >
                                    <button className={styles.highlightButton}>Clear x</button>
                                </div>
                            )}
                        </div>
                        <main className={styles.main}>
                            {movies.map((movie) => (
                                <Movie
                                    key={movie.id}
                                    movie={movie}
                                    isFavorite={favorites.includes(movie.id)}
                                    onFavoriteToggle={() => toggleFavorite(movie.id)}
                                />
                            ))}
                        </main>
                        <div className={styles.pagination}>
                            <div
                                className={`${styles.page} ${currentPage <= 1 ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous Page
                            </div>
                            <div className={styles.current}>{currentPage}</div>
                            <div
                                className={`${styles.page} ${currentPage >= totalPages ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next Page
                            </div>
                        </div>
                    </div>
                ) : (
                    <Navigate to="/" />
                )} />
                <Route path="/movies/favorites" element={isAuthenticated ? (
                    <Favorites 
                        favorites={favorites} 
                        allMovies={movies}  // Pass the full list of movies
                    />
                ) : (
                    <Navigate to="/" />
                )} />
            </Routes>
        </Router>
    );
};

export default App;
