package com.example.myapplication.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {UserSettingEntity.class, WeatherDataEntity.class, TrailDayEvenEntity.class}, version = 4, exportSchema = false)
public abstract class AppDatabase extends RoomDatabase {
    public abstract UserSettingDAO userSettingDAO();
    public abstract WeatherDataDAO weatherDataDAO();
    public abstract TrailDayEvenDAO trailDayEvenDAO();
}