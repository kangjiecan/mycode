package com.example.myapplication.service;

import android.util.Log;
import com.example.myapplication.model.Event;
import com.example.myapplication.model.WeatherData;
import com.example.myapplication.openWeatherApi.OpenWeatherApi;
import com.example.myapplication.database.TrailDayEventDAO;
import com.example.myapplication.database.UserSettingDAO;
import com.example.myapplication.database.UserSettingEntity;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import android.util.Pair;
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
        Log.d(TAG, "Checking alert conditions...");

        if (!settings.isAlertEnabled()) {
            return false;
        }

        boolean shouldAlert = weather.getMinTemperature() < settings.getMinTemperature() ||
                weather.getMaxTemperature() > settings.getMaxTemperature() ||
                weather.getRainfall() > settings.getRainfallThreshold() ||
                weather.getWindSpeed() > settings.getWindSpeedThreshold() ||
                weather.getSnow() > settings.getSnowThreshold() ||
                (settings.isStormAlert() && weather.isStormAlert()) ||
                (settings.isIceRainAlert() && weather.isIceRainAlert());

        Log.d(TAG, "Alert triggered: " + shouldAlert);
        return shouldAlert;
    }

    public void checkWeatherForLastEvent() {
        // Get last event on IO thread
        Single.fromCallable(() -> eventDao.getLastEvent())
                .subscribeOn(Schedulers.io())
                .flatMap(lastEvent -> {
                    if (lastEvent == null) {
                        return Single.error(new IllegalStateException("No events found"));
                    }
                    return Single.just(lastEvent);
                })
                // Get user settings on IO thread
                .flatMap(lastEvent ->
                        Single.fromCallable(() -> userSettingDao.getLatestSetting())
                                .subscribeOn(Schedulers.io())
                                .map(settings -> new Pair<>(lastEvent, settings))
                )
                .flatMap(pair -> {
                    Event lastEvent = pair.first;
                    UserSettingEntity settings = pair.second;

                    if (settings == null) {
                        return Single.error(new IllegalStateException("No settings found"));
                    }

                    // Fetch weather data
                    return weatherApi.fetchWeatherData(
                                    lastEvent.getLatitude(),
                                    lastEvent.getLongitude(),
                                    lastEvent.getDate()
                            )
                            .map(weatherData -> new Triple<>(lastEvent, settings, weatherData));
                })
                .observeOn(Schedulers.io()) // Ensure we're on IO thread for database operations
                .subscribe(
                        triple -> {
                            Event lastEvent = triple.first;
                            UserSettingEntity settings = triple.second;
                            WeatherData weatherData = triple.third;

                            Log.d(TAG, String.format("Checking weather for event ID: %d at location: %.4f, %.4f",
                                    lastEvent.getId(),
                                    lastEvent.getLatitude(),
                                    lastEvent.getLongitude()));

                            boolean shouldAlert = shouldTriggerAlert(weatherData, settings);
                            Log.d(TAG, "Updating database with alert status: " + shouldAlert);

                            // Update database regardless of shouldAlert value
                            eventDao.updateEventAlertStatus(lastEvent, lastEvent.getId(), shouldAlert);

                            // Verify update
                            Event updatedEvent = eventDao.getEventById(lastEvent.getId());
                            if (updatedEvent != null) {
                                Log.d(TAG, "Database successfully updated with alert status: " + updatedEvent.isAlerted());
                            }
                        },
                        error -> Log.e(TAG, "Error in weather check: " + error.getMessage())
                );
    }

    // Helper class for triple values
    private static class Triple<T, U, V> {
        final T first;
        final U second;
        final V third;

        Triple(T first, U second, V third) {
            this.first = first;
            this.second = second;
            this.third = third;
        }
    }

}