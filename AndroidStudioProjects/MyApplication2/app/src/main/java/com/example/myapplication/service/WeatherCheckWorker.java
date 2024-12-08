package com.example.myapplication.service;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import com.example.myapplication.database.DatabaseClient;
import com.example.myapplication.database.TrailDayEventDAO;
import com.example.myapplication.database.UserSettingDAO;
import com.example.myapplication.service.WeatherCheck;
@SuppressWarnings("InstantiableWorkManager")

public class WeatherCheckWorker extends Worker {
    private static final String TAG = "WeatherCheckWorker";
    private final WeatherCheck weatherCheck;

    public WeatherCheckWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
        TrailDayEventDAO eventDao = DatabaseClient.getInstance(context).getAppDatabase().trailDayEventDAO();
        UserSettingDAO settingDao = DatabaseClient.getInstance(context).getAppDatabase().userSettingDAO();
        weatherCheck = new WeatherCheck(eventDao, settingDao);
    }

    @NonNull
    @Override
    public Result doWork() {
        try {
            weatherCheck.checkWeatherForLastEvent();
            // Broadcast that weather check is complete
            Intent intent = new Intent("WEATHER_CHECK_COMPLETE");
            getApplicationContext().sendBroadcast(intent);
            return Result.success();
        } catch (Exception e) {
            Log.e(TAG, "Error in weather check: " + e.getMessage());
            return Result.failure();
        }
    }
}
