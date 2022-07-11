import React from 'react';
import { useState, useEffect } from 'react';
import jsonData from '../jsonData.json';
import MoviesView from './moviesView';

const FilterFunc = ({ stringFilter, num }) => {

    if (num == 1) {
        const moviesArr = jsonData.results.filter(obj => obj.Title.toLowerCase().includes(stringFilter.toLowerCase()) || ((obj.Year).slice(0, 4)).includes(stringFilter));
        return moviesArr;
    }

    else if (num == 2) {
        const moviesArr = jsonData.results.filter(obj => obj.Type == stringFilter);
        return moviesArr
    }

    return ([]);
}
export default FilterFunc;
