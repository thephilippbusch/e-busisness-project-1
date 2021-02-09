import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Home from '../pages/home';
import Loader from './loader';
import axios from 'axios';

const LoaderWrap = styled.div`
    width: 100%;
    height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadHome = () => {
    const [data, setData] = useState({ fetched: null, isFetching: false });

    useEffect(() => {
        const fetchData = async () => {
            try{
                setData({ fetched: data, isFetching: true});
                const response = await axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=54.033329&lon=10.45&&units=metric&appid=c1cc4c6011bcbe3a3d85d455b033df71");
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