import React from 'react';
import styles from  './menuBar.module.css';
import { useState, useCallback } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import jsonData from '../jsonData.json';
import SearchFunc from './searchFunc';
import FilterFunc from './filterFunc.js';
import MoviesView from './moviesView';
import CountTypeFunc from './countTypeFunc';


export default function MenueBar({ setMovies, setIsDescending, isDescending, setIsListView, isListView }) {

    const [clear, setClear] = useState(false);

    const clearFunc = () => {
        setClear(true);
    }

    const refreshFunc = () => {
        window.parent.location = window.parent.location;
    }

    const isDescendingFunc = () => {
        console.log('isDescendingFunc');
        setIsDescending(!(isDescending));
        console.log(isDescending);
    }

    const changeView = () => {
        console.log('changeView');
        setIsListView(!(isListView));
        console.log(isListView);
    }

    return (
        <>
            <Row className={styles.RowMenuBarButtons}>
                <Col className='col-2'></Col>
                <Button onClick={clearFunc} className={styles.MenuBarButton}>clear</Button>
                <Button onClick={refreshFunc} className={styles.MenuBarButton}>refresh</Button >
                <Button onClick={isDescendingFunc} className={styles.MenuBarButton}>sort</Button >
                <Button onClick={changeView} className={styles.MenuBarButton}>change view</Button >
                <SearchFunc setMovies={setMovies} clear={clear} setClear={setClear} />
            </Row>
            <Col className="col-2">
                <CountTypeFunc setMovies={setMovies} clear={clear} setClear={setClear} />
            </Col>

        </>
    )
}