package ro.tuc.ds2020.dtos.builders;

import org.apache.catalina.User;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.entities.UserEntity;

public class UserBuilder {

    public UserBuilder() {
    }

    public static UserDTO toUserDTO(UserEntity user)
    {
        return new UserDTO(user.getId(),user.getName(), user.getUsername(), user.getPassword(), user.getEmail(), user.getAddress(),user.getBirthdate(),user.getDeviceEntities(), user.getRole());

    }

    public static UserEntity toEntity(UserDTO user)
    {
        return new UserEntity(user.getId(),user.getName(), user.getUsername(), user.getPassword(), user.getEmail(), user.getAddress(),user.getBirthdate(),user.getDeviceEntities(), user.getRole());
    }
}
