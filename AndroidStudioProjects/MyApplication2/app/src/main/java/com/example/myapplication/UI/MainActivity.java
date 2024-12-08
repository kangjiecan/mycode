package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.database.DatabaseClient;
import com.example.myapplication.database.AppDatabase;
import com.example.myapplication.model.Event;
import com.example.myapplication.service.WeatherCheck;
import com.example.myapplication.service.WeatherCheckWorker;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private AppDatabase db;
    private ExecutorService executorService;
    private TextView alertSchedulesTextView;
    private WeatherCheck weatherCheck;
    private BroadcastReceiver weatherCheckReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize database and executor
        executorService = Executors.newSingleThreadExecutor();
        db = DatabaseClient.getInstance(this).getAppDatabase();

        // Initialize WeatherCheck
        weatherCheck = new WeatherCheck(
                db.trailDayEventDAO(),
                db.userSettingDAO()
        );

        // Initialize TextView
        alertSchedulesTextView = findViewById(R.id.alertSchedulesTextView);

        // Setup periodic weather check
        setupPeriodicWeatherCheck();

        // Register broadcast receiver for weather check completion
        setupWeatherCheckReceiver();

        // Load and display events
        loadEvents();

        // Find buttons by ID
        Button button1 = findViewById(R.id.button1);
        Button button2 = findViewById(R.id.button2);
        Button button3 = findViewById(R.id.button3);
        Button button4 = findViewById(R.id.button4);

        button1.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, SettingActivity.class);
            startActivity(intent);
        });

        button2.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, Trail_days.class);
            startActivity(intent);
        });

        button3.setOnClickListener(v -> {
            Toast.makeText(MainActivity.this, "Checking weather conditions...", Toast.LENGTH_SHORT).show();
            checkWeather();
        });

        button4.setOnClickListener(v ->
                Toast.makeText(MainActivity.this, "Button 4 clicked!", Toast.LENGTH_SHORT).show());
    }

    private void setupPeriodicWeatherCheck() {
        PeriodicWorkRequest weatherCheckRequest =
                new PeriodicWorkRequest.Builder(WeatherCheckWorker.class,
                        12, TimeUnit.HOURS)
                        .build();

        WorkManager.getInstance(this)
                .enqueueUniquePeriodicWork(
                        "weatherCheck",
                        ExistingPeriodicWorkPolicy.KEEP,
                        weatherCheckRequest
                );
    }

    private void setupWeatherCheckReceiver() {
        weatherCheckReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if ("WEATHER_CHECK_COMPLETE".equals(intent.getAction())) {
                    loadEvents();
                    runOnUiThread(() ->
                            Toast.makeText(MainActivity.this,
                                    "Weather check completed!", Toast.LENGTH_SHORT).show());
                }
            }
        };
        registerReceiver(weatherCheckReceiver,
                new IntentFilter("WEATHER_CHECK_COMPLETE"),
                Context.RECEIVER_NOT_EXPORTED);    }

    private void checkWeather() {
        executorService.execute(() -> {
            try {
                weatherCheck.checkWeatherForLastEvent();
                runOnUiThread(() -> {
                    loadEvents();
                    Toast.makeText(MainActivity.this,
                            "Weather check completed!", Toast.LENGTH_SHORT).show();
                });
            } catch (Exception e) {
                Log.e(TAG, "Error checking weather: " + e.getMessage());
                runOnUiThread(() ->
                        Toast.makeText(MainActivity.this,
                                "Error checking weather", Toast.LENGTH_SHORT).show()
                );
            }
        });
    }

    private void loadEvents() {
        executorService.execute(() -> {
            try {
                List<Event> events = db.trailDayEventDAO().getAllEvents();

                // Build the display text using HTML formatting
                StringBuilder displayText = new StringBuilder();
                for (int i = 0; i < events.size(); i++) {
                    Event event = events.get(i);
                    String eventText = String.format(
                            "Date: %s, Event: %s\nLocation: (%s, %s)",
                            event.getDate(),
                            event.getEvent(),
                            event.getLatitude(),
                            event.getLongitude()
                    );

                    // Wrap text in red color HTML tags if the event is alerted
                    if (event.isAlerted()) {
                        displayText.append("<font color='#FF0000'>").append(eventText).append("</font>");
                    } else {
                        displayText.append(eventText);
                    }

                    // Add separator line between events (but not after the last event)
                    if (i < events.size() - 1) {
                        displayText.append("<br>──────────────────<br>");
                    }
                }

                // Update UI on main thread
                runOnUiThread(() -> {
                    if (displayText.length() > 0) {
                        alertSchedulesTextView.setText(
                                android.text.Html.fromHtml(displayText.toString(),
                                        android.text.Html.FROM_HTML_MODE_COMPACT)
                        );
                    } else {
                        alertSchedulesTextView.setText("No events scheduled");
                    }
                });

            } catch (Exception e) {
                Log.e(TAG, "Failed to load events: " + e.getMessage());
                runOnUiThread(() -> {
                    alertSchedulesTextView.setText("Error loading events");
                    Toast.makeText(MainActivity.this, "Failed to load events", Toast.LENGTH_SHORT).show();
                });
            }
        });
    }

    private void debugDatabaseStatus() {
        executorService.execute(() -> {
            try {
                List<Event> events = db.trailDayEventDAO().getAllEvents();
                Log.d(TAG, "Current database status:");
                Log.d(TAG, "Total events: " + events.size());
                Log.d(TAG, "Database path: " + getDatabasePath("app_database").getAbsolutePath());
            } catch (Exception e) {
                Log.e(TAG, "Failed to check database status: " + e.getMessage());
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadEvents();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (weatherCheckReceiver != null) {
            unregisterReceiver(weatherCheckReceiver);
        }
        executorService.shutdown();
    }

    public void openWeatherDetails(View view) {
        // Since the TextView is clickable, find which event was clicked
        CharSequence text = alertSchedulesTextView.getText();
        String eventText = text.toString();

        Intent intent = new Intent(this, Weather_details.class);
        // Get the currently clicked event
        executorService.execute(() -> {
            try {
                List<Event> events = db.trailDayEventDAO().getAllEvents();
                if (!events.isEmpty()) {
                    Event lastEvent = events.get(events.size() - 1); // Get last event for now
                    intent.putExtra("latitude", lastEvent.getLatitude());
                    intent.putExtra("longitude", lastEvent.getLongitude());
                    intent.putExtra("date", lastEvent.getDate());

                    // Switch to main thread to start activity
                    runOnUiThread(() -> startActivity(intent));
                }
            } catch (Exception e) {
                Log.e(TAG, "Error getting event details: " + e.getMessage());
                runOnUiThread(() -> Toast.makeText(MainActivity.this,
                        "Error opening weather details", Toast.LENGTH_SHORT).show());
            }
        });
    }
}