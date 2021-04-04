package businessLayer;

import dataAccessLayer.AccountDAO;
import modelLayer.Account;

import java.util.ArrayList;

public class AccountTransferController {

    public AccountTransferController() {
    }

    public ArrayList<Account> getAccounts(int id)
    {
        return AccountDAO.getAccounts(id);
    }

    public ArrayList<Account> getAllAccounts()
    {
        return AccountDAO.getAllAccounts();
    }

    public void transfer(String identification1,String identification2,String amount)
    {
        if(Validators.validateBalance(amount)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_BALANCE);
            return;
        }
        Double balance = Double.parseDouble(amount);
        if(balance<0)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_SUM);
            return;
        }
        int id1 = AccountDAO.getAccountId(identification1);
        int id2 = AccountDAO.getAccountId(identification2);
        double balance1 = AccountDAO.getBalance(id1);
        double balance2 = AccountDAO.getBalance(id2);
        if(balance1-balance>=0)
        {
            AccountDAO.updateBalance(balance1-balance,id1);
            AccountDAO.updateBalance(balance2+balance,id2);
        }
        else
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INSUFFICIENT_BALANCE);
        }
    }
}
