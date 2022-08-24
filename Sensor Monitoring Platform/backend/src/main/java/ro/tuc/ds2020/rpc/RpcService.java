package ro.tuc.ds2020.rpc;

import com.googlecode.jsonrpc4j.spring.AutoJsonRpcServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import ro.tuc.ds2020.dtos.HistoryConsumptionDTO;
import ro.tuc.ds2020.services.HistoryConsumptionService;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@AutoJsonRpcServiceImpl
@Service
public class RpcService implements RpcInterface {

    private final HistoryConsumptionService service;

    @Autowired
    public RpcService(HistoryConsumptionService service) {
        this.service = service;
    }

    @Override
    public List<HistoryConsumptionDTO> getValues(UUID userId, int days) {
        System.out.println("USER IDDD: "+userId);
        System.out.println("DAYS: "+ days);
        List<HistoryConsumptionDTO> results = service.findValuesById(userId,days);
        System.out.println("RESULTS: "+ results.size());
        return results;
    }
}