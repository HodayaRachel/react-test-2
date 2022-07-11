import React, { useEffect, useState, useCallback } from "react";
import Movie from "./movies";
import jsonData from '../jsonData.json'
import { Col, Stack } from "react-bootstrap";
import styles from  './moviesView.module.css';


function MoviesView({ movies, isDescending, isListView }) {

    const [View, setView] = useState('list');

    if (movies == null) {
        movies = jsonData.results;
    }

    useEffect(() => {
        CheckView();
        CheckIsDescending();
    });

    const CheckView = () => {
        if (isListView == true) {
            setView('grid');
        } else {
            setView('list');
        }
    };

    const CheckIsDescending = () => {
        if (isDescending == false) {
            movies.sort((a, b) => a.Title.localeCompare(b.Title, 'es', { sensitivity: 'base' }));
        } else {
            movies.reverse((a, b) => a.Title.localeCompare(b.Title, 'es', { sensitivity: 'base' }));
        }
    };

    return (
        <>
            <Stack direction={(View === "list" ? "row" : "column")} spacing={2}>
                <Col className={styles.listMovies} style={{ gridTemplateColumns: (View === 'list' ? '1fr' : '1fr 1fr 1fr') }}>
                    {movies?.map((item, key) => {
                        return (
                            <div>
                                <Movie movie={item}></Movie>
                            </div>
                        )
                    })}
                </Col>
            </Stack>
        </>
    );

}

export default MoviesView;