package com.example.myapplication.model;

public class UserSetting {
    private double rainfallThreshold;
    private double windSpeedThreshold;
    private boolean stormAlert;
    private boolean iceRainAlert;
    private double snowThreshold;
    private double minTemperature;
    private double maxTemperature;

    // Default constructor
    public UserSetting() {
    }

    // Full constructor
    public UserSetting(double rainfallThreshold, double windSpeedThreshold, boolean stormAlert,
                       boolean iceRainAlert, double snowThreshold, double minTemperature,
                       double maxTemperature) {
        this.rainfallThreshold = rainfallThreshold;
        this.windSpeedThreshold = windSpeedThreshold;  // Fixed from previous bug
        this.stormAlert = stormAlert;
        this.iceRainAlert = iceRainAlert;
        this.snowThreshold = snowThreshold;
        validateTemperatureRange(minTemperature, maxTemperature);  // Added validation
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
    }

    // Getters and setters
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
        validateTemperatureRange(minTemperature, this.maxTemperature);
        this.minTemperature = minTemperature;
    }

    public double getMaxTemperature() {
        return maxTemperature;
    }

    public void setMaxTemperature(double maxTemperature) {
        validateTemperatureRange(this.minTemperature, maxTemperature);
        this.maxTemperature = maxTemperature;
    }

    // Validation helper method
    private void validateTemperatureRange(double min, double max) {
        if (min > max) {
            throw new IllegalArgumentException("Minimum temperature cannot be greater than maximum temperature");
        }
    }

    @Override
    public String toString() {
        return "UserSetting{" +
                "rainfallThreshold=" + rainfallThreshold +
                ", windSpeedThreshold=" + windSpeedThreshold +
                ", stormAlert=" + stormAlert +
                ", iceRainAlert=" + iceRainAlert +
                ", snowThreshold=" + snowThreshold +
                ", minTemperature=" + minTemperature +
                ", maxTemperature=" + maxTemperature +
                "}";
    }
}