export async function getCurrentWeatherData() {
    const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?id=2950158&appid=c1cc4c6011bcbe3a3d85d455b033df71");
    return response.json();
}

export async function getDailyForecast() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=54.033329&lon=10.45&appid=c1cc4c6011bcbe3a3d85d455b033df71");
    return response.json();
}