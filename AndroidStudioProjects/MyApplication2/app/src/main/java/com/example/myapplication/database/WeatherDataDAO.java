package com.example.myapplication.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

@Dao
public interface WeatherDataDAO {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long insert(WeatherDataEntity weatherData);

    @Query("SELECT * FROM weather_data ORDER BY date DESC LIMIT 1")
    WeatherDataEntity getLatestWeatherData();

    @Query("DELETE FROM weather_data WHERE id != (SELECT id FROM weather_data ORDER BY date DESC LIMIT 1)")
    void deleteOldData();

    @Query("UPDATE weather_data SET date = :date, " +
            "rainfall = :rainfall, windSpeed = :windSpeed, stormAlert = :stormAlert, " +
            "iceRainAlert = :iceRainAlert, snow = :snow, minTemperature = :minTemperature, " +
            "maxTemperature = :maxTemperature WHERE eventId = :eventId")

    void updateWeatherDataByEventId(int eventId, String date,
                                    double rainfall, double windSpeed, boolean stormAlert,
                                    boolean iceRainAlert, double snow, double minTemperature,
                                    double maxTemperature);

}