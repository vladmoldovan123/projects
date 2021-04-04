package starterLayer;

import businessLayer.SelectUserController;
import dataAccessLayer.AccountDAO;
import dataAccessLayer.EmployeeDAO;
import modelLayer.Account;
import presentationLayer.SelectUserView;

import java.sql.Date;

public class mainClass {


    public static void main(String[] args)
    {

        SelectUserView selectUserView=new SelectUserView();
        /*Account gas = new Account(AccountDAO.getMaximumId()+1,"4444555566667777",0,"Gas",0);
        AccountDAO.insert(gas);
        Account electricity = new Account(AccountDAO.getMaximumId()+1,"4444555566667778",0,"Electricity",0);
        AccountDAO.insert(electricity);
        Account internet = new Account(AccountDAO.getMaximumId()+1,"4444555566667779",0,"Internet",0);


        AccountDAO.insert(internet);*/
    }
}
