import React  from 'react';
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import jsonData from './jsonData.json';

export default function SearchItems() {


    let jsonFilter = jsonData;
    console.log(jsonFilter);

    const [getSearchStr, setSearchStr] = useState('')
    const [getisDescending, setIsDescending] = useState(false);
    const [getChangeView, setIsListView] = useState(true);
    const [getStyle, setStyle] = useState('div_list')
    const [getAllProductsByfilters, setAllProductsByfilters] = useState(jsonFilter.results);
    const [getIconSearch, setIconSearch] = useState({ query: '' });
    const [getIconRes, setIconRes] = useState({ url: '' });

    console.log(getIconSearch);

    // count types
    const obj = {};

    const countItems = (tag) => {
        if (!obj[tag]) {
            obj[tag] = 0;
        }
        obj[tag]++;
    }

    {
        jsonFilter.results.map(item => (
            <>{countItems(item.Type)}</>
        ));
    }

    // refresh function
    const refreshFunc = () => {
        window.parent.location = window.parent.location;
    }

    // clear function
    const clearFunc = () => {
        setSearchStr("");
        setAllProductsByfilters(jsonFilter.results);
    }

    // isDescending function
    const isDescendingFunc = () => {

        setIsDescending(!getisDescending);
        if (getisDescending == true) {
            getAllProductsByfilters.isDescending((a, b) => a.Title.localeCompare(b.Title, 'es', { sensitivity: 'base' }))
            console.log(jsonFilter.results);
        } else {
            getAllProductsByfilters.reverse((a, b) => a.Title.localeCompare(b.Title, 'es', { sensitivity: 'base' }))
            console.log(jsonFilter.results);
        }
    }

    // search function
    let num;
    const searchFunc = (getSearchStr, num) => {

        if (num == 1) {
            const getAllProductsByfilter = jsonFilter.results.filter(obj => obj.Title.toLowerCase().includes(getSearchStr.toLowerCase()) || ((obj.Year).slice(0, 4)).includes(getSearchStr));
            console.log(getAllProductsByfilter);
            setAllProductsByfilters(getAllProductsByfilter);
        } else if (num == 2) {
            const getAllProductsByfilter = jsonFilter.results.filter(obj => obj.Type == getSearchStr);
            console.log(getAllProductsByfilter);
            setAllProductsByfilters(getAllProductsByfilter);
        }
    }

    // change view function
    const changeView = () => {
        console.log(setIsListView(!getChangeView))
        setIsListView(!getChangeView);
        if (getChangeView == true) {
            setStyle('div_grid');
        } else {
            setStyle('div_list');
        }
    }

    const changeSearchIcon = e => {
        setIconSearch(prev => ({
            ...prev,
            ['query']: e.target.value
        }));
        console.log(getIconSearch);
    }

    //
    const searchFuncIcon = (item) => {
        axios.post(`http://localhost:3011/icon_lookups/find_icons`, item)
            .then(res => {
                console.log(res.data[0]);
                setIconRes(res.data[0].url);
                console.log(getIconRes);
            });

        console.log(getIconSearch);
        console.log(item)
        console.log('sec')

        return (<div><img src={`${getIconRes}?w=161&fit=crop&auto=format`} /></div>)
    }
    
    return (
        <div>
            <div style={{ margin: '30px', marginBottom: '0px' }}>

                <input value={getSearchStr} type="text" onChange={(e) => setSearchStr(e.target.value)} />

                <button onClick={() => searchFunc(getSearchStr, 1)}>search</button><br /><br />

                <input value={getIconSearch.query} type="text" onChange={changeSearchIcon} />
                <button onClick={() => searchFuncIcon(getIconSearch)}>search icon</button>
                <img src={`${getIconRes}?w=161&fit=crop&auto=format`} />

                <button className='button' onClick={clearFunc}>clear</button>
                <button className='button' onClick={refreshFunc}>refresh</button>
                <button className='button' onClick={isDescendingFunc}>isDescending</button>

            </div>

            <div style={{ width: '100px', padding: '30px' }}>

                {Object.keys(obj).map(item => (
                    <div>
                        <button style={{ marginTop: '15px' }} onClick={() => searchFunc(item, 2)} > {item} : {obj[item]}</button>
                    </div >
                ))}
                <button style={{ marginTop: '15px', width: '150px' }} onClick={changeView}>change view</button>

            </div>

            <div className={getStyle} style={{ display: 'flex', height: '1200px', width: '1200px' }}>

                {getAllProductsByfilters.map((item, key) => (
                    <div style={{ border: 'solid #8e93d2', width: '480px', height: '170px' }}>
                        <ul>
                            <div style={{ float: 'left', width: '150px', height: '150px' }}>
                                <img src={item.Poster} alt=":(" width={150} height={150} />
                            </div>
                            <div style={{ float: 'right', height: '100px', width: '250px', margin: '20px' }}>

                                <><strong>{key + 1}</strong></><br />
                                <><strong>Title:</strong> {item.Title}</><br />
                                <><strong>Year:</strong> {(item.Year).slice(0, 4)}</>

                            </div>
                        </ul>
                    </div>
                ))}

            </div>

        </div >
    )
}

