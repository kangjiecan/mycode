package com.example.myapplication.database;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import com.example.myapplication.model.UserSetting;

@Entity(tableName = "user_settings")
public class UserSettingEntity {
    @PrimaryKey(autoGenerate = true)
    private int id;

    private String event;
    private String date;
    private double latitude;
    private double longitude;
    private double rainfallThreshold;
    private double windSpeedThreshold;
    private boolean stormAlert;
    private boolean iceRainAlert;
    private double snowThreshold;
    private double minTemperature;
    private double maxTemperature;
    @ColumnInfo(name = "alert_enabled")
    private boolean alertEnabled = true;

    // Default constructor required by Room
    public UserSettingEntity() {
    }

    // Constructor that takes a UserSetting object
    public UserSettingEntity(UserSetting userSetting) {
        this.rainfallThreshold = userSetting.getRainfallThreshold();
        this.windSpeedThreshold = userSetting.getWindSpeedThreshold();
        this.stormAlert = userSetting.isStormAlert();
        this.iceRainAlert = userSetting.isIceRainAlert();
        this.snowThreshold = userSetting.getSnowThreshold();
        this.minTemperature = userSetting.getMinTemperature();
        this.maxTemperature = userSetting.getMaxTemperature();
    }

    // Convert to UserSetting object
    public UserSetting toUserSetting() {
        return new UserSetting(
                rainfallThreshold,
                windSpeedThreshold,
                stormAlert,
                iceRainAlert,
                snowThreshold,
                minTemperature,
                maxTemperature
        );
    }

    // Getters and Setters with validation
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
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

    public double getRainfallThreshold() {
        return rainfallThreshold;
    }

    public void setRainfallThreshold(double rainfallThreshold) {
        if (rainfallThreshold < 0) {
            throw new IllegalArgumentException("Rainfall threshold cannot be negative");
        }
        this.rainfallThreshold = rainfallThreshold;
    }

    public double getWindSpeedThreshold() {
        return windSpeedThreshold;
    }

    public void setWindSpeedThreshold(double windSpeedThreshold) {
        if (windSpeedThreshold < 0) {
            throw new IllegalArgumentException("Wind speed threshold cannot be negative");
        }
        this.windSpeedThreshold = windSpeedThreshold;
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

    public double getSnowThreshold() {
        return snowThreshold;
    }

    public void setSnowThreshold(double snowThreshold) {
        if (snowThreshold < 0) {
            throw new IllegalArgumentException("Snow threshold cannot be negative");
        }
        this.snowThreshold = snowThreshold;
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

    public boolean isAlertEnabled() {
        return alertEnabled;
    }

    public void setAlertEnabled(boolean alertEnabled) {
        this.alertEnabled = alertEnabled;
    }

    @Override
    public String toString() {
        return "UserSettingEntity{" +
                "id=" + id +
                ", event='" + event + '\'' +
                ", date='" + date + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", rainfallThreshold=" + rainfallThreshold +
                ", windSpeedThreshold=" + windSpeedThreshold +
                ", stormAlert=" + stormAlert +
                ", iceRainAlert=" + iceRainAlert +
                ", snowThreshold=" + snowThreshold +
                ", minTemperature=" + minTemperature +
                ", maxTemperature=" + maxTemperature +
                ", alertEnabled=" + alertEnabled +
                '}';
    }
}