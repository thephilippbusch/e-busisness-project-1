import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: dark-grey;

  h1 {
    color: red;
  }

`;

function App() {
  return (
    <Router>
      <MainDiv>
        <h1>Helloooooo</h1>
      </MainDiv>
    </Router>
  );
}

export default App;
