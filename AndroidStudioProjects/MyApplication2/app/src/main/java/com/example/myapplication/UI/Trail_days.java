package com.example.myapplication.UI;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.content.ContextCompat;

import com.example.myapplication.R;
import com.example.myapplication.database.DatabaseClient;
import com.example.myapplication.model.Event;
import com.example.myapplication.database.TrailDayEventDAO;

import java.util.List;

public class Trail_days extends AppCompatActivity {

    private static final String TAG = "Trail_days";

    private EditText eventNameInput, dateInput, latitudeInput, longitudeInput;
    private TextView schedulePlaceholder;
    private LinearLayout eventsContainer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_trail_days);

        initializeViews();
        setupClickListeners();
        loadEvents();
    }

    private void initializeViews() {
        eventNameInput = findViewById(R.id.eventNameInput);
        dateInput = findViewById(R.id.dateInput);
        latitudeInput = findViewById(R.id.latitudeInput);
        longitudeInput = findViewById(R.id.longitudeInput);

        schedulePlaceholder = findViewById(R.id.schedulePlaceholder);
        eventsContainer = findViewById(R.id.eventsContainer);
    }

    private void setupClickListeners() {
        findViewById(R.id.button3).setOnClickListener(v -> {
            Intent intent = new Intent(Trail_days.this, MainActivity.class);
            startActivity(intent);
        });

        findViewById(R.id.button2).setOnClickListener(v ->
                Toast.makeText(Trail_days.this, "Button 2 clicked!", Toast.LENGTH_SHORT).show());

        findViewById(R.id.button1).setOnClickListener(v -> {
            Intent intent = new Intent(Trail_days.this, SettingActivity.class);
            startActivity(intent);
        });

        findViewById(R.id.button4).setOnClickListener(v ->
                Toast.makeText(Trail_days.this, "Button 4 clicked!", Toast.LENGTH_SHORT).show());

        findViewById(R.id.confirmButton).setOnClickListener(v -> captureAndInsertData());
    }

    private void loadEvents() {
        new Thread(() -> {
            List<Event> events = DatabaseClient.getInstance(getApplicationContext())
                    .getAppDatabase()
                    .trailDayEventDAO()
                    .getAllEvents();

            runOnUiThread(() -> displayEvents(events));
        }).start();
    }

    private void displayEvents(List<Event> events) {
        if (events.isEmpty()) {
            schedulePlaceholder.setVisibility(View.VISIBLE);
            eventsContainer.removeAllViews();
            eventsContainer.addView(schedulePlaceholder);
            return;
        }

        schedulePlaceholder.setVisibility(View.GONE);
        eventsContainer.removeAllViews();

        for (Event event : events) {
            CardView cardView = new CardView(this);
            LinearLayout.LayoutParams cardParams = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            cardParams.setMargins(0, 0, 0, 16);
            cardView.setLayoutParams(cardParams);
            cardView.setCardElevation(4f);
            cardView.setRadius(8f);
            cardView.setContentPadding(16, 16, 16, 16);

            LinearLayout containerLayout = new LinearLayout(this);
            containerLayout.setLayoutParams(new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT));
            containerLayout.setOrientation(LinearLayout.HORIZONTAL);

            TextView eventView = new TextView(this);
            LinearLayout.LayoutParams textParams = new LinearLayout.LayoutParams(
                    0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f);
            eventView.setLayoutParams(textParams);
            eventView.setTextColor(getResources().getColor(android.R.color.black));

            String eventText = String.format("Event: %s\nDate: %s\nLocation: %.4f, %.4f",
                    event.getEvent(),
                    event.getDate(),
                    event.getLatitude(),
                    event.getLongitude());

            eventView.setText(eventText);

            ImageButton deleteButton = new ImageButton(this);
// Define specific dimensions in dp
            int sizeInDp = 18; // You can adjust this value to make it smaller/larger
            float scale = getResources().getDisplayMetrics().density;
            int sizeInPixels = (int) (sizeInDp * scale + 0.5f);

// Set specific dimensions instead of WRAP_CONTENT
            LinearLayout.LayoutParams buttonParams = new LinearLayout.LayoutParams(
                    sizeInPixels,
                    sizeInPixels);
            buttonParams.gravity = Gravity.CENTER_VERTICAL;
            deleteButton.setLayoutParams(buttonParams);

// Set padding to adjust the icon within the button
            deleteButton.setPadding(4, 4, 4, 4);  // Adjust padding as needed
            deleteButton.setImageDrawable(ContextCompat.getDrawable(this, android.R.drawable.ic_menu_delete));
            deleteButton.setBackgroundResource(android.R.color.transparent);

            deleteButton.setOnClickListener(v -> deleteEvent(event));

            containerLayout.addView(eventView);
            containerLayout.addView(deleteButton);
            cardView.addView(containerLayout);
            eventsContainer.addView(cardView);
        }
    }

    private void deleteEvent(Event event) {
        // Create confirmation dialog
        new AlertDialog.Builder(this)
                .setTitle("Delete Event")
                .setMessage("Are you sure you want to delete this event?")
                .setPositiveButton("Delete", (dialog, which) -> {
                    // Perform deletion in background thread
                    new Thread(() -> {
                        try {
                            // Get database instance and delete event using DAO
                            DatabaseClient.getInstance(getApplicationContext())
                                    .getAppDatabase()
                                    .trailDayEventDAO()
                                    .deleteEvent(event, event.getId());

                            // Show success message and refresh event list on UI thread
                            runOnUiThread(() -> {
                                Toast.makeText(Trail_days.this,
                                        "Event deleted successfully",
                                        Toast.LENGTH_SHORT).show();
                                // Reload events to refresh the list
                                loadEvents();
                            });
                        } catch (Exception e) {
                            // Handle any errors that occur during deletion
                            runOnUiThread(() -> {
                                Toast.makeText(Trail_days.this,
                                        "Error deleting event: " + e.getMessage(),
                                        Toast.LENGTH_LONG).show();
                            });
                        }
                    }).start();
                })
                // Add Cancel button that does nothing when clicked
                .setNegativeButton("Cancel", null)
                .show();  // Show the dialog
    }

    private void captureAndInsertData() {
        String eventName = eventNameInput.getText().toString().trim();
        String date = dateInput.getText().toString().trim();
        String latitudeStr = latitudeInput.getText().toString().trim();
        String longitudeStr = longitudeInput.getText().toString().trim();

        if (eventName.isEmpty() || date.isEmpty() || latitudeStr.isEmpty() || longitudeStr.isEmpty()) {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            double latitude = Double.parseDouble(latitudeStr);
            double longitude = Double.parseDouble(longitudeStr);

            Event event = new Event(eventName, date, latitude, longitude);

            new Thread(() -> {
                DatabaseClient.getInstance(getApplicationContext())
                        .getAppDatabase()
                        .trailDayEventDAO()
                        .insertEvent(event);

                Log.d(TAG, "Inserted into database: " + event.toString());

                runOnUiThread(() -> {
                    Toast.makeText(this, "Data inserted successfully!", Toast.LENGTH_SHORT).show();
                    clearInputFields();
                    loadEvents();
                });
            }).start();

        } catch (NumberFormatException e) {
            Toast.makeText(this, "Invalid latitude or longitude", Toast.LENGTH_SHORT).show();
            Log.e(TAG, "Error parsing latitude/longitude", e);
        }
    }

    private void clearInputFields() {
        eventNameInput.setText("");
        dateInput.setText("");
        latitudeInput.setText("");
        longitudeInput.setText("");
    }
}