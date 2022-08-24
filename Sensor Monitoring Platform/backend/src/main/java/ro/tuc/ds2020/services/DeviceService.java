package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.entities.DeviceEntity;
import ro.tuc.ds2020.repositories.DeviceRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DeviceService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviceService.class);
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository){
        this.deviceRepository=deviceRepository;
    }

    public UUID insert(DeviceDTO deviceDTO) {

        DeviceEntity device = DeviceBuilder.toEntity(deviceDTO);
        device = deviceRepository.save(device);
        LOGGER.debug("Device with id {} was inserted in db", device.getId());
        return device.getId();
    }

    public List<DeviceDTO> findDevices() {
        List<DeviceEntity> deviceList = deviceRepository.findAll();
        return deviceList.stream()
                .map(DeviceBuilder::toDeviceDTO)
                .collect(Collectors.toList());
    }

    public DeviceDTO findDeviceById(UUID id){
        Optional<DeviceEntity> prosumerOptional = deviceRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(DeviceEntity.class.getSimpleName() + " with id: " + id);
        }
        return DeviceBuilder.toDeviceDTO(prosumerOptional.get());
    }

    public DeviceDTO updateDevice(UUID id, DeviceDTO deviceDTO){
        System.out.println(deviceDTO);
        DeviceDTO device = findDeviceById(id);
        device.setDescription(deviceDTO.getDescription());
        device.setAddress(deviceDTO.getAddress());
        device.setMaximumEnergyConsumption(deviceDTO.getMaximumEnergyConsumption());
        device.setAverageEnergyConsumption(deviceDTO.getAverageEnergyConsumption());
        device.setUserEntity(deviceDTO.getUserEntity());
        device.setSensor(deviceDTO.getSensor());

        DeviceEntity deviceEntity = DeviceBuilder.toEntity(device);
        System.out.println("ID: "+deviceEntity.getId());
        deviceEntity = deviceRepository.save(deviceEntity);
        return DeviceBuilder.toDeviceDTO(deviceEntity);
    }

    public UUID deleteDevice(UUID deviceId){
        DeviceDTO device = findDeviceById(deviceId);
        deviceRepository.deleteById(device.getId());
        return device.getId();
    }
}
