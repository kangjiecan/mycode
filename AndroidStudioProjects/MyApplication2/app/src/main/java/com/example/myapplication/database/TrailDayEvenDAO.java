package com.example.myapplication.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;
import com.example.myapplication.model.Even;

import java.util.List;
import java.util.stream.Collectors;

@Dao
public interface TrailDayEvenDAO {
    // Original Entity-based methods
    @Insert
    void insertTrailDayEven(TrailDayEvenEntity trailDayEven);

    @Insert
    void insertTrailDayEvens(List<TrailDayEvenEntity> trailDayEvents);

    @Update
    void updateTrailDayEven(TrailDayEvenEntity trailDayEven);

    @Delete
    void deleteTrailDayEven(TrailDayEvenEntity trailDayEven);

    @Query("SELECT * FROM trail_day_even")
    List<TrailDayEvenEntity> getAllTrailDayEvents();

    @Query("SELECT * FROM trail_day_even WHERE date = :date")
    List<TrailDayEvenEntity> getTrailDayEventsByDate(String date);

    @Query("SELECT * FROM trail_day_even WHERE id = :id LIMIT 1")
    TrailDayEvenEntity getTrailDayEventById(int id);

    @Query("DELETE FROM trail_day_even")
    void deleteAllTrailDayEvents();

    // New convenience methods for Even model
    default void insertEven(Even even) {
        insertTrailDayEven(new TrailDayEvenEntity(even));
    }

    default void insertEvens(List<Even> events) {
        List<TrailDayEvenEntity> entities = events.stream()
                .map(TrailDayEvenEntity::new)
                .collect(Collectors.toList());
        insertTrailDayEvens(entities);
    }

    default void updateEven(Even even, int id) {
        TrailDayEvenEntity entity = new TrailDayEvenEntity(even);
        entity.setId(id);
        updateTrailDayEven(entity);
    }

    default void deleteEven(Even even, int id) {
        TrailDayEvenEntity entity = new TrailDayEvenEntity(even);
        entity.setId(id);
        deleteTrailDayEven(entity);
    }

    default List<Even> getAllEvens() {
        return getAllTrailDayEvents().stream()
                .map(TrailDayEvenEntity::toEven)
                .collect(Collectors.toList());
    }

    default List<Even> getEvensByDate(String date) {
        return getTrailDayEventsByDate(date).stream()
                .map(TrailDayEvenEntity::toEven)
                .collect(Collectors.toList());
    }

    default Even getEvenById(int id) {
        TrailDayEvenEntity entity = getTrailDayEventById(id);
        return entity != null ? entity.toEven() : null;
    }
}