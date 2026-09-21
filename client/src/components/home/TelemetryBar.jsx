import { useEffect, useState } from "react";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=24.8170" +
  "&longitude=93.9368" +
  "&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,uv_index" +
  "&temperature_unit=celsius" +
  "&wind_speed_unit=kmh" +
  "&precipitation_unit=mm" +
  "&timezone=Asia%2FKolkata";

const AIR_QUALITY_URL =
  "https://air-quality-api.open-meteo.com/v1/air-quality" +
  "?latitude=24.8170" +
  "&longitude=93.9368" +
  "&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,sulphur_dioxide,carbon_monoxide" +
  "&timezone=Asia%2FKolkata";

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Heavy rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

const getWeatherIcon = (code) => {
  if (code === 0) return "wb_sunny";

  if ([1, 2].includes(code)) {
    return "partly_cloudy_day";
  }

  if ([3, 45, 48].includes(code)) {
    return "cloud";
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "rainy";
  }

  if ([95, 96, 99].includes(code)) {
    return "thunderstorm";
  }

  return "cloud";
};

const getAqiLabel = (aqi) => {
  if (aqi === null || aqi === undefined) {
    return "Unavailable";
  }

  if (aqi <= 20) return "Good";
  if (aqi <= 40) return "Fair";
  if (aqi <= 60) return "Moderate";
  if (aqi <= 80) return "Poor";
  if (aqi <= 100) return "Very Poor";

  return "Extremely Poor";
};

export default function TelemetryBar() {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const [weatherResponse, airResponse] = await Promise.all([
          fetch(WEATHER_URL),
          fetch(AIR_QUALITY_URL),
        ]);

        if (!weatherResponse.ok) {
          throw new Error("Weather API request failed");
        }

        if (!airResponse.ok) {
          throw new Error("Air quality API request failed");
        }

        const weatherData = await weatherResponse.json();
        const airData = await airResponse.json();

        setWeather(weatherData.current);
        setAirQuality(airData.current);
      } catch (error) {
        console.error("Telemetry API error:", error);
      }
    };

    fetchTelemetry();

    // Refresh telemetry every 15 minutes
    const interval = setInterval(
      fetchTelemetry,
      15 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  const condition = weather
    ? weatherDescriptions[weather.weather_code] || "Unknown"
    : "Loading...";

  const temperature = weather
    ? `${Math.round(weather.temperature_2m)}°C`
    : "--°C";

  const humidity = weather
    ? `${weather.relative_humidity_2m}%`
    : "--%";

  const wind = weather
    ? `${Math.round(weather.wind_speed_10m)} km/h`
    : "-- km/h";

  const precipitation = weather
    ? `${weather.precipitation} mm`
    : "-- mm";

  const feelsLike = weather
    ? `${Math.round(weather.apparent_temperature)}°C`
    : "--°C";

  const uvIndex = weather
    ? Number(weather.uv_index).toFixed(1)
    : "--";

  const aqi = airQuality
    ? Math.round(airQuality.european_aqi)
    : "--";

  const aqiLabel = airQuality
    ? getAqiLabel(airQuality.european_aqi)
    : "Loading...";

  const pm25 = airQuality
    ? `${Number(airQuality.pm2_5).toFixed(1)} µg/m³`
    : "-- µg/m³";

  const pm10 = airQuality
    ? `${Number(airQuality.pm10).toFixed(1)} µg/m³`
    : "-- µg/m³";
  return (
    <section className="telemetry-bar">
      <div className="telemetry-inner">
        {/* Left telemetry information */}
        <div className="telemetry-main">
          <span className="telemetry-live-dot" />

          <span className="telemetry-title">
            Live Valley Telemetry
          </span>

          <span className="telemetry-divider">|</span>

          <span className="telemetry-item">
            <span className="material-symbols-outlined telemetry-icon telemetry-icon-sun">
              wb_sunny
            </span>
            Imphal 22°C (Clear)
          </span>

          <span className="telemetry-divider telemetry-sm-only">
            |
          </span>

          <span className="telemetry-item telemetry-sm-only">
            <span className="material-symbols-outlined telemetry-icon telemetry-icon-air">
              air
            </span>
            AQI: 28 (Pristine)
          </span>

          <span className="telemetry-divider telemetry-md-only">
            |
          </span>

          <span className="telemetry-item telemetry-md-only">
            <span className="material-symbols-outlined telemetry-icon telemetry-icon-water">
              kayaking
            </span>
            Loktak Boating: Optimal Level
          </span>
        </div>

        {/* e-ILP status */}
        <div className="telemetry-status">
          <span className="material-symbols-outlined telemetry-status-icon">
            bolt
          </span>

          <span>
            Inner Line Permit (e-ILP): Instant E-Approval Active
          </span>
        </div>
      </div>
    </section>
  );

}