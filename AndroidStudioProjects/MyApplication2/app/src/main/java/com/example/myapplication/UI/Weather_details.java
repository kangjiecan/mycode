package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent; // For navigation
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.myapplication.R;

public class Weather_details extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather_details);

        // Find the return button by ID
        Button returnButton = findViewById(R.id.returnButton);

        // Set click listener for the return button
        returnButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate back to MainActivity
                Intent intent = new Intent(Weather_details.this, MainActivity.class);
                startActivity(intent);
                finish(); // Close the current activity
            }
        });
    }
}