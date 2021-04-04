package dataAccessLayer;

import connectionLayer.ConnectionFactory;
import modelLayer.Administrator;
import modelLayer.Client;
import modelLayer.Employee;

import java.sql.*;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class EmployeeDAO {

    private static final String insertStatementString = "INSERT INTO employee (employeeId,name,username,password,email)"
            + " VALUES (?,?,?,?,?)";
    protected static final Logger LOGGER = Logger.getLogger(Client.class.getName());
    private static final String findByUsername = "SELECT password FROM employee where username= ?";
    private static final String getEmployeesStatement="SELECT * from employee";
    private static final String getMaxIdStatement="SELECT MAX(employeeId) from employee";
    private static final String findIdByUsername="SELECT employeeId FROM employee where username=?";
    private static final String updateStatement="UPDATE employee SET name=?, username=?, password=? , email=? WHERE employeeId=?";
    private static final String deleteStatement="DELETE from employee WHERE username=?";
    public static int insert(Employee employee) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, employee.getEmployeeId());
            insertStatement.setString(2, employee.getName());
            insertStatement.setString(3, employee.getUsername());
            insertStatement.setString(4, employee.getPassword());
            insertStatement.setString(5, employee.getEmail());
            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "Employee:insert " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
        return insertedId;
    }

    public static String findByUsername(String username) {
        String password = null;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findByUsername);
            findStatement.setString(1, username);
            rs = findStatement.executeQuery();
            if(rs.next())
            {
                password = rs.getString("password");
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "EmployeeDAO:findByUsername " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return password;
    }

    public static ArrayList<Employee> getEmployees() {
        ArrayList<Employee> employees = new ArrayList<>();

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(getEmployeesStatement);
            rs = findStatement.executeQuery();
            while(rs.next())
            {
                Employee employee= new Employee(rs.getInt("employeeId"),rs.getString("name"),rs.getString("username"),rs.getString("password"),rs.getString("email"));
                employees.add(employee);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "EmployeeDAO:getEmployees " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return employees;
    }

    public static int getMaximumId() {
        int id=0;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(getMaxIdStatement);
            rs = findStatement.executeQuery();
            if(rs.next())
            {
                id=rs.getInt(1);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "EmployeeDAO:getMaximumId " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return id;
    }

    public static int getEmployeeId(String username)
    {
        int id=-1;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findIdByUsername);
            findStatement.setString(1, username);
            rs = findStatement.executeQuery();
            if(rs.next())
            {
                id = rs.getInt(1);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "EmployeeDAO: getEmployeeId " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }

        return id;
    }

    public static void update(String name,String username,String password,String email,int id) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;

        try {
            insertStatement = dbConnection.prepareStatement(updateStatement, Statement.RETURN_GENERATED_KEYS);

            insertStatement.setString(1, name);
            insertStatement.setString(2, username);
            insertStatement.setString(3, password);
            insertStatement.setString(4, email);
            insertStatement.setInt(5, id);
            insertStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "EmployeeDAO:update " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    public static void delete(String username) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;

        try {
            insertStatement = dbConnection.prepareStatement(deleteStatement, Statement.RETURN_GENERATED_KEYS);

            insertStatement.setString(1, username);
            insertStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "EmployeeDAO:delete " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

}
