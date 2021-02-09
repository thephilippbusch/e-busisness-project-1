import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './pages/navbar';
import OpenWeatherAPI from './pages/openweather';
import LoadHome from './loader/loadHome';
import GoogleCalendarAPI from './pages/googlecalendar';
// import Home from './pages/home';

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: dark-grey;
`;

function App() {
  return (
    <Router>
      <MainDiv>
        <NavBar />
      
        <Switch>
            <Route exact path="/">
              <LoadHome />
            </Route>
            <Route path="/openweatherapi">
              <OpenWeatherAPI />
            </Route>
            <Route path="/googlecalendarapi">
              <GoogleCalendarAPI />
            </Route>
          </Switch>
        </MainDiv>
    </Router>
  );
}

export default App;
