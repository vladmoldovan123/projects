package ro.tuc.ds2020.rpc;

import com.googlecode.jsonrpc4j.JsonRpcParam;
import com.googlecode.jsonrpc4j.JsonRpcService;
import ro.tuc.ds2020.dtos.HistoryConsumptionDTO;

import java.util.List;
import java.util.UUID;

@JsonRpcService("/rpc")
public interface RpcInterface {
    public List<HistoryConsumptionDTO> getValues(@JsonRpcParam(value = "userId") UUID userId, @JsonRpcParam(value = "days") int days);
}