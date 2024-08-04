
import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Movie from './Movie';
import styles from '../app/page.module.css';

const Favorites = ({ favorites, allMovies }) => {
    const navigate = useNavigate();  


    const favoriteMovies = allMovies.filter(movie => favorites.includes(movie.id));

    return (
        <div className={styles.mainPage}>
            <header className={styles.header}>
                <h1>Your Favorite Movies</h1>
                <button className={styles.backButton} onClick={() => navigate('/movies')}>
                    Back to Movies
                </button>
            </header>
            <main className={styles.main}>
                {favoriteMovies.length === 0 ? (
                    <p>No favorite movies yet.</p>
                ) : (
                    favoriteMovies.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                            isFavorite={true} 
                            onFavoriteToggle={() => {}}
                        />
                    ))
                )}
            </main>
        </div>
    );
};

export default Favorites;
