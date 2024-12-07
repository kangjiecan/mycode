package com.example.myapplication.database;

import android.content.Context;
import android.util.Log;

import androidx.room.Room;
import com.example.myapplication.database.DatabaseMigration;

public class DatabaseClient {
    private static DatabaseClient instance;
    private final AppDatabase appDatabase;
    private static final String TAG = "DatabaseClient";

    private DatabaseClient(Context context) {
        appDatabase = Room.databaseBuilder(
                        context.getApplicationContext(),
                        AppDatabase.class,
                        "app_database"
                )
                .fallbackToDestructiveMigration()  // This will recreate tables if migration fails
                // or use specific migration:
                .addMigrations(DatabaseMigration.MIGRATION_1_2)
                .build();
    }

    public static synchronized DatabaseClient getInstance(Context context) {
        if (instance == null) {
            instance = new DatabaseClient(context);
        }
        return instance;
    }

    public AppDatabase getAppDatabase() {
        return appDatabase;
    }
}