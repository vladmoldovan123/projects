package ro.tuc.ds2020.entities;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
public class HistoryConsumptionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    @Column(name="value")
    private double value;

    @Column(name="timestamp")
    private long timestamp;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToOne
    @JoinColumn(name="sensor_id")
    private SensorEntity sensorEntity;

    public HistoryConsumptionEntity() {

    }

    public HistoryConsumptionEntity(UUID id, double value, long timestamp, SensorEntity sensorEntity) {
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
