package com.example.myapplication;


import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class SettingActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.threshold_setting); // Reference your layout file

        // Handle button clicks
        Button exitButton = findViewById(R.id.button3); // Exit button
        exitButton.setOnClickListener(v -> finish()); // Close the activity
    }
}