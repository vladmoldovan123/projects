package ro.tuc.ds2020.dtos;

import ro.tuc.ds2020.entities.SensorEntity;
import ro.tuc.ds2020.entities.UserEntity;

import java.util.UUID;

public class DeviceDTO {
    private UUID id;
    private String description;
    private String address;
    private double maximumEnergyConsumption;
    private double averageEnergyConsumption;
    private UserEntity userEntity;
    private SensorEntity sensor;

    public DeviceDTO(){

    }

    public DeviceDTO(UUID id, String description, String address, double maximumEnergyConsumption, double averageEnergyConsumption, UserEntity userEntity, SensorEntity sensor) {
        this.id = id;
        this.description = description;
        this.address = address;
        this.maximumEnergyConsumption = maximumEnergyConsumption;
        this.averageEnergyConsumption = averageEnergyConsumption;
        this.userEntity = userEntity;
        this.sensor = sensor;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getMaximumEnergyConsumption() {
        return maximumEnergyConsumption;
    }

    public void setMaximumEnergyConsumption(double maximumEnergyConsumption) {
        this.maximumEnergyConsumption = maximumEnergyConsumption;
    }

    public double getAverageEnergyConsumption() {
        return averageEnergyConsumption;
    }

    public void setAverageEnergyConsumption(double averageEnergyConsumption) {
        this.averageEnergyConsumption = averageEnergyConsumption;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public SensorEntity getSensor() {
        return sensor;
    }

    public void setSensor(SensorEntity sensor) {
        this.sensor = sensor;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
