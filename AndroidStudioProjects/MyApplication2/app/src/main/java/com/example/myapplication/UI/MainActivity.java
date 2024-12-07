package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
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

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private AppDatabase db;
    private ExecutorService executorService;
    private TextView alertSchedulesTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize database and executor
        executorService = Executors.newSingleThreadExecutor();
        db = DatabaseClient.getInstance(this).getAppDatabase();

        // Initialize TextView
        alertSchedulesTextView = findViewById(R.id.alertSchedulesTextView);

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
            debugDatabaseStatus();
            loadEvents(); // Refresh events display
            Toast.makeText(MainActivity.this, "Events refreshed!", Toast.LENGTH_SHORT).show();
        });

        button4.setOnClickListener(v ->
                Toast.makeText(MainActivity.this, "Button 4 clicked!", Toast.LENGTH_SHORT).show());
    }

    private void loadEvents() {
        executorService.execute(() -> {
            try {
                // Use the new convenience method to get Even objects
                List<Event> events = db.trailDayEventDAO().getAllEvents();

                // Build the display text
                StringBuilder displayText = new StringBuilder();
                for (Event event : events) {
                    displayText.append("Date: ").append(event.getDate())
                            .append(", Event: ").append(event.getEvent())
                            .append("\nLocation: (").append(event.getLatitude())
                            .append(", ").append(event.getLongitude()).append(")\n\n");
                }

                // Update UI on main thread
                runOnUiThread(() -> {
                    if (displayText.length() > 0) {
                        alertSchedulesTextView.setText(displayText.toString());
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
        // Refresh events when returning to the activity
        loadEvents();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        executorService.shutdown();
    }

    public void openWeatherDetails(View view) {
        Intent intent = new Intent(this, Weather_details.class);
        startActivity(intent);
    }
}