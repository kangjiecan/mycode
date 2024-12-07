package com.example.myapplication.model;

public class WeatherData {
    private  int id;
    private final String date;

    private final double rainfall;            // Rainfall in mm/day
    private final double windSpeed;           // Wind speed in km/h
    private final boolean stormAlert;         // Whether there is a storm
    private final boolean iceRainAlert;       // Whether there is ice rain
    private final double snow;                // Snowfall in mm/day
    private final double minTemperature;      // Minimum temperature
    private final double maxTemperature;      // Maximum temperature
    private int eventId;  // New field

    public WeatherData(int id, int eventId,String date,
                       double rainfall, double windSpeed, boolean stormAlert,
                       boolean iceRainAlert, double snow, double minTemperature,
                       double maxTemperature) {
        this.eventId = eventId;
        this.id = id;
        this.date = date;

        this.rainfall = rainfall;
        this.windSpeed = windSpeed;
        this.stormAlert = stormAlert;
        this.iceRainAlert = iceRainAlert;
        this.snow = snow;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
    }



    public WeatherData( String date, double rainfall, double windSpeed, boolean stormAlert,
                       boolean iceRainAlert, double snow, double minTemperature,
                       double maxTemperature) {
        this.date = date;

        this.rainfall = rainfall;
        this.windSpeed = windSpeed;
        this.stormAlert = stormAlert;
        this.iceRainAlert = iceRainAlert;
        this.snow = snow;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
    }

    // Getters only
    public int getId() {
        return id;
    }

    public String getDate() {
        return date;
    }



    public double getRainfall() {
        return rainfall;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public boolean isStormAlert() {
        return stormAlert;
    }

    public boolean isIceRainAlert() {
        return iceRainAlert;
    }

    public double getSnow() {
        return snow;
    }

    public double getMinTemperature() {
        return minTemperature;
    }

    public double getMaxTemperature() {
        return maxTemperature;
    }

    public int getEventId() {
        return eventId;
    }

    @Override
    public String toString() {
        return "WeatherData {" +
                "id=" + id +
                ", date='" + date + '\'' +

                ", rainfall=" + rainfall + " mm/day" +
                ", windSpeed=" + windSpeed + " km/h" +
                ", stormAlert=" + (stormAlert ? "Yes" : "No") +
                ", iceRainAlert=" + (iceRainAlert ? "Yes" : "No") +
                ", snow=" + snow + " mm/day" +
                ", minTemperature=" + minTemperature + "°C" +
                ", maxTemperature=" + maxTemperature + "°C" +
                '}';
    }
}