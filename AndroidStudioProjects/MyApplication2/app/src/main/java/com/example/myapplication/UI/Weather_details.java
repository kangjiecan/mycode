package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.model.WeatherData;
import com.example.myapplication.openWeatherApi.OpenWeatherApi;
import com.example.myapplication.service.WeatherCheck;
import com.example.myapplication.database.DatabaseClient;
import com.example.myapplication.database.TrailDayEventDAO;
import com.example.myapplication.database.UserSettingDAO;
import io.reactivex.rxjava3.disposables.CompositeDisposable;
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;

public class Weather_details extends AppCompatActivity {
    private static final String TAG = "Weather_details";
    private static final double HALIFAX_LATITUDE = 44.6488;
    private static final double HALIFAX_LONGITUDE = -63.5752;

    private OpenWeatherApi weatherApi;
    private WeatherCheck weatherCheck;
    private TextView weatherDetailsTextView;
    private TextView debugTextView;
    private CompositeDisposable disposables = new CompositeDisposable();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather_details);

        // Initialize views
        weatherDetailsTextView = findViewById(R.id.weatherDetailsTextView);
        debugTextView = findViewById(R.id.debugTextView);

        // Initialize APIs and services
        weatherApi = new OpenWeatherApi();
        initializeWeatherCheck();
        debugLog("OpenWeatherApi and WeatherCheck initialized");

        // Setup buttons
        setupButtons();

        // Initial weather fetch
        fetchHalifaxWeather();
    }

    private void initializeWeatherCheck() {
        TrailDayEventDAO eventDao = DatabaseClient.getInstance(getApplicationContext())
                .getAppDatabase()
                .trailDayEventDAO();
        UserSettingDAO settingDao = DatabaseClient.getInstance(getApplicationContext())
                .getAppDatabase()
                .userSettingDAO();
        weatherCheck = new WeatherCheck(eventDao, settingDao);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposables.clear(); // Clear all disposables to prevent memory leaks
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
            performWeatherCheck();
            fetchHalifaxWeather();
        });
    }

    private void performWeatherCheck() {
        debugLog("Starting weather check for last event...");

        disposables.add(
                Single.fromCallable(() -> {
                            weatherCheck.checkWeatherForLastEvent();
                            return true;
                        })
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                success -> {
                                    debugLog("Weather check completed successfully");
                                    Toast.makeText(this, "Weather check completed", Toast.LENGTH_SHORT).show();
                                },
                                error -> {
                                    debugLog("Error in weather check: " + error.getMessage());
                                    Log.e(TAG, "Weather check error", error);
                                    Toast.makeText(this, "Error checking weather for events", Toast.LENGTH_SHORT).show();
                                }
                        )
        );
    }

    private void fetchHalifaxWeather() {
        debugLog("Starting weather fetch for Halifax...");
        debugLog(String.format("Coordinates: %.4f, %.4f", HALIFAX_LATITUDE, HALIFAX_LONGITUDE));

        // Show loading state
        weatherDetailsTextView.setText("Loading weather data...");

        disposables.add(
                weatherApi.fetchWeatherData(HALIFAX_LATITUDE, HALIFAX_LONGITUDE, "2024-12-09")
                        .subscribe(
                                weatherData -> {
                                    logWeatherData(weatherData);
                                    String weatherInfo = formatWeatherData(weatherData);
                                    weatherDetailsTextView.setText(weatherInfo);
                                    Toast.makeText(Weather_details.this,
                                            "Weather data updated", Toast.LENGTH_SHORT).show();
                                },
                                error -> handleError(error)
                        )
        );
    }

    private void logWeatherData(WeatherData weatherData) {
        debugLog("Raw Weather Data received:");
        debugLog(String.format("Temperature: %.1f°C to %.1f°C",
                weatherData.getMinTemperature(),
                weatherData.getMaxTemperature()));
        debugLog(String.format("Rainfall: %.1f mm", weatherData.getRainfall()));
        debugLog(String.format("Snow: %.1f mm", weatherData.getSnow()));
        debugLog(String.format("Wind Speed: %.1f km/h", weatherData.getWindSpeed()));
        debugLog("Date: " + weatherData.getDate());
        debugLog("Storm Alert: " + (weatherData.isStormAlert() ? "Storm detected" : "No storm"));
        debugLog("Ice Rain Alert: " + (weatherData.isIceRainAlert() ? "Ice rain detected" : "No ice rain"));
    }

    private void handleError(Throwable error) {
        String errorMsg = "Error fetching weather: " + error.getMessage();
        weatherDetailsTextView.setText("Unable to load weather data");
        debugLog("Weather fetch ERROR:\n" + errorMsg);
        debugLog("Error class: " + error.getClass().getName());
        debugLog("Stack trace: " + Log.getStackTraceString(error));

        Toast.makeText(Weather_details.this,
                errorMsg, Toast.LENGTH_LONG).show();

        Log.e(TAG, "Detailed error: ", error);
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
                        "Snow: %.1f mm\n" +
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