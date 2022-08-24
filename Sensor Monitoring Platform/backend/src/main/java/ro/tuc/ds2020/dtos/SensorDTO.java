package ro.tuc.ds2020.dtos;

import ro.tuc.ds2020.entities.DeviceEntity;
import ro.tuc.ds2020.entities.HistoryConsumptionEntity;
import ro.tuc.ds2020.entities.SensorEntity;

import java.util.List;
import java.util.UUID;

public class SensorDTO {

    private UUID id;
    private String description;
    private double maximumValue;
    private DeviceEntity device;
    private List<HistoryConsumptionEntity>  values;

    public SensorDTO(){

    }

    public SensorDTO(UUID id, String description, double maximumValue, DeviceEntity device,List<HistoryConsumptionEntity>  values ) {
        this.id = id;
        this.description = description;
        this.maximumValue = maximumValue;
        this.device = device;
        this.values = values;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getMaximumValue() {
        return maximumValue;
    }

    public void setMaximumValue(double maximumValue) {
        this.maximumValue = maximumValue;
    }

    public DeviceEntity getDevice() {
        return device;
    }

    public void setDevice(DeviceEntity device) {
        this.device = device;
    }

    public List<HistoryConsumptionEntity> getValues() {
        return values;
    }

    public void setValues(List<HistoryConsumptionEntity> values) {
        this.values = values;
    }
}
