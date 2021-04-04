package businessLayer;

import dataAccessLayer.AdministratorDAO;
import dataAccessLayer.EmployeeDAO;
import presentationLayer.AdministratorView;

public class LoginAdministratorController {

    public LoginAdministratorController() {
    }

    public void login(String username,String password)
    {

            if(AdministratorDAO.findByUsername(username)!=null&&AdministratorDAO.findByUsername(username).equals(password)) {
                AdministratorView view = new AdministratorView();
            }
            else
            {
                ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_USER_ACCOUNT);
            }
    }
}
