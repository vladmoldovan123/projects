package ro.tuc.ds2020.dtos;

import ro.tuc.ds2020.entities.DeviceEntity;

import java.sql.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class UserDTO {

    private UUID id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String address;
    private Date birthdate;
    private List<DeviceEntity> deviceEntities;
    private String role;


    public UserDTO(UUID id, String name, String username, String password, String email, String address, Date birthdate, List<DeviceEntity> deviceEntities, String role) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.birthdate = birthdate;
        this.deviceEntities = deviceEntities;
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public List<DeviceEntity> getDeviceEntities() {
        return deviceEntities;
    }

    public void setDeviceEntities(List<DeviceEntity> deviceEntities) {
        this.deviceEntities = deviceEntities;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
