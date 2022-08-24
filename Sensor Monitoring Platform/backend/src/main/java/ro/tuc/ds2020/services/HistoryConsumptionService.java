package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.HistoryConsumptionDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.builders.HistoryConsumptionBuilder;
import ro.tuc.ds2020.dtos.builders.SensorBuilder;
import ro.tuc.ds2020.entities.DeviceEntity;
import ro.tuc.ds2020.entities.HistoryConsumptionEntity;
import ro.tuc.ds2020.entities.SensorEntity;
import ro.tuc.ds2020.repositories.HistoryConsumptionRepository;

import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HistoryConsumptionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(HistoryConsumptionService.class);
    private final HistoryConsumptionRepository historyConsumptionRepository;

    @Autowired
    public HistoryConsumptionService(HistoryConsumptionRepository historyConsumptionRepository) {
        this.historyConsumptionRepository = historyConsumptionRepository;
    }

    public UUID insert(HistoryConsumptionDTO historyConsumptionDTO){
        HistoryConsumptionEntity value = HistoryConsumptionBuilder.toEntity(historyConsumptionDTO);
        value = historyConsumptionRepository.save(value);
        LOGGER.debug("Sensor with id {} was inserted in db", value.getId());
        return value.getId();
    }

    public List<HistoryConsumptionDTO> findAll() {
        List<HistoryConsumptionEntity> list = historyConsumptionRepository.findAll();
        return list.stream()
                .map(HistoryConsumptionBuilder::toDTO)
                .collect(Collectors.toList());
    }

    public HistoryConsumptionDTO findValueById(UUID id){
        Optional<HistoryConsumptionEntity> prosumerOptional = historyConsumptionRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(HistoryConsumptionDTO.class.getSimpleName() + " with id: " + id);
        }
        return HistoryConsumptionBuilder.toDTO(prosumerOptional.get());
    }

    public UUID deleteValue(UUID valueId){
        HistoryConsumptionDTO value = findValueById(valueId);
        historyConsumptionRepository.deleteById(value.getId());
        return value.getId();
    }

    public List<HistoryConsumptionDTO> findValuesById(UUID userId,int days) {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        List<HistoryConsumptionDTO> results = new ArrayList<>();
        List<HistoryConsumptionDTO> list = findAll();
        for (HistoryConsumptionDTO element: list) {
            if(element.getSensorEntity().getDevice().getUserEntity().getId().equals(userId)) {
                if(c.getTimeInMillis() - (((long) days - 1 )* 86400000)<= element.getTimestamp()) {
                    results.add(element);
                }
            }
        }
        return results;
    }
}
