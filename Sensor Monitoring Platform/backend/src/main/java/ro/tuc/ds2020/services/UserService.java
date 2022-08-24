package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.PersonDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.PersonBuilder;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.entities.Person;
import ro.tuc.ds2020.entities.UserEntity;
import ro.tuc.ds2020.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public UUID insert(UserDTO userDTO) {
        if(userDTO.getRole()==null)
        {
            userDTO.setRole("User");
        }
        UserEntity user = UserBuilder.toEntity(userDTO);
        user = userRepository.save(user);
        LOGGER.debug("User with id {} was inserted in db", user.getId());
        return user.getId();
    }

    public List<UserDTO> findUsers() {
        System.out.println();
        List<UserEntity> userList = userRepository.findAll();
        return userList.stream()
                .map(UserBuilder::toUserDTO)
                .collect(Collectors.toList());
    }

    public UserDTO findUserById(UUID id){
        Optional<UserEntity> prosumerOptional = userRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(UserEntity.class.getSimpleName() + " with id: " + id);
        }
        return UserBuilder.toUserDTO(prosumerOptional.get());
    }

    public UserDTO updateUser(UUID id, UserDTO userDTO){
        System.out.println(userDTO);
        UserDTO user = findUserById(id);
        user.setName(userDTO.getName());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());
        user.setBirthdate(userDTO.getBirthdate());
        user.setDeviceEntities(userDTO.getDeviceEntities());

        UserEntity userEntity = UserBuilder.toEntity(user);
        userEntity = userRepository.save(userEntity);
        return UserBuilder.toUserDTO(userEntity);
    }

    public UUID deleteUser(UUID userId){
        UserDTO user = findUserById(userId);
        userRepository.deleteById(user.getId());
        return user.getId();
    }
}
