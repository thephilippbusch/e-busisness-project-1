import React from 'react';
import styled from 'styled-components';

const GoogleCalendarContainer = styled.div`
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

const GoogleCalendarAPI = () => {

    return(
        <GoogleCalendarContainer>
            <div className="wrapper">
                <a href="https://developers.google.com/calendar" target="_blank" rel="noreferrer"><img src="google_calendar.png" alt="Google Calendar Logo" className="logo"></img></a>
                <a href="https://developers.google.com/calendar" target="_blank" rel="noreferrer">Google Calendar API</a>
            </div>
        </GoogleCalendarContainer>
    )
}

export default GoogleCalendarAPI;