package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.HistoryConsumptionDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.builders.HistoryConsumptionBuilder;
import ro.tuc.ds2020.dtos.builders.SensorBuilder;
import ro.tuc.ds2020.entities.DeviceEntity;
import ro.tuc.ds2020.entities.HistoryConsumptionEntity;
import ro.tuc.ds2020.entities.SensorEntity;
import ro.tuc.ds2020.services.HistoryConsumptionService;
import ro.tuc.ds2020.services.SensorService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/history")
public class HistoryConsumptionController {

    private final HistoryConsumptionService historyConsumptionService;
    private final SensorService sensorService;

    @Autowired
    public HistoryConsumptionController(HistoryConsumptionService historyConsumptionService, SensorService sensorService) {
        this.historyConsumptionService = historyConsumptionService;
        this.sensorService=sensorService;
    }

    @GetMapping()
    public ResponseEntity<List<HistoryConsumptionDTO>> getValues() {

        List<HistoryConsumptionDTO> values = historyConsumptionService.findAll();

        return new ResponseEntity<>(values, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertUser(@Valid @RequestBody HistoryConsumptionDTO historyConsumptionDTO) {
        UUID id = historyConsumptionService.insert(historyConsumptionDTO);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoryConsumptionDTO> getUser(@PathVariable UUID id) {
        HistoryConsumptionDTO historyConsumptionDTO = historyConsumptionService.findValueById(id);
        return new ResponseEntity<>(historyConsumptionDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UUID> deleteUser(@PathVariable UUID id)
    {
        UUID deletedValueId = historyConsumptionService.deleteValue(id);
        return new ResponseEntity<>(deletedValueId,HttpStatus.OK);
    }

    @PostMapping("/sensor/{id}")
    public ResponseEntity<HistoryConsumptionDTO> linkSensor(@PathVariable UUID id, @Valid @RequestBody HistoryConsumptionDTO historyConsumptionDTO){
        SensorDTO sensorDTO = sensorService.findSensorById(id);
        SensorEntity sensorEntity = SensorBuilder.toEntity(sensorDTO);
        historyConsumptionDTO.setSensorEntity(sensorEntity);
        historyConsumptionService.insert(historyConsumptionDTO);
        //SensorDTO sen = sensorService.updateSensor(sensorDTO.getId(),sensorDTO);
        return new ResponseEntity<>(historyConsumptionDTO,HttpStatus.OK);
    }
}
