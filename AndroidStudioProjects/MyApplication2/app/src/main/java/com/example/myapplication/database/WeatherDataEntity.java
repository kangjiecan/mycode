package com.example.myapplication.database;

import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.ForeignKey;
import androidx.room.Index;
import com.example.myapplication.model.WeatherData;

@Entity(
        tableName = "weather_data",
        foreignKeys = @ForeignKey(
                entity = TrailDayEventEntity.class,
                parentColumns = "id",
                childColumns = "eventId",
                onDelete = ForeignKey.CASCADE
        ),
        indices = {@Index("eventId")}
)
public class WeatherDataEntity {
    @PrimaryKey(autoGenerate = true)
    private int id;

    private int eventId;
    private String date;
    private double rainfall;
    private double windSpeed;
    private boolean stormAlert;
    private boolean iceRainAlert;
    private double snow;
    private double minTemperature;
    private double maxTemperature;

    // Default Constructor
    public WeatherDataEntity() {
    }

    // Parameterized Constructor
    public WeatherDataEntity(String date, double rainfall, double windSpeed,
                             boolean stormAlert, boolean iceRainAlert, double snow,
                             double minTemperature, double maxTemperature, int eventId) {
        this.date = date;
        this.rainfall = rainfall;
        this.windSpeed = windSpeed;
        this.stormAlert = stormAlert;
        this.iceRainAlert = iceRainAlert;
        this.snow = snow;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
        this.eventId = eventId;
    }

    // Convert to Model (you'll need to get location from associated Event)
    public WeatherData toWeatherData() {
        return new WeatherData(
                this.id,
                this.eventId,  // Moved to match constructor order
                this.date,
                this.rainfall,
                this.windSpeed,
                this.stormAlert,
                this.iceRainAlert,
                this.snow,
                this.minTemperature,
                this.maxTemperature
        );
    }

    // Convert from Model
    public static WeatherDataEntity fromWeatherData(WeatherData weatherData, int eventId) {
        WeatherDataEntity entity = new WeatherDataEntity(
                weatherData.getDate(),
                weatherData.getRainfall(),
                weatherData.getWindSpeed(),
                weatherData.isStormAlert(),
                weatherData.isIceRainAlert(),
                weatherData.getSnow(),
                weatherData.getMinTemperature(),
                weatherData.getMaxTemperature(),
                eventId
        );
        entity.setId(weatherData.getId());
        return entity;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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