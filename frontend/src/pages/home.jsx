import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReplayIcon from '@material-ui/icons/Replay';
import GetAppIcon from '@material-ui/icons/GetApp';
import EventIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';

import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import NightsStayRoundedIcon from '@material-ui/icons/NightsStayRounded';
import InvertColorsRoundedIcon from '@material-ui/icons/InvertColorsRounded';
import axios from 'axios';

// import LoadSwapiSearch from '../loader/loadSwapiSearch';

const HomeContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .contentPane {
        width: 97%;
        margin: 3%;

        .header {
            font-weight: bold
        }

        .button {
            margin: 10px 0px 10px 0px;
        }

        .critHourDiv {
            width: 100%;
            
            .refreshDiv {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
        }

        .disclaimer {
            color: grey;
        }

        .dailyList {
            width: 70%;
        }
    }
`;

const DataView = styled.div`
    width: 100%;
    margin: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
        margin: 0;
        min-width: 150px;
        width: 25%;
    }

    .calendarButton {
        margin-left: 30px;
    }

    .detailParagraph {
        min-width: 150px;
        width: 50%;
    }

    .calendarButtonP {
        margin-left: 30px;
        min-width: 200px;
        width: 25%;
    }
`;

const MigraneView = styled.div`
    width: 100%;
    margin: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
        margin: 0;
        min-width: 150px;
        width: 25%;
    }

    .calendarDiv {
        margin-left: 5%;
        width: 50px;
        justify-content: center;
    }

    .migraneViewDiv {
        width: 45%;
        min-width: fit-content;
    }
`;

const DrawerDiv = styled.div`
    width: 400px;
    padding: 30px;
`;

const MONTHS = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
];
const DAYS = [
    "So",
    "Mo",
    "Di",
    "Mi",
    "Do",
    "Fr",
    "Sa"
];

const Home = (props) => {
    const [drawerStatus, setDrawerStatus] = useState(false);
    const [tempSliderValue, setTempSliderValue] = useState([-5, 30]);
    const [pressSliderValue, setPressSliderValue] = useState(1000);
    const [dateSliderValue, setDateSliderValue] = useState([6, 20]);
    const [critHours, setCritHours] = useState();
    const [refresh, setRefresh] = useState(false);
    const dailyWeather = props.data.daily;
    const hourlyWeather = props.data.hourly;

    const convertToDate = (dt, mode) => {
        var d = new Date(dt * 1000);
        var {datestring, day, mth, date, hours, minutes} = "";

        if(mode === 'daily') {
            day = DAYS[d.getDay()];
            mth = MONTHS[d.getMonth()];
            date = '0' + d.getDate();
            return datestring = day + ', ' + mth + ' ' + date.substr(-2)
        }
        if(mode === 'hourly') {
            hours = "0" + d.getHours();
            minutes = "0" + d.getMinutes();
            return datestring = hours.substr(-2) + ':' + minutes.substr(-2);
        }

        if(mode === 'timeSpan') {
            return [
                d.getHours(),
                d.getDate(),
                DAYS[d.getDay()]
            ];
        }
    }

    const convertToTimeSpanDisplay = (start, end) => {
        var startDate = {};
        var endDate = {};
        if(start[0] === end[0] && start[1] === end[1]) {
            startDate = {
                hour: "0" + start[0],
                day: start[2]
            };
            endDate = {
                hour: "0" + (end[0]+1),
                day: end[2]
            }
        } else {
            startDate = {
                hour: "0" + start[0],
                day: start[2]
            };
            endDate = {
                hour: "0" + end[0],
                day: end[2]
            }
        }

        if(start[1] === end[1]) {
            return startDate.day + ' ' + startDate.hour.substr(-2) + ':00 - ' + endDate.hour.substr(-2) + ':00 Uhr';
        } else {
            return startDate.day + ' ' + startDate.hour.substr(-2) + ':00 - ' + endDate.day + ' ' + endDate.hour.substr(-2) + ':00 Uhr';
        }

    }

    const createEvent = () => {

        var data = {
            summary: 'Migrane Test 001',
            location: 'Pankower Allee 90, 13409 Berlin',
            description: 'Just a test event, want to see if it works!',
            start: {
                dateTime: '2021-02-09T15:00:00+01:00',
                timeZone: 'Europe/Berlin',
            },
            end: {
                dateTime: '2021-02-09T17:00:00+01:00',
                timeZone: 'Europe/Berlin',
            },
            colorId: 3
        }

        axios({
            url: 'http://localhost:8000/calendar',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
            },
            data: JSON.stringify(data)
        }).then(response => {
            (response.status === 200) ? (
                console.log(response)
            ) : (
                alert('Oh-oh! Something went wrong!')
            )
        }, error => {
            console.log(error);
        })
    }

    const getGoogleEvents = () => {
        axios.get('http://localhost:8000/calendar')
            .then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
        
            console.log("completed!");
    }

    const tempMarks = [
        {
            value: -30,
            label: '-30°C',
        },
        {
            value: 0,
            label: '0°C',
        },
        {
            value: 50,
            label: '50°C',
        },
    ];

    const pressMarks = [
        {
            value: 900,
            label: '900',
        },
        {
            value: 1000,
            label: '1000',
        },
        {
            value: 1100,
            label: '1100',
        }
    ];

    const dateMarks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 12,
            label: '12',
        },
        {
            value: 23,
            label: '23',
        }
    ];

    function tempValuetext(value) {
        return `${value}°C`;
    }

    function pressValuetext(value) {
        return `${value}`;
    }

    function dateValuetext(value) {
        return `${value}`;
    }

    const handleTempSliderChange = (event, nValue) => {
        setTempSliderValue(nValue);
    }

    const handlePressSliderChange = (event, nValue) => {
        setPressSliderValue(nValue);
    }

    const handleDateSliderChange = (event, nValue) => {
        setDateSliderValue(nValue);
    }

    const getCriticalHours = () => {
        var currentItem = -1;
        var displayCritical = [];
        var critical = [];
        var prevHourTime = null;
        hourlyWeather.map((hour, index) => {
            var currentHourTime = convertToDate(hour.dt, 'timeSpan');
            if(
                (hour.temp <= tempSliderValue[0] ||
                hour.temp >= tempSliderValue[1]) &&
                hour.pressure >= pressSliderValue &&
                currentHourTime[0] >= dateSliderValue[0] &&
                currentHourTime[0] <= dateSliderValue[1]
            ) {
                if(prevHourTime === null) {
                    console.log(currentHourTime);
                    critical.push(hour);
                    displayCritical.push({
                        startTime: currentHourTime,
                        endTime: currentHourTime,
                        hours: [
                            hour
                        ]
                    });
                    currentItem++;
                } else {
                    if((currentHourTime[0]-prevHourTime) === 1 || prevHourTime === 23) {
                        critical.push(hour);
                        displayCritical[currentItem].endTime = currentHourTime;
                        displayCritical[currentItem].hours.push(hour);
                    } else {
                        critical.push(hour);
                        displayCritical.push({
                            startTime: currentHourTime,
                            endTime: currentHourTime,
                            hours: [
                                hour
                            ]
                        });
                        currentItem++;
                    }
                }
                prevHourTime = currentHourTime[0];
            }
        });
        console.log(displayCritical);

        setCritHours(displayCritical);
    }

    const initRefreshBtn = () => {
        setRefresh(true);
        getCriticalHours();
    }

    return(
        <HomeContainer >
            <div className="contentPane">

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="header">Tägliche Voraussagen</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List className="dailyList">
                            {dailyWeather.map((day, index) => {
                                return(
                                    <ListItem key={index} divider>
                                        <DataView>
                                            <p>{convertToDate(day.dt, 'daily')}:</p>
                                            <p><WbSunnyRoundedIcon />{day.temp.day} °C</p>
                                            <p><NightsStayRoundedIcon />{day.temp.night} °C</p>
                                            <p>{day.pressure}</p>
                                        </DataView>
                                    </ListItem>
                                )
                            })}
                            <p className="disclaimer">provided by <a href="https://home.openweathermap.org/" target="_blank" rel="noreferrer">OpenWeatherMap.org</a></p>
                        </List>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="header">Stündliche Voraussage</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List className="dailyList">
                            {hourlyWeather.map((hour, index) => {
                                return(
                                    <ListItem key={index} divider>
                                        <DataView>
                                            {/*<p>{convertToDate(hour.dt)}:</p>*/}
                                            <p>{convertToDate(hour.dt, 'hourly')}</p>
                                            <p>{hour.temp} °C</p>
                                            <p>{hour.pressure}</p>
                                        </DataView>
                                    </ListItem>
                                )
                            })}
                            <p className="disclaimer">provided by <a href="https://home.openweathermap.org/" target="_blank" rel="noreferrer">OpenWeatherMap.org</a></p>
                        </List>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="header">Migräne Warnung</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="critHourDiv">
                            <div className="refreshDiv">
                                <Button className="button" variant="contained" color="secondary" onClick={() => setDrawerStatus(true)}><SettingsIcon /> Präferenzen</Button>
                                {refresh ? (
                                    <Button onClick={() => getCriticalHours()}>Refresh <ReplayIcon /></Button>
                                ) : (
                                    <Button onClick={() => initRefreshBtn()}>Laden <GetAppIcon /></Button>
                                )}
                            </div>
                            {critHours ? (
                                <List>
                                    <ListItem>
                                        <DataView>
                                            <p>Zeitspanne</p>
                                            <p className="detailParagraph">Details</p>
                                            <p className="calendarButtonP">Zu Google Calendar hinzufügen</p>
                                        </DataView>
                                    </ListItem>
                                    {critHours.map((danger, index) => {
                                        return(
                                            <ListItem key={index} divider>
                                                <MigraneWarning danger={danger} time={convertToTimeSpanDisplay(danger.startTime, danger.endTime)}/>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            ) : (
                                <Typography>Es gibt keine kritischen Zeiten, genieße den Tage!</Typography>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion>
                
                <Drawer anchor="left" open={drawerStatus} onClose={() => setDrawerStatus(false)}>
                    <DrawerDiv>
                        <h1>Präferenzen</h1>
                        <Typography id="temperature-slider" gutterBottom>
                            Wähle die Temperaturgrenzen
                        </Typography>
                        <Slider
                            min={-30}
                            max={50}
                            step={0.5}
                            value={tempSliderValue}
                            onChange={handleTempSliderChange}
                            getAriaValueText={tempValuetext}
                            aria-labelledby="temperature-slider"
                            valueLabelDisplay="auto"
                            marks={tempMarks}
                        />
                        <br />
                        <Typography id="pressure-slider" gutterBottom>
                            Wähle die Luftdruck-Grenze
                        </Typography>
                        <Slider
                            min={900}
                            max={1100}
                            value={pressSliderValue}
                            onChange={handlePressSliderChange}
                            getAriaValueText={pressValuetext}
                            aria-labelledby="pressure-slider"
                            valueLabelDisplay="auto"
                            marks={pressMarks}
                        />
                        <br />
                        <Typography id="date-slider" gutterBottom>
                            Wähle die Zeitspanne aus
                        </Typography>
                        <Slider
                            min={0}
                            max={23}
                            value={dateSliderValue}
                            onChange={handleDateSliderChange}
                            getAriaValueText={dateValuetext}
                            aria-labelledby="date-slider"
                            valueLabelDisplay="auto"
                            marks={dateMarks}
                        />

                        <Button></Button>
                    </DrawerDiv>
                </Drawer>
            </div>

        </HomeContainer>
    )
}

const MigraneWarning = (props) => {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const convertToDate = (dt) => {
        var d = new Date(dt * 1000);
        var {datestring, hours, minutes} = "";

        hours = "0" + d.getHours();
        minutes = "0" + d.getMinutes();
        return datestring = hours.substr(-2) + ':' + minutes.substr(-2);
    }

    useEffect(() => {
        setSuccess(false);
        setBtnDisabled(false);
    }, [props.danger])

    const handleEventCreation = () => {
        var startTime = new Date(props.danger.hours[0].dt * 1000)
        var endTime = new Date(props.danger.hours[props.danger.hours.length - 1].dt * 1000)
        var name = 'AspirinMinder - Migräne Warnung';
        var desc = 'Für diesen Zeitraum solltest du lieber eine Aspririn einpacken!'

        var event = {
            summary: name,
            description: desc,
            start: {
                dateTime: startTime,
                timeZone: 'Europe/Berlin'
            },
            end: {
                dateTime: endTime,
                timeZone: 'Europe/Berlin'
            },
            colorId: 3
        }

        setLoading(true);

        console.log('start time: ' + startTime.toDateString())
        console.log('end time: ' + endTime.toDateString())
        console.log('summary: ' + name)
        console.log('description: ' + desc)
        console.log(event);

        axios({
            url: 'http://localhost:8000/calendar',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
            },
            data: JSON.stringify(event)
        }).then(response => {
            (response.status === 200) ? (
                setSuccess(true)
            ) : (
                alert('Oh-oh! Something went wrong!')
            )
            console.log(response);
            setLoading(false);
        }, error => {
            console.log(error);
            setLoading(false);
        })

        setBtnDisabled(true);
    }

    return (
        <MigraneView>
            <p>{props.time}</p>
            <div className="migraneViewDiv">
                <Accordion className="detailAccordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <List>
                        <ListItem>
                            <DataView>
                                <p>Stunde</p>
                                <p>Temperatur</p>
                                <p>Luftdruck</p>
                            </DataView>
                        </ListItem>
                            {props.danger.hours.map((hour, index) => {
                                return(
                                    <ListItem key={index} divider>
                                        <DataView>
                                            <p>{convertToDate(hour.dt)}</p>
                                            <p>{hour.temp} °C</p>
                                            <p>{hour.pressure}</p>
                                        </DataView>
                                    </ListItem>
                                )
                            })}
                    </List>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="calendarDiv">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <div>
                        {success ? (
                            <Button disabled={true}><DoneIcon /></Button>
                        ) : (
                            <Button  disabled={btnDisabled} onClick={() => handleEventCreation()}><EventIcon /></Button>
                        )}
                    </div>
                )}
            </div>
        </MigraneView>
    )
}

export default Home;