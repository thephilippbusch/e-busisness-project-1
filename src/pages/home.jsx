import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const HomeContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Home = (props) => {
    const [planets, setPlanets] = useState(props.data);

    const getSwapiPlanets = () => {
        console.log(planets);
    };

    return(
        <HomeContainer>
            <Button variant="contained" onClick={() => getSwapiPlanets()}>Test</Button>
        </HomeContainer>
    )
}

export default Home;