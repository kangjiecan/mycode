package com.example.myapplication.model;

public class WeatherData {
    // Attributes
    private double rainfall;            // Rainfall in mm/day
    private double windSpeed;           // Wind speed in km/h
    private boolean stormAlert;         // Whether there is a storm
    private boolean iceRainAlert;       // Whether there is ice rain
    private double snow;                // Snowfall in mm/day
    private double minTemperature;      // Minimum temperature
    private double maxTemperature;      // Maximum temperature

    // Default Constructor
    public WeatherData() {
    }

    // Parameterized Constructor
    public WeatherData(double rainfall, double windSpeed, boolean stormAlert, boolean iceRainAlert,
                       double snow, double minTemperature, double maxTemperature) {
        this.rainfall = rainfall;
        this.windSpeed = windSpeed;
        this.stormAlert = stormAlert;
        this.iceRainAlert = iceRainAlert;
        this.snow = snow;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
    }

    // Getters and Setters
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

    // Override toString for readable representation
    @Override
    public String toString() {
        return "WeatherData {" +
                "rainfall=" + rainfall + " mm/day" +
                ", windSpeed=" + windSpeed + " km/h" +
                ", stormAlert=" + (stormAlert ? "Yes" : "No") +
                ", iceRainAlert=" + (iceRainAlert ? "Yes" : "No") +
                ", snow=" + snow + " mm/day" +
                ", minTemperature=" + minTemperature + "°C" +
                ", maxTemperature=" + maxTemperature + "°C" +
                '}';
    }
}