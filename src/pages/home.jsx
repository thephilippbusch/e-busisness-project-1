import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import NightsStayRoundedIcon from '@material-ui/icons/NightsStayRounded';
import InvertColorsRoundedIcon from '@material-ui/icons/InvertColorsRounded';
import GoogleLogin from 'react-google-login';

import LoadSwapiSearch from '../loader/loadSwapiSearch';

const HomeContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .contentPane {
        width: 97%;
        margin: 3%;
    }

    .testContainer {
        width: 500px;
        height: 500px;
        background-color: rgb(220, 220, 220);
        padding: 15px 15px 15px 15px;

        .inputDiv {
            margin-top: 15px;
        }
    }
`;

const DailyData = styled.div`
    width: 700px;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        margin: 0;
    }
`;

const BASE_SEARCH_URL = "https://swapi.dev/api/people/?search=";

const Home = (props) => {
    const [weatherData, setWeatherData] = useState(props.data);
    const [dailyTable, setDailyTable] = useState();
    const dailyWeather = props.data.daily;
    const date = new Date();

    const handlePrint = () => {
        console.log(weatherData);
        console.log(date);
        
        dailyWeather.map((weather, index) => {
            console.log(getCurrentDate(index));
            console.log(weather.humidity);
            console.log(weather.temp.day);
            console.log(weather.temp.night);
        })
    }

    const getCurrentDate = (add) => {
        var day = date.getDay() + add;
        if(day < 10) {
            day = "0" + day;
        }
        var mth = date.getMonth();
        if(mth < 9) {
            mth = "0" + (mth + 1);
        } else {
            mth = mth + 1;
        }
        var year = date.getFullYear();
        
        return(
            day + "." + mth + "." + year
        );
    }

    const responseGoogle = (response) => {
        console.log(response);
      }

    /*
    const [swapiData, setSwapiData] = useState(props.data);
    const [planets, setPlanets] = useState(props.data.results);
    const [selectedPlanet, setSelectedPlanet] = useState();

    const [searchName, setSearchName] = useState("Luke");
    const [searchResult, setSearchResult] = useState();

    const getSwapiPlanets = () => {
        console.log(swapiData);
        console.log(planets);
    };

    const handleSearch = () => {
        if(searchName && searchName != "") {
            setSearchResult(null);
            var searchUrl = BASE_SEARCH_URL + searchName;
            setSearchResult(<LoadSwapiSearch url={searchUrl}/>);
        } else {
            alert("Please enter a Name for search!");
        }
    } */

    return(
        <HomeContainer>
            <div className="contentPane">
                <Button variant="contained" color="primary" onClick={() => handlePrint()}>Print Data</Button>

                <div>
                    {dailyWeather.map((day, index) => {
                        return(
                            <DailyData key={index}>
                                <p>{getCurrentDate(index)}:</p>
                                <p><WbSunnyRoundedIcon /> {day.temp.day}</p>
                                <p><NightsStayRoundedIcon /> {day.temp.night}</p>
                                <p><InvertColorsRoundedIcon /> {day.humidity}</p>
                            </DailyData>
                        )
                    })}
                </div>

                <GoogleLogin
                    clientId='638694165912-0qd5tl1kb4evd0e2447647a7edrdetcp.apps.googleusercontent.com'
                    buttonText='Login'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </HomeContainer>
    )

    /*
    return(
        <HomeContainer>
            <div className="testContainer">
                <Button variant="contained" color="primary" onClick={() => getSwapiPlanets()}>Test</Button>
                <select>{planets.map(planet => {
                    return(
                        <option key={planet.name} value={planet.name}>
                            {planet.name}
                        </option>
                    )
                })}</select>

                <br />

                <form>
                    <div className="inputDiv">
                        <TextField id="name_input" label="Search Name" color="primary" value={searchName} onChange={e => setSearchName(e.target.value)} />
                    </div>
                    <br />
                    <Button onClick={() => handleSearch()} color="primary">Get Results</Button>
                </form>
                <br/>
                {searchResult ? (
                    searchResult
                ) : (
                    <p>No Searches yet!</p>
                )}
            </div>
        </HomeContainer>
    )
    */
}

export default Home;