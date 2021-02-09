import React from 'react';
import styled from 'styled-components';

const OpenWeatherContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        text-decoration: none;
        color: black;
        font-size: 15px;
        font-family: helvetica, Verdana;
    }
    a:hover {
        color: rgb(100, 100, 100);
    } 
`;

const OpenWeatherAPI = () => {

    return(
        <OpenWeatherContainer>
            <a href="https://home.openweathermap.org/" target="_blank" rel="noreferrer">Open Weather Map API</a>
        </OpenWeatherContainer>
    )
}

export default OpenWeatherAPI;