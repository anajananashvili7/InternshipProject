import React from 'react';
import styles from '../app/page.module.css';



const Movie = ({ movie, isFavorite, onFavoriteToggle }) => {
    const { title, poster_path, vote_average, overview } = movie;

    return (
        <div className={styles.movie}>
            <div className={styles.posterContainer}>
                <img
                    src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "http://via.placeholder.com/1080x1580"}
                    alt={title}
                    className={styles.poster}
                />
                <button
                    className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                    onClick={onFavoriteToggle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
            <div className={styles.movieInfo}>
                <h3>{title}</h3>
                <span className={getColor(vote_average)}>{vote_average}</span>
            </div>
            <div className={styles.overview}>
                <h3>Overview</h3>
                {overview}
            </div>
        </div>
    );
};

const getColor = (vote) => {
    if (vote >= 8) return 'green';
    if (vote >= 5) return 'orange';
    return 'red';
};

export default Movie;
