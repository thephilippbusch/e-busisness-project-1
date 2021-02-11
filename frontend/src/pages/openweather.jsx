import React from 'react';
import styled from 'styled-components';

const OpenWeatherContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper {
        display: flex;
        flex-wrap: wrap;
        width:200px;
        justify-content: center;

        a {
            margin-top: 20px;
            text-decoration: none;
            color: black;
            font-size: 15px;
            font-family: helvetica, Verdana;
        }
        a:hover {
            color: rgb(100, 100, 100);
        } 
    
        .logo {
            width: 200px;
        }
    }
`;

const OpenWeatherAPI = () => {

    return(
        <OpenWeatherContainer>
            <div className="wrapper">
                <a href="https://home.openweathermap.org/" target="_blank" rel="noreferrer"><img src="openweathermap.png" alt="OpenWeatherMap Logo" className="logo"></img></a>
                <a href="https://home.openweathermap.org/" target="_blank" rel="noreferrer">Open Weather Map API</a>
            </div>
        </OpenWeatherContainer>
    )
}

export default OpenWeatherAPI;