package ro.tuc.ds2020.entities;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
public class DeviceEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    @Column(name="description")
    private String description;

    @Column(name="address")
    private String address;

    @Column(name="maximum_energy_consumption")
    private double maximumEnergyConsumption;

    @Column(name="average_energy_consumption")
    private double averageEnergyConsumption;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity userEntity;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToOne(mappedBy = "device",cascade = CascadeType.REMOVE)
    private SensorEntity sensor;

    public DeviceEntity(UUID id, String description, String address, double maximumEnergyConsumption, double averageEnergyConsumption, UserEntity userEntity, SensorEntity sensor) {
        this.id = id;
        this.description = description;
        this.address = address;
        this.maximumEnergyConsumption = maximumEnergyConsumption;
        this.averageEnergyConsumption = averageEnergyConsumption;
        this.userEntity = userEntity;
        this.sensor = sensor;
    }

    public DeviceEntity() {

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
}
