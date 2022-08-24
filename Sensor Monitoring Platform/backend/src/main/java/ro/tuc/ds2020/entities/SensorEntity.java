package ro.tuc.ds2020.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
public class SensorEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    @Column(name="description")
    private String description;

    @Column(name="maximum_value")
    private double maximumValue;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToOne
    @JoinColumn(name="device_id")
    @JsonIgnore
    private DeviceEntity device;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "sensorEntity",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<HistoryConsumptionEntity> sensorValues;


    public SensorEntity(UUID id, String description, double maximumValue, DeviceEntity device, List<HistoryConsumptionEntity> sensorValues ) {
        this.id = id;
        this.description = description;
        this.maximumValue = maximumValue;
        this.device = device;
        this.sensorValues = sensorValues;
    }

    public SensorEntity() {

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

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public List<HistoryConsumptionEntity> getSensorValues() {
        return sensorValues;
    }

    public void setSensorValues(List<HistoryConsumptionEntity> sensorValues) {
        this.sensorValues = sensorValues;
    }
}
