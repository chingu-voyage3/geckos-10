# DarkSky API response: the important bits

Sample API call: <https://api.darksky.net/forecast/[key]/[latitude],[longitude]?exclude=minutely,hourly,alerts,flags&units=auto>

Need to send API key, plus latitude and longitude, which will be received from the HTML geolocation API

```json
"currently": {
    summary (?)
    icon
    temperature
    apparentTemperature (?)
    precipProbability (?)
}

"daily": {
    "data": [
        {
            time // to be turned into a weekday
            icon
            temperatureHigh
            temperatureLow
        },
        ...
    ]
}
```

* check whether darksky-unavailable exists
* "you can just treat partly-cloudy-night as an alias for clear-day."
* timezone (e.g. America/New_York) required (in response). The IANA timezone name for the requested location. This is used for text summaries and for determining when hourly and daily data block objects begin.