import React, { useEffect, useState } from 'react';
import SwapiResults from '../pages/swapiResults';
import Loader from './loader';
import axios from 'axios';

const LoadSwapiSearch = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false });

    useEffect(() => {
        console.log(props.url);
        const fetchData = async () => {
            try{
                setData({ fetched: data, isFetching: true});
                const response = await axios.get(props.url);
                setData({ fetched: response.data, isFetching: false});
            } catch(e) {
                console.log(e);
                setData({ fetched: data.fetched, isFetching: false});
            }
        }
        fetchData();
    }, [props.url]);
    
    return data.fetched && !data.isFetching ? (
        <SwapiResults data={data.fetched} />
    ) : (
        <Loader />
    )
}

export default LoadSwapiSearch;