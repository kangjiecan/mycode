package com.example.myapplication.database;

import androidx.room.migration.Migration;
import androidx.sqlite.db.SupportSQLiteDatabase;

public class DatabaseMigration {

    public static final Migration MIGRATION_1_2 = new Migration(1, 2) {
        @Override
        public void migrate(SupportSQLiteDatabase database) {
            // Add the alert_enabled column if it doesn't exist
            database.execSQL("ALTER TABLE user_settings ADD COLUMN alert_enabled INTEGER NOT NULL DEFAULT 1");
        }
    };

    // Migration from version 2 to 3: Adding a new column to `user_settings`
    public static final Migration MIGRATION_2_3 = new Migration(2, 3) {
        @Override
        public void migrate(SupportSQLiteDatabase database) {
            // Example modification: Add a new column `alert_enabled` to the user_settings table
            database.execSQL(
                    "ALTER TABLE user_settings ADD COLUMN alert_enabled INTEGER DEFAULT 1 NOT NULL"
            );
        }
    };

    // Migration from version 3 to 4: Adding weather_data table
    public static final Migration MIGRATION_3_4 = new Migration(3, 4) {
        @Override
        public void migrate(SupportSQLiteDatabase database) {
            // Create weather_data table
            database.execSQL(
                    "CREATE TABLE IF NOT EXISTS weather_data (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                            "rainfall REAL, " +
                            "wind_speed REAL, " +
                            "storm_alert INTEGER, " +
                            "ice_rain_alert INTEGER, " +
                            "snow_threshold REAL, " +
                            "min_temperature REAL, " +
                            "max_temperature REAL)"
            );
        }
    };
}