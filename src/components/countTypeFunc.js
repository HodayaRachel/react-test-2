import React from 'react';
import { useEffect } from 'react';
import { NavLink } from "react-bootstrap";
import jsonData from '../jsonData.json';
import FilterFunc from './filterFunc.js';
import styles from  './countTypeFunc.module.css';

export default function CountTypeFunc({ setMovies, clear, setClear }) {

    const obj = {};

    const countItems = (tag) => {
        if (!obj[tag]) {
            obj[tag] = 0;
        }
        obj[tag]++;
    }

    {
        jsonData.results.map(item => (
            <>{countItems(item.Type)}</>
        ));
    }

    useEffect(() => {
        console.log(setClear)
        CheckClear();
    });

    const CheckClear = () => {
        if (clear == true) {
            setMovies(jsonData.results);
            setClear(false);
        }
    }

    const sendToFilter = (item) => {
        let moviesResult = FilterFunc({ stringFilter: item, num: 2 });
        setMovies(moviesResult);
    }

    return (
        <>
            {Object.keys(obj).map((item, i) => (
                <NavLink className={styles.NavOfType} key={i} onClick={() => { sendToFilter(item) }}>{item} : {obj[item]}</NavLink>
            ))
            }
        </>

    )
}