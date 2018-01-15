# Open Weather API JSON response

## Current Weather

### weather

* _maybe_ ```weather.id``` Weather condition id
* _maybe_ ```weather.main``` Group of weather parameters (Rain, Snow, Extreme etc.)
* ```weather.description``` Weather condition within the group
* ```weather.icon``` Weather icon id

### main

* ```main.temp``` Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
* ```main.temp_min``` Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
* ```main.temp_max``` Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.

### ```dt```

* Time of data calculation, unix, UTC

### ```name``` 

* City name

---

## 5-Day Forecast

### weather

* _maybe_ ```weather.id``` Weather condition id
* _maybe_ ```weather.main``` Group of weather parameters (Rain, Snow, Extreme etc.) 
* _maybe_```weather.description``` Weather condition within the group
* ```weather.icon``` Weather icon id

### main

* ```main.temp_min``` Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
* ```main.temp_max``` Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.

### ```dt```

* Time of data calculation, unix, UTC

### city

* _maybe_ ```city.name```?

---
## Notes

It is possible to meet more than one weather condition for a requested location.
The first weather condition in API response is primary.


### Planned features

* Show weather based on automatic geolocation
* Current weather with icon, weather description, temp, min temp, and max temp
* 5-day forecast with icon, weekday (from UTC), min temp, and max temp for each day
* Display city name on page
* Search for weather conditions in other cities
  * api.openweathermap.org/data/2.5/weather?q={city name},{ISO 3166 country code}
* Toggle between fahrenheit (```units=imperial```) and celsuis (```units=metric```).

#### Stretch goal: multilingual support

>You can use lang parameter to get the output in your language. We support the following languages that you can use with the corresponded lang values: 
Arabic - ar, Bulgarian - bg, Catalan - ca, Czech - cz, German - de, Greek - el, English - en, Persian (Farsi) - fa, Finnish - fi, French - fr, Galician - gl, Croatian - hr, Hungarian - hu, Italian - it, Japanese - ja, Korean - kr, Latvian - la, Lithuanian - lt, Macedonian - mk, Dutch - nl, Polish - pl, Portuguese - pt, Romanian - ro, Russian - ru, Swedish - se, Slovak - sk, Slovenian - sl, Spanish - es, Turkish - tr, Ukrainian - ua, Vietnamese - vi, Chinese Simplified - zh_cn, Chinese Traditional - zh_tw.
NOTE: Translation is only applied for the "description" field.

>API call:
>http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&lang={lang}


## Resources

* https://openweathermap.org/api
* http://openweathermap.org/weather-data
* http://openweathermap.org/weather-conditions