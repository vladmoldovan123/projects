package businessLayer;

import dataAccessLayer.AccountDAO;
import modelLayer.Account;

import java.util.ArrayList;

public class AccountController {

    public AccountController() {
    }

    public ArrayList<Account> getAccounts(int id)
    {
        return AccountDAO.getAccounts(id);
    }

    public void insertAccount(String identificationNumber,String balance,int clientId,String type)
    {
        if(Validators.validateIdentificationNumber(identificationNumber)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_IDENTIFICATION_NUMBER);
            return;
        }
        if(Validators.validateBalance(balance)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_BALANCE);
            return;
        }
        if(Validators.validateType(type)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_TYPE);
            return;
        }

        int accountId=AccountDAO.getMaximumId();
        double amount=Double.parseDouble(balance);
        Account account = new Account(accountId+1,identificationNumber,clientId,type,amount);
        AccountDAO.insert(account);
    }

    public void updateAccount(String identificationNumber,String type,String balance,String previousNumber)
    {
        if(Validators.validateIdentificationNumber(identificationNumber)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_IDENTIFICATION_NUMBER);
            return;
        }
        if(Validators.validateBalance(balance)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_BALANCE);
            return;
        }
        if(Validators.validateType(type)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_TYPE);
            return;
        }
        int id=AccountDAO.getAccountId(previousNumber);
        double b= Double.parseDouble(balance);
        AccountDAO.update(identificationNumber,type,b,id);
    }

    public void delete(String identificationNumber)
    {
        int id = AccountDAO.getAccountId(identificationNumber);
        AccountDAO.delete(id);
    }

    public void pay(String selectedIdentificationNumber,String type,String amount)
    {
        if(Validators.validateBalance(amount)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_SUM);
            return;
        }
        Double balance = Double.parseDouble(amount);
        if(balance<0)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_SUM);
            return;
        }

        int id1 = AccountDAO.getAccountId(selectedIdentificationNumber);
        Double balance1=AccountDAO.getBalance(id1);
        String identificationNumber = AccountDAO.getIdByType(type);
        int id2=AccountDAO.getAccountId(identificationNumber);
        Double balance2=AccountDAO.getBalance(id2);
        System.out.println(balance1);
        System.out.println(balance);
        System.out.println(balance2);
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
