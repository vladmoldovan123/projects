package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.builders.SensorBuilder;
import ro.tuc.ds2020.entities.DeviceEntity;
import ro.tuc.ds2020.entities.SensorEntity;
import ro.tuc.ds2020.repositories.SensorRepository;
import ro.tuc.ds2020.services.DeviceService;
import ro.tuc.ds2020.services.SensorService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/device")
public class DeviceController {

    private final DeviceService deviceService;
    private final SensorService sensorService;

    @Autowired
    public DeviceController(DeviceService deviceService, SensorService sensorService){
        this.deviceService=deviceService;
        this.sensorService=sensorService;
    }

    @PostMapping()
    public ResponseEntity<UUID> insertDevice(@Valid @RequestBody DeviceDTO deviceDTO) {
        UUID deviceId = deviceService.insert(deviceDTO);
        return new ResponseEntity<>(deviceId, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<DeviceDTO>> getDevices() {

        System.out.println("TEST");
        List<DeviceDTO> devices = deviceService.findDevices();

        return new ResponseEntity<>(devices, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceDTO> getDevice(@PathVariable UUID id) {
        DeviceDTO device = deviceService.findDeviceById(id);
        return new ResponseEntity<>(device, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceDTO> updateDevice(@PathVariable UUID id,@Valid @RequestBody DeviceDTO deviceDTO){
        System.out.println(deviceDTO.getSensor().getId());
        DeviceDTO device = deviceService.updateDevice(id,deviceDTO);
        return new ResponseEntity<>(device,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UUID> deleteDevice(@PathVariable UUID id)
    {
        UUID deletedDeviceId = deviceService.deleteDevice(id);
        return new ResponseEntity<>(deletedDeviceId,HttpStatus.OK);
    }

    @PostMapping("/sensor/{id}")
    public ResponseEntity<SensorDTO> linkSensor(@PathVariable UUID id,@Valid @RequestBody DeviceDTO deviceDTO){
        SensorDTO sensorDTO = sensorService.findSensorById(id);
        DeviceEntity deviceEntity = DeviceBuilder.toEntity(deviceDTO);
        sensorDTO.setDevice(deviceEntity);
        SensorDTO sen = sensorService.updateSensor(sensorDTO.getId(),sensorDTO);
        return new ResponseEntity<>(sen,HttpStatus.OK);
    }
}
