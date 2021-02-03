import React from 'react';
import styled from 'styled-components';

const GoogleCalendarContainer = styled.div`
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

const GoogleCalendarAPI = () => {

    return(
        <GoogleCalendarContainer>
            <a href="https://developers.google.com/calendar" target="_blank">Google Calendar API</a>
        </GoogleCalendarContainer>
    )
}

export default GoogleCalendarAPI;