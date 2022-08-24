package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.entities.SensorEntity;

public class SensorBuilder {
    public SensorBuilder(){
    }

    public static SensorDTO toSensorDTO(SensorEntity sensor){
        return new SensorDTO(sensor.getId(),sensor.getDescription(),sensor.getMaximumValue(), sensor.getDevice(),sensor.getSensorValues());
    }

    public static SensorEntity toEntity(SensorDTO sensor){
        return new SensorEntity(sensor.getId(),sensor.getDescription(),sensor.getMaximumValue(), sensor.getDevice(), sensor.getValues());
    }
}
