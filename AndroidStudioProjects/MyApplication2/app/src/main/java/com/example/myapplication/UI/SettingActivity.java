package com.example.myapplication.UI;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.R;
import com.example.myapplication.database.DatabaseClient;
import com.example.myapplication.database.UserSettingEntity;
import com.example.myapplication.model.UserSetting;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class SettingActivity extends AppCompatActivity {
    private ProgressBar progressBar;
    private EditText rainfallInput;
    private EditText windSpeedInput;
    private EditText stormInput;
    private EditText iceRainInput;
    private EditText snowInput;
    private EditText minTempInput;
    private EditText maxTempInput;
    private Button confirmButton;
    private Button button1, button2, button3, button4;

    private UserSettingEntity currentSettings;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.user_setting);

        initializeViews();
        setupClickListeners();
        loadExistingSettings();
    }

    private void initializeViews() {
        progressBar = findViewById(R.id.progressBar);
        rainfallInput = findViewById(R.id.rainfallInput);
        windSpeedInput = findViewById(R.id.windSpeedInput);
        stormInput = findViewById(R.id.stormInput);
        iceRainInput = findViewById(R.id.iceRainInput);
        snowInput = findViewById(R.id.snowInput);
        minTempInput = findViewById(R.id.minTempInput);
        maxTempInput = findViewById(R.id.maxTempInput);

        confirmButton = findViewById(R.id.confirmButton);
        button1 = findViewById(R.id.button1);
        button2 = findViewById(R.id.button2);
        button3 = findViewById(R.id.button3);
        button4 = findViewById(R.id.button4);
    }

    private void setupClickListeners() {
        button3.setOnClickListener(v -> {
            Intent intent = new Intent(SettingActivity.this, MainActivity.class);
            startActivity(intent);
        });

        button2.setOnClickListener(v ->{
                Intent intent = new Intent(SettingActivity.this, Trail_days.class);
        startActivity(intent);}
        );

        button1.setOnClickListener(v -> {
            Intent intent = new Intent(SettingActivity.this, SettingActivity.class);
            startActivity(intent);
        });

        button4.setOnClickListener(v ->
                Toast.makeText(SettingActivity.this, "Button 4 clicked!", Toast.LENGTH_SHORT).show()
        );

        confirmButton.setOnClickListener(v -> captureAndInsertData());
    }

    private void loadExistingSettings() {
        progressBar.setVisibility(View.VISIBLE);

        new Thread(() -> {
            try {
                // Get the latest settings using a direct query
                UserSettingEntity settings = DatabaseClient.getInstance(getApplicationContext())
                        .getAppDatabase()
                        .userSettingDAO()
                        .getLatestSetting(); // You'll need to add this method to your DAO

                if (settings != null) {
                    currentSettings = settings;
                    UserSetting userSetting = settings.toUserSetting();

                    runOnUiThread(() -> {
                        rainfallInput.setText(String.valueOf(userSetting.getRainfallThreshold()));
                        windSpeedInput.setText(String.valueOf(userSetting.getWindSpeedThreshold()));
                        stormInput.setText(userSetting.isStormAlert() ? "yes" : "no");
                        iceRainInput.setText(userSetting.isIceRainAlert() ? "yes" : "no");
                        snowInput.setText(String.valueOf(userSetting.getSnowThreshold()));
                        minTempInput.setText(String.valueOf(userSetting.getMinTemperature()));
                        maxTempInput.setText(String.valueOf(userSetting.getMaxTemperature()));
                        progressBar.setVisibility(View.GONE);
                    });
                } else {
                    runOnUiThread(() -> {
                        Toast.makeText(SettingActivity.this,
                                "No existing settings found",
                                Toast.LENGTH_SHORT).show();
                        progressBar.setVisibility(View.GONE);
                    });
                }
            } catch (Exception e) {
                runOnUiThread(() -> {
                    Toast.makeText(SettingActivity.this,
                            "Error loading settings: " + e.getMessage(),
                            Toast.LENGTH_LONG).show();
                    progressBar.setVisibility(View.GONE);
                });
            }
        }).start();
    }

    private void captureAndInsertData() {
        if (!validateInputs()) {
            return;
        }

        progressBar.setVisibility(View.VISIBLE);

        try {
            // Create UserSetting object first for validation
            UserSetting userSetting = new UserSetting(
                    Double.parseDouble(rainfallInput.getText().toString()),
                    Double.parseDouble(windSpeedInput.getText().toString()),
                    stormInput.getText().toString().toLowerCase().equals("yes"),
                    iceRainInput.getText().toString().toLowerCase().equals("yes"),
                    Double.parseDouble(snowInput.getText().toString()),
                    Double.parseDouble(minTempInput.getText().toString()),
                    Double.parseDouble(maxTempInput.getText().toString())
            );

            // Create UserSettingEntity from UserSetting
            UserSettingEntity settingEntity = new UserSettingEntity(userSetting);

            // Set current timestamp and other necessary fields
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
            settingEntity.setDate(sdf.format(new Date()));
            settingEntity.setAlertEnabled(true);

            // Copy location data if exists
            if (currentSettings != null) {
                settingEntity.setEvent(currentSettings.getEvent());
                settingEntity.setLatitude(currentSettings.getLatitude());
                settingEntity.setLongitude(currentSettings.getLongitude());
            }

            // Execute database operation in background
            new Thread(() -> {
                try {
                    DatabaseClient.getInstance(getApplicationContext())
                            .getAppDatabase()
                            .userSettingDAO()
                            .insert(settingEntity);

                    runOnUiThread(() -> {
                        Toast.makeText(SettingActivity.this,
                                "Settings saved successfully!",
                                Toast.LENGTH_SHORT).show();
                        progressBar.setVisibility(View.GONE);
                        loadExistingSettings();
                    });
                } catch (Exception e) {
                    runOnUiThread(() -> {
                        Toast.makeText(SettingActivity.this,
                                "Error saving settings: " + e.getMessage(),
                                Toast.LENGTH_LONG).show();
                        progressBar.setVisibility(View.GONE);
                    });
                }
            }).start();
        } catch (IllegalArgumentException e) {
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
            progressBar.setVisibility(View.GONE);
        }
    }
    private boolean validateInputs() {
        String rainfall = rainfallInput.getText().toString();
        String windSpeed = windSpeedInput.getText().toString();
        String storm = stormInput.getText().toString();
        String iceRain = iceRainInput.getText().toString();
        String snow = snowInput.getText().toString();
        String minTemp = minTempInput.getText().toString();
        String maxTemp = maxTempInput.getText().toString();

        // Check for empty fields
        if (rainfall.isEmpty() || windSpeed.isEmpty() || storm.isEmpty() ||
                iceRain.isEmpty() || snow.isEmpty() || minTemp.isEmpty() || maxTemp.isEmpty()) {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            return false;
        }

        // Validate yes/no inputs
        String stormLower = storm.toLowerCase();
        String iceRainLower = iceRain.toLowerCase();
        if (!(stormLower.equals("yes") || stormLower.equals("no")) ||
                !(iceRainLower.equals("yes") || iceRainLower.equals("no"))) {
            Toast.makeText(this, "Please enter 'yes' or 'no' for storm and ice rain",
                    Toast.LENGTH_SHORT).show();
            return false;
        }

        // Validate numerical inputs
        try {
            Double.parseDouble(rainfall);
            Double.parseDouble(windSpeed);
            Double.parseDouble(snow);
            Double.parseDouble(minTemp);
            Double.parseDouble(maxTemp);
            return true;
        } catch (NumberFormatException e) {
            Toast.makeText(this, "Please enter valid numbers", Toast.LENGTH_SHORT).show();
            return false;
        }
    }
}