package businessLayer;

import dataAccessLayer.AdministratorDAO;
import dataAccessLayer.EmployeeDAO;
import presentationLayer.EmployeeView;

public class LoginEmployeeController {

    public LoginEmployeeController() {
    }

    public void login(String username, String password)
    {

        if(EmployeeDAO.findByUsername(username)!=null&&EmployeeDAO.findByUsername(username).equals(password)) {
            EmployeeView employeeView = new EmployeeView();
        }
        else
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_USER_ACCOUNT);
        }
    }
}
