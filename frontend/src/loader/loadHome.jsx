import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Home from '../pages/home';
import Loader from './loader';
import axios from 'axios';

const LoaderWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
`;

const LoadHome = () => {
    const [data, setData] = useState({ fetched: null, isFetching: false });

    useEffect(() => {
        const fetchData = async () => {
            try{
                setData({ fetched: data, isFetching: true});
                const response = await axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=54.033329&lon=10.45&units=metric&exclude=minutely,alerts&appid=2f8cac0211e53f53ef728179a1595bb9");
                setData({ fetched: response.data, isFetching: false});
            } catch(e) {
                console.log(e);
                setData({ fetched: data.fetched, isFetching: false});
            }
        }
        fetchData();
    }, []);
    
    return data.fetched && !data.isFetching ? (
        <Home data={data.fetched} />
    ) : (
        <LoaderWrap>
            <Loader />
        </LoaderWrap>
    )
}

export default LoadHome;