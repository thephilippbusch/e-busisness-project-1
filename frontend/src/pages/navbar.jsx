import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBarContainer = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(137, 169, 160);
`;
const TitleLogo = styled.div`
    width: 50%;
    display: flex;
    

    .titleLink {
        margin-left: 50px;
        letter-spacing: 0.8em;
        font-family: helvetica, Verdana;
        font-size: 20px;
        font-weight: bold;
        color: white;
        text-decoration: none;
    }
`;
const LinkContainer = styled.div`
    width: 30%;
    min-width: 500px;
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
            margin: 0px 10px 0px 10px;

            a {
                text-decoration: none;
                color: white;
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
            <Link className="titleLink" to="/">AspirinMinder</Link>
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