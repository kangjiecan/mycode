package com.example.myapplication.model;

public class Even {

    // Attributes
    private String event;       // Name of the event
    private String date;        // Date in "YYYY-MM-DD" format
    private double latitude;    // Latitude of the location
    private double longitude;   // Longitude of the location

    // Constructor
    public Even(String event, String date, double latitude, double longitude) {
        this.event = event;
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters and Setters
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

    // toString Method for Debugging and Logging
    @Override
    public String toString() {
        return "LocationAndDate{" +
                "event='" + event + '\'' +
                ", date='" + date + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}