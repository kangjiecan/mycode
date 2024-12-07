package com.example.myapplication.database;

import androidx.room.Entity;
import androidx.room.PrimaryKey;
import com.example.myapplication.model.Even;

@Entity(tableName = "trail_day_even")
public class TrailDayEvenEntity {
    @PrimaryKey(autoGenerate = true)
    private int id;

    private String event;
    private String date;
    private double latitude;
    private double longitude;

    // Constructor to create entity from Even model
    public TrailDayEvenEntity(Even even) {
        this.event = even.getEvent();
        this.date = even.getDate();
        this.latitude = even.getLatitude();
        this.longitude = even.getLongitude();
    }

    // Default constructor required by Room
    public TrailDayEvenEntity() {
    }

    // Convert entity to Even model
    public Even toEven() {
        return new Even(event, date, latitude, longitude);
    }

    // Getters and Setters
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
}