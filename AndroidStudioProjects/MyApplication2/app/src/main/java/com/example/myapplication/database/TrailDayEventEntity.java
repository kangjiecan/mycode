package com.example.myapplication.database;

import androidx.room.Entity;
import androidx.room.PrimaryKey;
import com.example.myapplication.model.Event;

@Entity(tableName = "trail_day_even")
public class TrailDayEventEntity {
    @PrimaryKey(autoGenerate = true)

    private int id;
    private String event;
    private String date;
    private double latitude;
    private double longitude;

    // Constructor to create entity from Event model
    public TrailDayEventEntity(Event event) {
        this.event = event.getEvent();
        this.date = event.getDate();
        this.latitude = event.getLatitude();
        this.longitude = event.getLongitude();
    }

    // Default constructor required by Room
    public TrailDayEventEntity() {
    }

    // Convert entity to Event model
    public Event toEvent() {
        return new Event(
                this.id,  // Include the ID when converting to Event
                this.event,
                this.date,
                this.latitude,
                this.longitude
        );}

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