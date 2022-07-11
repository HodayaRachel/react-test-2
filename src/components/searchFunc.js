import React from 'react';
import { useState, useEffect } from 'react';
import { Button} from "react-bootstrap";
import jsonData from '../jsonData.json';
import FilterFunc from './filterFunc';
import styles from  './searchFunc.module.css'

const SearchFunc = ({ setMovies, clear, setClear }) => {

    const [getSearchStr, setSearchStr] = useState('');

    useEffect(() => {
        console.log(setClear)
        CheckClear();
    });

    const CheckClear = () => {
        if (clear == true) {
            setSearchStr('');
            setMovies(jsonData.results);
            setClear(false);
        }
    }

    const sendToFilter = () => {
        let moviesResult = FilterFunc({ stringFilter: getSearchStr, num: 1 });
        setMovies(moviesResult);
    }

    return (
        <>
            <input className={styles.SearchInput} value={getSearchStr} type="text" onChange={(e) => setSearchStr(e.target.value)}/>
            <Button className={styles.SearchButton} onClick={sendToFilter}></Button>
        </>
    )

}
export default SearchFunc;
