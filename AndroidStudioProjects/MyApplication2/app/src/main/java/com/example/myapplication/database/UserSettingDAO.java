package com.example.myapplication.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;
import androidx.room.Delete;

import java.util.List;

@Dao
public interface UserSettingDAO {
    @Insert
    void insert(UserSettingEntity userSetting);

    @Update
    void update(UserSettingEntity userSetting);

    @Delete
    void delete(UserSettingEntity userSetting);

    @Query("SELECT * FROM user_settings WHERE id = :id")
    UserSettingEntity getById(int id);

    @Query("SELECT * FROM user_settings")
    List<UserSettingEntity> getAll();

    @Query("SELECT * FROM user_settings ORDER BY date DESC LIMIT 1")
    UserSettingEntity getLatestSetting();
}