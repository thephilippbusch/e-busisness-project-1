import React, { useEffect, useState } from 'react';
import Home from '../pages/home';
import Loader from './loader';
import axios from 'axios';

const LoadHome = () => {
    const [data, setData] = useState({ fetched: null, isFetching: false });

    useEffect(() => {
        const fetchData = async () => {
            try{
                setData({ fetched: data, isFetching: true});
                const response = await axios.get("https://swapi.dev/api/planets");
                setData({ fetched: response.data, isFetching: false});
            } catch(e) {
                console.log(e);
                setData({users: data.users, isFetching: false});
            }
        }
        fetchData();
    }, []);
    
    return data.fetched && !data.isFetching ? (
        <Home data={data.fetched} />
    ) : (
        <Loader />
    )
}

export default LoadHome;