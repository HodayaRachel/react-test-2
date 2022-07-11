import React from "react";
import styles from './movies.module.css';
import { Card } from '@mui/material';
import { CardImg } from "react-bootstrap";
const Movie = ({ movie }) => {

    return (
        <Card className={styles.CardMovie}>
            <ul>
                <div className={styles.movieImgDiv}>
                    <CardImg className={styles.movieImage} src={movie.Poster} alt=":(" />
                </div>
                <div className={styles.movieDetailsDiv}>
                    <h3 className={styles.movieDetailsText}><strong>Title:</strong> {movie.Title}</h3><br />
                    <h4 className={styles.movieDetailsText}><strong>Year:</strong> {(movie.Year).slice(0, 4)}</h4>
                </div>
            </ul>
        </Card>
    )

}

export default Movie;