package com.example.myapplication.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;
import com.example.myapplication.model.Event;

import java.util.List;
import java.util.stream.Collectors;

@Dao
public interface TrailDayEventDAO {
    // Original Entity-based methods
    @Insert
    void insertTrailDayEvent(TrailDayEventEntity trailDayEvent);



    @Delete
    void deleteTrailDayEvent(TrailDayEventEntity trailDayEvent);

    @Query("SELECT * FROM trail_day_even")
    List<TrailDayEventEntity> getAllTrailDayEvents();


    default void insertEvent(Event event) {
        insertTrailDayEvent(new TrailDayEventEntity(event));
    }



    default void deleteEvent(Event event, int id) {
        TrailDayEventEntity entity = new TrailDayEventEntity(event);
        entity.setId(id);
        deleteTrailDayEvent(entity);
    }

    default List<Event> getAllEvents() {
        return getAllTrailDayEvents().stream()
                .map(TrailDayEventEntity::toEvent)
                .collect(Collectors.toList());
    }


}