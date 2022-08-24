package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.tuc.ds2020.entities.SensorEntity;

import java.util.UUID;

public interface SensorRepository extends JpaRepository<SensorEntity, UUID> {
}
