import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBarContainer = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(0, 0, 80);
`;
const TitleLogo = styled.div`
    width: 50%;
    display: flex;
    

    h1 {
        margin-left: 70px;
        letter-spacing: 0.8em;
        font-family: helvetica, Verdana;
        font-size: 20px;
        color: rgb(180, 180, 180)
    }
`;
const LinkContainer = styled.div`
    width: 50%;
    display: flex;

    ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        list-style-type: none;
        margin: 0;
        padding: 0;

        li {


            a {
                text-decoration: none;
                color: rgb(180, 180, 180);
                font-size: 15px;
                font-family: helvetica, Verdana;
            }

            a:hover {
                color: white;
            }
        }
    }
`;

const NavBar = () => {

    return(
        <NavBarContainer>
            <TitleLogo>
                <h1>MIGRANE</h1>
            </TitleLogo>
            <LinkContainer>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/openweatherapi">OpenWeatherMap API</Link></li>
                    <li><Link to="/googlecalendarapi">Google Calendar API</Link></li>
                </ul>
            </LinkContainer>
        </NavBarContainer>
    )
}

export default NavBar;