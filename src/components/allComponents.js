import React from 'react';
import { useState, useEffect, useCallback } from 'react';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import jsonData from './jsonData.json';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col, Stack } from 'react-bootstrap';
import MoviesView from './moviesView';
import { Box } from '@mui/system';
import jsonData from '../jsonData.json';
import MenueBar from './menuBar';



function AllComponents() {

    const [movies, setMovies] = useState();
    const [isDescending, setIsDescending] = useState(false);
    const [getChangeView, setIsListView] = useState(false);


    useEffect(() => {
        setMovies(jsonData.results)
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <MenueBar setMovies={setMovies} setIsDescending={setIsDescending} isDescending={isDescending} setIsListView={setIsListView} isListView={getChangeView} />
                    <Col className="col-10">
                        <MoviesView movies={movies} isDescending={isDescending} isListView={getChangeView} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AllComponents;
