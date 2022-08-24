package ro.tuc.ds2020.dtos;

import ro.tuc.ds2020.entities.SensorEntity;

import java.util.UUID;

public class HistoryConsumptionDTO {

    private UUID id;
    private double value;
    private long timestamp;
    private SensorEntity sensorEntity;


    public HistoryConsumptionDTO() {
    }

    public HistoryConsumptionDTO(UUID id, double value, long timestamp, SensorEntity sensorEntity) {
        this.id = id;
        this.value = value;
        this.timestamp = timestamp;
        this.sensorEntity = sensorEntity;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public SensorEntity getSensorEntity() {
        return sensorEntity;
    }

    public void setSensorEntity(SensorEntity sensorEntity) {
        this.sensorEntity = sensorEntity;
    }
}
