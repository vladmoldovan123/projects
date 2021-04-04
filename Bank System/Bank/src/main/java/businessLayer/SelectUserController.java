package businessLayer;

import presentationLayer.LoginAdministratorView;
import presentationLayer.LoginEmployeeView;

public class SelectUserController {

    private LoginAdministratorView administrator;
    private LoginEmployeeView employee;

    public SelectUserController() {
    }

    public void loginAdministrator()
    {
        administrator = new LoginAdministratorView();
    }

    public void loginEmployee()
    {
        employee = new LoginEmployeeView();
    }
}
