package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.entities.DeviceEntity;
import ro.tuc.ds2020.entities.UserEntity;
import ro.tuc.ds2020.services.DeviceService;
import ro.tuc.ds2020.services.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;
    private final DeviceService deviceService;

    @Autowired
    public UserController(UserService userService, DeviceService deviceService){
        this.userService=userService;
        this.deviceService=deviceService;
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getUsers() {

        List<UserDTO> users = userService.findUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertUser(@Valid @RequestBody UserDTO userDTO) {
        UUID userId = userService.insert(userDTO);
        return new ResponseEntity<>(userId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable UUID id) {
        UserDTO user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID id,@Valid @RequestBody UserDTO userDTO){
        UserDTO user = userService.updateUser(id,userDTO);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UUID> deleteUser(@PathVariable UUID id)
    {
        UUID deletedUserId = userService.deleteUser(id);
        return new ResponseEntity<>(deletedUserId,HttpStatus.OK);
    }

    @PostMapping("/device/{id}")
    public ResponseEntity<DeviceDTO> linkDevice(@PathVariable UUID id, @Valid @RequestBody UserDTO userDTO){
        DeviceDTO deviceDTO = deviceService.findDeviceById(id);
        UserEntity userEntity = UserBuilder.toEntity(userDTO);
        deviceDTO.setUserEntity(userEntity);
        DeviceDTO sen = deviceService.updateDevice(deviceDTO.getId(),deviceDTO);
        return new ResponseEntity<>(sen,HttpStatus.OK);
    }


}
