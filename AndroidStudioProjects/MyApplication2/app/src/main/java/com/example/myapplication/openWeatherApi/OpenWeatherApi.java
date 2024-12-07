package com.example.myapplication.openWeatherApi;
import com.example.myapplication.model.WeatherData;
import android.util.Log;
import org.json.JSONObject;
import org.json.JSONArray;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class OpenWeatherApi {
    private static final String TAG = "OpenWeatherApi";
    private static final String API_KEY = "2ea9a21e0ce9a9119507d3331b6a32ff";
    private static final String BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

    public void fetchWeatherData(double latitude, double longitude, String targetDate,
                                 WeatherDataCallback callback) {
        new Thread(() -> {
            try {
                String urlString = String.format("%s?lat=%f&lon=%f&appid=%s&units=metric",
                        BASE_URL, latitude, longitude, API_KEY);

                URL url = new URL(urlString);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();

                Log.d(TAG, "Fetching from URL: " + urlString);

                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;

                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                // Parse the response for the specific date
                JSONObject jsonResponse = new JSONObject(response.toString());
                JSONArray list = jsonResponse.getJSONArray("list");

                double minTemp = Double.MAX_VALUE;
                double maxTemp = Double.MIN_VALUE;
                double totalRain = 0;
                double totalSnow = 0;
                double maxWindSpeed = 0;
                boolean hasStorm = false;
                boolean hasIceRain = false;
                int dataPointsCount = 0;

                // Filter and aggregate data for target date
                for (int i = 0; i < list.length(); i++) {
                    JSONObject timeSlot = list.getJSONObject(i);
                    String dt_txt = timeSlot.getString("dt_txt").split(" ")[0]; // Get date part

                    if (dt_txt.equals(targetDate)) {
                        dataPointsCount++;
                        JSONObject main = timeSlot.getJSONObject("main");
                        JSONObject wind = timeSlot.getJSONObject("wind");

                        // Update temperature range
                        minTemp = Math.min(minTemp, main.getDouble("temp_min"));
                        maxTemp = Math.max(maxTemp, main.getDouble("temp_max"));

                        // Update wind speed
                        maxWindSpeed = Math.max(maxWindSpeed, wind.getDouble("speed"));

                        // Check for rain
                        if (timeSlot.has("rain")) {
                            JSONObject rain = timeSlot.getJSONObject("rain");
                            if (rain.has("3h")) {
                                totalRain += rain.getDouble("3h");
                            }
                        }

                        // Check for snow
                        if (timeSlot.has("snow")) {
                            JSONObject snow = timeSlot.getJSONObject("snow");
                            if (snow.has("3h")) {
                                totalSnow += snow.getDouble("3h");
                            }
                        }

                        // Check specific weather conditions
                        JSONArray weather = timeSlot.getJSONArray("weather");
                        for (int j = 0; j < weather.length(); j++) {
                            int id = weather.getJSONObject(j).getInt("id");
                            // Check for specific storm codes (210, 211, 212)
                            if (id == 210 || id == 211 || id == 212) {
                                hasStorm = true;
                            }
                            // Check for freezing rain (511)
                            if (id == 511) {
                                hasIceRain = true;
                            }
                        }
                    }
                }

                if (dataPointsCount == 0) {
                    throw new Exception("No data available for date: " + targetDate);
                }

                // Create WeatherData object with aggregated data
                final WeatherData weatherData = new WeatherData(
                        targetDate,
                        totalRain,        // total rainfall for the day
                        maxWindSpeed,     // maximum wind speed
                        hasStorm,         // storm alert
                        hasIceRain,       // ice rain alert
                        totalSnow,        // total snowfall
                        minTemp,          // minimum temperature
                        maxTemp           // maximum temperature
                );

                Log.d(TAG, "Processed data points: " + dataPointsCount);
                Log.d(TAG, "Weather data: " + weatherData.toString());

                new android.os.Handler(android.os.Looper.getMainLooper()).post(() -> {
                    callback.onSuccess(weatherData);
                });

            } catch (Exception e) {
                Log.e(TAG, "Error fetching weather: " + e.getMessage(), e);
                new android.os.Handler(android.os.Looper.getMainLooper()).post(() -> {
                    callback.onError(e);
                });
            }
        }).start();
    }

    public interface WeatherDataCallback {
        void onSuccess(WeatherData weatherData);
        void onError(Exception e);
    }
}