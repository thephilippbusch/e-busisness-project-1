import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';

const SwapiContainer = styled.div`
    display: block;
    justify-content: flex-start;
`;
const FixLabel = styled.div`
    padding: 10px;
    margin-right: 20px;
`;
const VarLabel = styled.div`
    padding: 10px;
`;
const ErrorDiv = styled.div`
    display: flex;
    width: 100%;
    padding: 20px 0px 20px 0px;
    justify-content: center;
    align-items: center;

    p {
        padding: 0px 10px 0px 10px;
    }
`;

const SwapiResults = (props) => {
    var name, height, mass;
    let error = false;

    if(props.data.count != 0) {
        error = false;
        console.log(props.data);
        name = props.data.results[0].name;
        height = props.data.results[0].height;
        mass = props.data.results[0].mass;
    } else {
        console.log(props.data);
        error = true;
    }

    return error ? (
        <ErrorDiv>
            <ErrorIcon style={{ color: red[500] }} fontSize="large" />
            <p>Did not find that name!</p>
            <ErrorIcon style={{ color: red[500] }} fontSize="large" />
        </ErrorDiv>
    ) : (
        <SwapiContainer>
            <Grid container spacing={2}>
                <Grid item xs>
                    <FixLabel>Name:</FixLabel>
                </Grid>
                <Grid item xs={9}>
                    <VarLabel>{name}</VarLabel>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    <FixLabel>Height:</FixLabel>
                </Grid>
                <Grid item xs={9}>
                    <VarLabel>{height}</VarLabel>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    <FixLabel>Mass:</FixLabel>
                </Grid>
                <Grid item xs={9}>
                    <VarLabel>{mass}</VarLabel>
                </Grid>
            </Grid>
        </SwapiContainer>
    )
} 

export default SwapiResults;