package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.HistoryConsumptionDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.entities.HistoryConsumptionEntity;
import ro.tuc.ds2020.entities.SensorEntity;

public class HistoryConsumptionBuilder {

    public HistoryConsumptionBuilder() {
    }

    public static HistoryConsumptionDTO toDTO(HistoryConsumptionEntity historyConsumptionEntity){
        return new HistoryConsumptionDTO(historyConsumptionEntity.getId(),historyConsumptionEntity.getValue(),historyConsumptionEntity.getTimestamp(), historyConsumptionEntity.getSensorEntity());
    }

    public static HistoryConsumptionEntity toEntity(HistoryConsumptionDTO historyConsumptionDTO){
        return new HistoryConsumptionEntity(historyConsumptionDTO.getId(),historyConsumptionDTO.getValue(),historyConsumptionDTO.getTimestamp(), historyConsumptionDTO.getSensorEntity());
    }

}
