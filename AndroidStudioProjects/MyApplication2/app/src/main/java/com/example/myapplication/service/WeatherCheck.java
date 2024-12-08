package com.example.myapplication.service;

import android.util.Log;
import com.example.myapplication.model.Event;
import com.example.myapplication.model.WeatherData;
import com.example.myapplication.openWeatherApi.OpenWeatherApi;
import com.example.myapplication.database.TrailDayEventDAO;
import com.example.myapplication.database.UserSettingDAO;
import com.example.myapplication.database.UserSettingEntity;

public class WeatherCheck {
    private static final String TAG = "WeatherCheck";
    private final TrailDayEventDAO eventDao;
    private final UserSettingDAO userSettingDao;
    private final OpenWeatherApi weatherApi;

    public WeatherCheck(TrailDayEventDAO eventDao, UserSettingDAO userSettingDao) {
        this.eventDao = eventDao;
        this.userSettingDao = userSettingDao;
        this.weatherApi = new OpenWeatherApi();
    }

    private boolean shouldTriggerAlert(WeatherData weather, UserSettingEntity settings) {
        if (!settings.isAlertEnabled()) {
            return false;
        }

        // Check storm and ice rain alerts if enabled in settings
        if ((settings.isStormAlert() && weather.isStormAlert()) ||
                (settings.isIceRainAlert() && weather.isIceRainAlert())) {
            return true;
        }

        // Check thresholds
        return weather.getRainfall() > settings.getRainfallThreshold() ||
                weather.getWindSpeed() > settings.getWindSpeedThreshold() ||
                weather.getSnow() > settings.getSnowThreshold() ||
                weather.getMaxTemperature() > settings.getMaxTemperature() ||
                weather.getMinTemperature() < settings.getMinTemperature();
    }

    public void checkWeatherForLastEvent() {
        // Get last event
        Event lastEvent = eventDao.getLastEvent();
        if (lastEvent == null) {
            Log.i(TAG, "No events found in database");
            return;
        }

        // Get latest user settings
        UserSettingEntity userSettings = userSettingDao.getLatestSetting();
        if (userSettings == null) {
            Log.i(TAG, "No user settings found in database");
            return;
        }

        // Log event details
        Log.i(TAG, String.format("Checking weather for event ID: %d - %s at location: %.4f, %.4f",
                lastEvent.getId(),
                lastEvent.getEvent(),
                lastEvent.getLatitude(),
                lastEvent.getLongitude()));

        // Fetch weather data
        weatherApi.fetchWeatherData(
                lastEvent.getLatitude(),
                lastEvent.getLongitude(),
                lastEvent.getDate()
        ).subscribe(
                weatherData -> {
                    // Create new WeatherData object with event ID
                    WeatherData eventWeather = new WeatherData(
                            0,
                            lastEvent.getId(),
                            lastEvent.getDate(),
                            weatherData.getRainfall(),
                            weatherData.getWindSpeed(),
                            weatherData.isStormAlert(),
                            weatherData.isIceRainAlert(),
                            weatherData.getSnow(),
                            weatherData.getMinTemperature(),
                            weatherData.getMaxTemperature()
                    );

                    // Check if alert should be triggered
                    boolean shouldAlert = shouldTriggerAlert(eventWeather, userSettings);

                    // Update event alert status if needed
                    if (shouldAlert) {
                        eventDao.updateEventAlertStatus(lastEvent, lastEvent.getId(), true);
                        Log.i(TAG, "Updated alert status to true for event ID: " + lastEvent.getId());
                    }

                    // Log comprehensive weather and alert information
                    Log.i(TAG, String.format(
                            "Weather Alert Status:\n" +
                                    "Event: %s\n" +
                                    "Weather: %s\n" +
                                    "Settings: %s\n" +
                                    "Alert Triggered: %b\n" +
                                    "Reasons for alert:\n" +
                                    "- Storm Alert: %b (Setting: %b)\n" +
                                    "- Ice Rain Alert: %b (Setting: %b)\n" +
                                    "- Rainfall: %.1f mm/day (Threshold: %.1f)\n" +
                                    "- Wind Speed: %.1f km/h (Threshold: %.1f)\n" +
                                    "- Snow: %.1f mm/day (Threshold: %.1f)\n" +
                                    "- Temperature Range: %.1f to %.1f °C (Settings: %.1f to %.1f)",
                            lastEvent.getEvent(),
                            eventWeather.toString(),
                            userSettings.toString(),
                            shouldAlert,
                            eventWeather.isStormAlert(), userSettings.isStormAlert(),
                            eventWeather.isIceRainAlert(), userSettings.isIceRainAlert(),
                            eventWeather.getRainfall(), userSettings.getRainfallThreshold(),
                            eventWeather.getWindSpeed(), userSettings.getWindSpeedThreshold(),
                            eventWeather.getSnow(), userSettings.getSnowThreshold(),
                            eventWeather.getMinTemperature(), eventWeather.getMaxTemperature(),
                            userSettings.getMinTemperature(), userSettings.getMaxTemperature()
                    ));
                },
                error -> Log.e(TAG, "Error fetching weather data: " + error.getMessage())
        );
    }
}