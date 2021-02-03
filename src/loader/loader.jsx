import React, { useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoaderContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = () => {
    return (
        <LoaderContainer>
            < CircularProgress />
        </LoaderContainer>
    )
}

export default Loader;