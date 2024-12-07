package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.openWeatherApi.OpenWeatherApi;
import com.example.myapplication.model.WeatherData;

public class Weather_details extends AppCompatActivity {
    private static final String TAG = "Weather_details";
    private static final double HALIFAX_LATITUDE = 44.6488;
    private static final double HALIFAX_LONGITUDE = -63.5752;

    private OpenWeatherApi weatherApi;
    private TextView weatherDetailsTextView;
    private TextView debugTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather_details);

        // Initialize views
        weatherDetailsTextView = findViewById(R.id.weatherDetailsTextView);
        debugTextView = findViewById(R.id.debugTextView);

        // Initialize OpenWeatherApi
        weatherApi = new OpenWeatherApi();
        debugLog("OpenWeatherApi initialized");

        // Setup buttons
        setupButtons();

        // Initial weather fetch
        fetchHalifaxWeather();
    }

    private void setupButtons() {
        Button returnButton = findViewById(R.id.returnButton);
        Button refreshButton = findViewById(R.id.refreshButton);

        returnButton.setOnClickListener(v -> {
            Intent intent = new Intent(Weather_details.this, MainActivity.class);
            startActivity(intent);
            finish();
        });

        refreshButton.setOnClickListener(v -> {
            debugLog("Manually refreshing weather data...");
            fetchHalifaxWeather();
        });
    }

    private void fetchHalifaxWeather() {
        debugLog("Starting weather fetch for Halifax...");
        debugLog(String.format("Coordinates: %.4f, %.4f", HALIFAX_LATITUDE, HALIFAX_LONGITUDE));

        // Show loading state
        weatherDetailsTextView.setText("Loading weather data...");

        weatherApi.fetchWeatherData(
                HALIFAX_LATITUDE,
                HALIFAX_LONGITUDE,
                "2024-12-08",
                new OpenWeatherApi.WeatherDataCallback() {
                    @Override
                    public void onSuccess(WeatherData weatherData) {
                        runOnUiThread(() -> {
                            // Log raw weather data
                            debugLog("Raw Weather Data received:");
                            debugLog("Temperature: " + weatherData.getMinTemperature() + " to " + weatherData.getMaxTemperature());
                            debugLog("Rainfall: " + weatherData.getRainfall());
                            debugLog("Snow: " + weatherData.getSnow());
                            debugLog("Wind Speed: " + weatherData.getWindSpeed());
                            debugLog("Date: " + weatherData.getDate());
                            debugLog("Storm Alert: " + (weatherData.isStormAlert() ? "Storm detected" : "No storm"));
                            debugLog("Ice Rain Alert: " + (weatherData.isIceRainAlert() ? "Ice rain detected" : "No ice rain"));

                            String weatherInfo = formatWeatherData(weatherData);
                            weatherDetailsTextView.setText(weatherInfo);
                            Toast.makeText(Weather_details.this,
                                    "Weather data updated", Toast.LENGTH_SHORT).show();
                        });
                    }

                    @Override
                    public void onError(Exception e) {
                        runOnUiThread(() -> {
                            String errorMsg = "Error fetching weather: " + e.getMessage();
                            weatherDetailsTextView.setText("Unable to load weather data");
                            debugLog("Weather fetch ERROR:\n" + errorMsg);
                            debugLog("Error class: " + e.getClass().getName());
                            debugLog("Stack trace: " + Log.getStackTraceString(e));

                            Toast.makeText(Weather_details.this,
                                    errorMsg, Toast.LENGTH_LONG).show();

                            Log.e(TAG, "Detailed error: ", e);
                        });
                    }
                }
        );
    }

    private void debugLog(String message) {
        Log.d(TAG, message);
        runOnUiThread(() -> {
            if (debugTextView != null) {
                String currentText = debugTextView.getText().toString();
                String timestamp = java.text.DateFormat.getTimeInstance().format(new java.util.Date());
                String newText = timestamp + ": " + message + "\n" + currentText;
                debugTextView.setText(newText);
            }
        });
    }

    private String formatWeatherData(WeatherData data) {
        return String.format(
                "Halifax Weather Report\n" +
                        "Date: %s\n" +
                        "------------------------\n" +
                        "Temperature Range: %.1f°C to %.1f°C\n" +
                        "Rainfall: %.1f mm\n" +
                        "Snow: %.1f cm\n" +
                        "Wind Speed: %.1f km/h\n" +
                        "Storm Status: %s\n" +
                        "Ice Rain Status: %s",
                data.getDate(),
                data.getMinTemperature(),
                data.getMaxTemperature(),
                data.getRainfall(),
                data.getSnow(),
                data.getWindSpeed(),
                data.isStormAlert() ? "WARNING: Storm Alert!" : "No storm",
                data.isIceRainAlert() ? "WARNING: Ice Rain Alert!" : "No ice rain"
        );
    }
}