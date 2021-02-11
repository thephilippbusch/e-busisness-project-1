import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LoadHome from './loadHome';

const PreLoadContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .item {
        width: 100%;
        display: flex;
        justify-content: center;

        .button {
            margin-top: 20px;
        }
    
        .error {
            color: red;
            font-size: 10px;
            margin-top: 20px;
        }
    }
`;

const cities = [
    {
        "id": 2950158,
        "name": "Berlin",
        "state": "",
        "country": "DE",
        "coord": {
            "lon": 10.45,
            "lat": 54.033329
        }
    },
    {
        "id": 2911298,
        "name": "Hamburg",
        "state": "",
        "country": "DE",
        "coord": {
            "lon": 10.0,
            "lat": 53.549999
        }
    },
    {
        "id": 2867714,
        "name": "Munich",
        "state": "",
        "country": "DE",
        "coord": {
            "lon": 11.57549,
            "lat": 48.137428
        }
    }
];

const getCityNames = () => {
    var temp = [];
    cities.map(c => {
        temp.push(c.name);
    });
    return temp;
}

const cityNames = getCityNames();

const PreLoad = () => {
    const [city, setCity] = useState(cityNames[0]);
    const [inputCity, setInputCity] = useState('');
    const [selectedCity, setSelectedCity] = useState();
    const [error, setError] = useState('');

    const handleCommit = () => {
        if(!city) {
            setError("Bitte wählen Sie eine der vorgegebenen Städte aus!");
        } else {
            cities.map(c => {
                if(c.name === city) {
                    setSelectedCity(c);
                }
            });
        }
    }

    return selectedCity ? (
        <LoadHome lat={selectedCity.coord.lat} lon={selectedCity.coord.lon}/>
    ) : (
        <PreLoadContainer>
            <List>
                <ListItem className="item">
                    <Autocomplete
                        value={city}
                        onChange={(event, newCity) => {
                            setCity(newCity);
                            console.log()
                        }}
                        inputValue={inputCity}
                        onInputChange={(event, newInputCity) => {
                            setInputCity(newInputCity);
                        }}
                        id="city-select"
                        options={cityNames}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                    />
                </ListItem>
                <ListItem className="item">
                    <Button variant="contained" color="secondary" className="button" onClick={() => handleCommit()}>Load Migrane Warning</Button>
                </ListItem>
                <ListItem className="item">
                    <p className="error">{error}</p>
                </ListItem>
            </List>
        </PreLoadContainer>
    )
}

export default PreLoad;