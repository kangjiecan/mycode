package com.example.myapplication.UI;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.R;
import com.example.myapplication.database.DatabaseClient;
import com.example.myapplication.model.Even;

public class Trail_days extends AppCompatActivity {

    private static final String TAG = "Trail_days";

    // Declare UI elements
    private EditText eventNameInput, dateInput, latitudeInput, longitudeInput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_trail_days);

        // Find buttons by ID
        Button button1 = findViewById(R.id.button1);
        Button button2 = findViewById(R.id.button2);
        Button button3 = findViewById(R.id.button3);
        Button button4 = findViewById(R.id.button4);

        // Find input fields by ID
        eventNameInput = findViewById(R.id.eventNameInput);
        dateInput = findViewById(R.id.dateInput);
        latitudeInput = findViewById(R.id.latitudeInput);
        longitudeInput = findViewById(R.id.longitudeInput);
        Button confirmButton = findViewById(R.id.confirmButton);

        // Set click listeners for other buttons
        button3.setOnClickListener(v -> {
            Intent intent = new Intent(Trail_days.this, MainActivity.class);
            startActivity(intent);
        });

        button2.setOnClickListener(v ->
                Toast.makeText(Trail_days.this, "Button 2 clicked!", Toast.LENGTH_SHORT).show());

        button1.setOnClickListener(v -> {
            Intent intent = new Intent(Trail_days.this, SettingActivity.class);
            startActivity(intent);
        });

        button4.setOnClickListener(v ->
                Toast.makeText(Trail_days.this, "Button 4 clicked!", Toast.LENGTH_SHORT).show());

        // Set listener for Confirm Button
        confirmButton.setOnClickListener(v -> captureAndInsertData());
    }

    // Method to capture user input and insert into the database
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

            // Create a new Even object
            Even even = new Even(eventName, date, latitude, longitude);

            // Insert into the database using the new convenience method
            new Thread(() -> {
                DatabaseClient.getInstance(getApplicationContext())
                        .getAppDatabase()
                        .trailDayEvenDAO()
                        .insertEven(even);

                Log.d(TAG, "Inserted into database: " + even.toString());

                runOnUiThread(() -> {
                    Toast.makeText(this, "Data inserted successfully!", Toast.LENGTH_SHORT).show();
                    // Clear input fields after successful insertion
                    clearInputFields();
                });
            }).start();

        } catch (NumberFormatException e) {
            Toast.makeText(this, "Invalid latitude or longitude", Toast.LENGTH_SHORT).show();
            Log.e(TAG, "Error parsing latitude/longitude", e);
        }
    }

    // Helper method to clear input fields
    private void clearInputFields() {
        eventNameInput.setText("");
        dateInput.setText("");
        latitudeInput.setText("");
        longitudeInput.setText("");
    }
}