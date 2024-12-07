package com.example.myapplication.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface WeatherDataDAO {
    @Insert
    void insert(WeatherDataEntity weatherData);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertAll(List<WeatherDataEntity> weatherDataList);

    @Update
    void update(WeatherDataEntity weatherData);

    @Delete
    void delete(WeatherDataEntity weatherData);

    @Query("SELECT * FROM weather_data WHERE date = :date")
    List<WeatherDataEntity> getByDate(String date);

    @Query("DELETE FROM weather_data WHERE date < :thresholdDate")
    void deleteOldData(String thresholdDate);

    @Query("SELECT * FROM weather_data")
    List<WeatherDataEntity> getAllWeatherData();

    @Query("SELECT * FROM weather_data WHERE date BETWEEN :startDate AND :endDate")
    List<WeatherDataEntity> getWeatherDataBetweenDates(String startDate, String endDate);

    @Query("SELECT * FROM weather_data WHERE latitude BETWEEN :minLat AND :maxLat AND longitude BETWEEN :minLon AND :maxLon")
    List<WeatherDataEntity> getWeatherDataInRegion(double minLat, double maxLat, double minLon, double maxLon);

    @Query("SELECT * FROM weather_data WHERE stormAlert = 1")
    List<WeatherDataEntity> getStormAlerts();

    @Query("SELECT * FROM weather_data WHERE iceRainAlert = 1")
    List<WeatherDataEntity> getIceRainAlerts();

    @Query("SELECT * FROM weather_data ORDER BY date DESC LIMIT 1")
    WeatherDataEntity getMostRecentWeatherData();

    @Query("SELECT AVG(rainfall) FROM weather_data WHERE date BETWEEN :startDate AND :endDate")
    double getAverageRainfallBetweenDates(String startDate, String endDate);

    @Query("SELECT MAX(windSpeed) FROM weather_data WHERE date BETWEEN :startDate AND :endDate")
    double getMaxWindSpeedBetweenDates(String startDate, String endDate);

    @Query("SELECT COUNT(*) FROM weather_data")
    int getWeatherDataCount();

    @Query("DELETE FROM weather_data")
    void deleteAllWeatherData();
}