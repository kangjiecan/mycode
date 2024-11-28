package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent; // For navigation
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class Trail_days extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_trail_days);

        // Find buttons by ID
        Button button1 = findViewById(R.id.button1);
        Button button2 = findViewById(R.id.button2);
        Button button3 = findViewById(R.id.button3);
        Button button4 = findViewById(R.id.button4);

        // Set click listeners
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Trail_days.this, MainActivity.class);
                startActivity(intent);
            }
        });

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(Trail_days.this, "Button 2 clicked!", Toast.LENGTH_SHORT).show();
            }
        });

        // Use button 3 to navigate to SettingActivity
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Trail_days.this, SettingActivity.class);
                startActivity(intent);
            }
        });

        button4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(Trail_days.this, "Button 4 clicked!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}