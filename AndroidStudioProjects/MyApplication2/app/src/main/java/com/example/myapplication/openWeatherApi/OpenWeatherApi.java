package com.example.myapplication.openWeatherApi;

import com.example.myapplication.model.WeatherData;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers;
import org.json.JSONObject;
import org.json.JSONArray;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import android.util.Log;

public class OpenWeatherApi {
    private static final String TAG = "OpenWeatherApi";
    private static final String API_KEY = "2ea9a21e0ce9a9119507d3331b6a32ff";
    private static final String BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

    private final OkHttpClient client;

    // Weather condition codes
    private static class WeatherCodes {
        static final int THUNDERSTORM_WITH_LIGHT_RAIN = 210;
        static final int THUNDERSTORM = 211;
        static final int HEAVY_THUNDERSTORM = 212;
        static final int FREEZING_RAIN = 511;
    }

    public OpenWeatherApi() {
        this.client = new OkHttpClient();
    }

    public Single<WeatherData> fetchWeatherData(double latitude, double longitude, String targetDate) {
        return Single.fromCallable(() -> {
                    String urlString = String.format("%s?lat=%f&lon=%f&appid=%s&units=metric",
                            BASE_URL, latitude, longitude, API_KEY);

                    Request request = new Request.Builder()
                            .url(urlString)
                            .build();

                    try (Response response = client.newCall(request).execute()) {
                        if (!response.isSuccessful()) {
                            throw new Exception("Unexpected code " + response);
                        }

                        String jsonData = response.body().string();
                        return processWeatherData(jsonData, targetDate);
                    }
                })
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread());
    }

    private WeatherData processWeatherData(String jsonData, String targetDate) throws Exception {
        JSONObject jsonResponse = new JSONObject(jsonData);
        JSONArray list = jsonResponse.getJSONArray("list");

        WeatherDataBuilder builder = new WeatherDataBuilder();
        builder.setTargetDate(targetDate);

        for (int i = 0; i < list.length(); i++) {
            JSONObject timeSlot = list.getJSONObject(i);
            String dt_txt = timeSlot.getString("dt_txt").split(" ")[0];

            if (dt_txt.equals(targetDate)) {
                processTimeSlot(timeSlot, builder);
            }
        }

        if (builder.getDataPoints() == 0) {
            throw new Exception("No data available for date: " + targetDate);
        }

        return builder.build();
    }

    private void processTimeSlot(JSONObject timeSlot, WeatherDataBuilder builder) throws Exception {
        JSONObject main = timeSlot.getJSONObject("main");
        builder.updateTemperature(
                main.getDouble("temp_min"),
                main.getDouble("temp_max")
        );

        JSONObject wind = timeSlot.getJSONObject("wind");
        builder.updateWindSpeed(wind.getDouble("speed"));

        if (timeSlot.has("rain")) {
            JSONObject rain = timeSlot.getJSONObject("rain");
            if (rain.has("3h")) {
                builder.addRainfall(rain.getDouble("3h"));
            }
        }

        if (timeSlot.has("snow")) {
            JSONObject snow = timeSlot.getJSONObject("snow");
            if (snow.has("3h")) {
                builder.addSnowfall(snow.getDouble("3h"));
            }
        }

        JSONArray weather = timeSlot.getJSONArray("weather");
        for (int i = 0; i < weather.length(); i++) {
            int id = weather.getJSONObject(i).getInt("id");
            checkWeatherCondition(id, builder);
        }
    }

    private void checkWeatherCondition(int weatherCode, WeatherDataBuilder builder) {
        if (weatherCode == WeatherCodes.THUNDERSTORM_WITH_LIGHT_RAIN ||
                weatherCode == WeatherCodes.THUNDERSTORM ||
                weatherCode == WeatherCodes.HEAVY_THUNDERSTORM) {
            builder.setStormAlert(true);
        }
        if (weatherCode == WeatherCodes.FREEZING_RAIN) {
            builder.setIceRainAlert(true);
        }
    }

    private static class WeatherDataBuilder {
        private double minTemp = Double.MAX_VALUE;
        private double maxTemp = Double.MIN_VALUE;
        private double totalRain = 0;
        private double totalSnow = 0;
        private double maxWindSpeed = 0;
        private boolean hasStorm = false;
        private boolean hasIceRain = false;
        private String targetDate;
        private int dataPoints = 0;

        public void updateTemperature(double min, double max) {
            minTemp = Math.min(minTemp, min);
            maxTemp = Math.max(maxTemp, max);
            dataPoints++;
        }

        public void updateWindSpeed(double speed) {
            maxWindSpeed = Math.max(maxWindSpeed, speed);
        }

        public void addRainfall(double rain) {
            totalRain += rain;
        }

        public void addSnowfall(double snow) {
            totalSnow += snow;
        }

        public void setStormAlert(boolean hasStorm) {
            this.hasStorm = hasStorm;
        }

        public void setIceRainAlert(boolean hasIceRain) {
            this.hasIceRain = hasIceRain;
        }

        public void setTargetDate(String targetDate) {
            this.targetDate = targetDate;
        }

        public int getDataPoints() {
            return dataPoints;
        }

        public WeatherData build() {
            return new WeatherData(
                    targetDate,
                    totalRain,
                    maxWindSpeed,
                    hasStorm,
                    hasIceRain,
                    totalSnow,
                    minTemp,
                    maxTemp
            );
        }
    }
}