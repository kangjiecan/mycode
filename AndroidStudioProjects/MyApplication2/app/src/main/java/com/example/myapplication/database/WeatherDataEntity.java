package com.example.myapplication.database;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "weather_data")
public class WeatherDataEntity {
    @PrimaryKey(autoGenerate = true)
    private int id;

    private String date;
    private double latitude;
    private double longitude;
    private double rainfall;
    private double windSpeed;
    private boolean stormAlert;
    private boolean iceRainAlert;
    private double snow;
    private double minTemperature;
    private double maxTemperature;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getRainfall() {
        return rainfall;
    }

    public void setRainfall(double rainfall) {
        this.rainfall = rainfall;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public boolean isStormAlert() {
        return stormAlert;
    }

    public void setStormAlert(boolean stormAlert) {
        this.stormAlert = stormAlert;
    }

    public boolean isIceRainAlert() {
        return iceRainAlert;
    }

    public void setIceRainAlert(boolean iceRainAlert) {
        this.iceRainAlert = iceRainAlert;
    }

    public double getSnow() {
        return snow;
    }

    public void setSnow(double snow) {
        this.snow = snow;
    }

    public double getMinTemperature() {
        return minTemperature;
    }

    public void setMinTemperature(double minTemperature) {
        this.minTemperature = minTemperature;
    }

    public double getMaxTemperature() {
        return maxTemperature;
    }

    public void setMaxTemperature(double maxTemperature) {
        this.maxTemperature = maxTemperature;
    }
}