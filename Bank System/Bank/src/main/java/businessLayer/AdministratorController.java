package businessLayer;

import dataAccessLayer.EmployeeDAO;
import modelLayer.Employee;

import java.util.ArrayList;

public class AdministratorController {

    public AdministratorController()
    {

    }
    public ArrayList<Employee> getEmployees()
    {
        return EmployeeDAO.getEmployees();
    }

    public void insertEmployee(String name,String username,String password,String email)
    {
        if(Validators.validateName(name)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_NAME);
            return;
        }
        if(Validators.validateUsername(username)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_USERNAME);
            return;
        }
        if(Validators.validatePassowrd(password)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_PASSWORD);
            return;
        }
        if(Validators.validateEmail(email)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_EMAIL);
            return;
        }
        int id=EmployeeDAO.getMaximumId();
        Employee employee=new Employee(id+1,name,username,password,email);
        EmployeeDAO.insert(employee);
    }

    public void updateEmployee(String name,String username,String password,String email,String previousUsername)
    {
        if(Validators.validateName(name)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_NAME);
            return;
        }
        if(Validators.validateUsername(username)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_USERNAME);
            return;
        }
        if(Validators.validatePassowrd(password)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_PASSWORD);
            return;
        }
        if(Validators.validateEmail(email)==false)
        {
            ControllerUtilis.createSwingErrorMessage(ErrorMessages.INVALID_EMAIL);
            return;
        }
        int id=EmployeeDAO.getEmployeeId(previousUsername);
        EmployeeDAO.update(name,username,password,email,id);
    }

    public void deleteEmployee(String username)
    {
        EmployeeDAO.delete(username);
    }
}
