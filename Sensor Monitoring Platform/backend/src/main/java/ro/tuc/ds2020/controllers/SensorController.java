package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.builders.SensorBuilder;
import ro.tuc.ds2020.entities.DeviceEntity;
import ro.tuc.ds2020.entities.SensorEntity;
import ro.tuc.ds2020.services.SensorService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/sensor")
public class SensorController {

    private final SensorService sensorService;

    @Autowired
    public SensorController(SensorService sensorService){
        this.sensorService=sensorService;
    }

    @PostMapping()
    public ResponseEntity<UUID> insertSensor(@Valid @RequestBody SensorDTO sensorDTO) {
        UUID sensorId = sensorService.insert(sensorDTO);
        return new ResponseEntity<>(sensorId, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<SensorDTO>> getSensors() {

        System.out.println("TEST");
        List<SensorDTO> sensors = sensorService.findSensors();

        return new ResponseEntity<>(sensors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensorDTO> getSensor(@PathVariable UUID id) {
        SensorDTO sensor = sensorService.findSensorById(id);
        return new ResponseEntity<>(sensor, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SensorDTO> updateSensor(@PathVariable UUID id,@Valid @RequestBody SensorDTO sensorDTO){
        SensorDTO sensor = sensorService.updateSensor(id,sensorDTO);
        return new ResponseEntity<>(sensor,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UUID> deleteSensor(@PathVariable UUID id)
    {
        UUID deletedSensorId = sensorService.deleteSensor(id);
        return new ResponseEntity<>(deletedSensorId,HttpStatus.OK);
    }



}
