package businessLayer;

import dataAccessLayer.AccountDAO;
import dataAccessLayer.ClientDAO;
import dataAccessLayer.EmployeeDAO;
import modelLayer.Client;
import presentationLayer.AccountTransferView;
import presentationLayer.AccountView;
import presentationLayer.EmployeeView;

import java.util.ArrayList;

public class EmployeeController {

    public EmployeeController() {
    }

    public ArrayList<Client> getClients()
    {
        return ClientDAO.getClients();
    }

    public void insertClient(String name,String identityCardNumber,String cnp,String address,String email)
    {
        if(Validators.validateEmail(email)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_EMAIL);
            return;
        }
        if(Validators.validateName(name)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_NAME);
            return;
        }
        if(Validators.validateIdentityCardNumber(identityCardNumber)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_IDNTITYNUMBER);
            return;
        }
        if(Validators.validateCnp(cnp)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_CNP);
            return;
        }
        if(Validators.validateAddress(address)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_ADDRESS);
            return;
        }
        int id = ClientDAO.getMaximumId();
        int identity = Integer.parseInt(identityCardNumber);
        Client client = new Client(id+1,name,identity,cnp,address,email);
        ClientDAO.insert(client);
    }

    public void updateClient(String name,String identityCardNumber,String cnp,String address, String email,String previousCnp)
    {
        if(Validators.validateEmail(email)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_EMAIL);
            return;
        }
        if(Validators.validateName(name)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_NAME);
            return;
        }
        if(Validators.validateIdentityCardNumber(identityCardNumber)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_IDNTITYNUMBER);
            return;
        }
        if(Validators.validateCnp(cnp)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_CNP);
            return;
        }
        if(Validators.validateAddress(address)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_ADDRESS);
            return;
        }
        int id= ClientDAO.findByCnp(previousCnp);
        int identity = Integer.parseInt(identityCardNumber);
        ClientDAO.update(name,identity,cnp,address,email,id);
    }

    public void deleteClient(String cnp)
    {
        int id = ClientDAO.findByCnp(cnp);
        ClientDAO.delete(cnp);
        AccountDAO.deleteByClientId(id);

    }

    public void viewAccount(String cnp)
    {
        int id=ClientDAO.findByCnp(cnp);
        AccountView view = new AccountView(id);
    }

    public void transfer(String cnp)
    {
        int id=ClientDAO.findByCnp(cnp);
        AccountTransferView view = new AccountTransferView(id);
    }
}
