package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
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

// In Weather_details.java
public class Weather_details extends AppCompatActivity {
    private static final String TAG = "Weather_details";
    private OpenWeatherApi weatherApi;
    private WeatherCheck weatherCheck;
    private TextView weatherDetailsTextView;
    private TextView debugTextView;
    private CompositeDisposable disposables = new CompositeDisposable();

    private double latitude;
    private double longitude;
    private String date;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather_details);

        // Get the passed data
        Intent intent = getIntent();
        latitude = intent.getDoubleExtra("latitude", 0);
        longitude = intent.getDoubleExtra("longitude", 0);
        date = intent.getStringExtra("date");

        weatherDetailsTextView = findViewById(R.id.weatherDetailsTextView);
        debugTextView = findViewById(R.id.debugTextView);

        weatherApi = new OpenWeatherApi();
        initializeWeatherCheck();
        setupButtons();
        fetchWeather();
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
        disposables.clear();
    }

    private void setupButtons() {
        Button returnButton = findViewById(R.id.returnButton);
        Button refreshButton = findViewById(R.id.refreshButton);

        returnButton.setOnClickListener(v -> finish());

        refreshButton.setOnClickListener(v -> {
            performWeatherCheck();
            fetchWeather();
        });
    }

    private void performWeatherCheck() {

        disposables.add(
                Single.fromCallable(() -> {
                            weatherCheck.checkWeatherForLastEvent();
                            return true;
                        })
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                success -> Toast.makeText(this, "Weather check completed", Toast.LENGTH_SHORT).show(),
                                error -> Toast.makeText(this, "Error checking weather", Toast.LENGTH_SHORT).show()
                        )
        );
    }

    private void fetchWeather() {
        weatherDetailsTextView.setText("Loading weather data...");

        disposables.add(
                weatherApi.fetchWeatherData(latitude, longitude, date)
                        .subscribe(
                                weatherData -> {
                                    weatherDetailsTextView.setText(formatWeatherData(weatherData));
                                    Toast.makeText(this, "Weather data updated", Toast.LENGTH_SHORT).show();
                                },
                                error -> {
                                    weatherDetailsTextView.setText("Unable to load weather data");
                                    Toast.makeText(this, "Error fetching weather", Toast.LENGTH_SHORT).show();
                                }
                        )
        );
    }

    private void debugLog(String message) {
        runOnUiThread(() -> {
            if (debugTextView != null) {
                String timestamp = new java.text.SimpleDateFormat("HH:mm:ss").format(new java.util.Date());
                String newText = timestamp + " PM: " + message + "\n" + debugTextView.getText().toString();
                debugTextView.setText(newText);
            }
        });
    }

    private String formatWeatherData(WeatherData data) {
        return String.format(
                "Weather Report\n" +
                        "Location: (%.4f, %.4f)\n" +
                        "Date: %s\n" +
                        "------------------------\n" +
                        "Temperature Range: %.1f°C to %.1f°C\n" +
                        "Rainfall: %.1f mm\n" +
                        "Snow: %.1f mm\n" +
                        "Wind Speed: %.1f km/h\n" +
                        "Storm Status: %s\n" +
                        "Ice Rain Status: %s",
                latitude, longitude,
                data.getDate(),
                data.getMinTemperature(),
                data.getMaxTemperature(),
                data.getRainfall(),
                data.getSnow(),
                data.getWindSpeed(),
                data.isStormAlert() ? "Storm warning" : "No storm",
                data.isIceRainAlert() ? "Ice rain warning" : "No ice rain"
        );
    }
}