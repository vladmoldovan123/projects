package dataAccessLayer;

import connectionLayer.ConnectionFactory;
import modelLayer.Administrator;
import modelLayer.Client;

import java.util.logging.Level;
import java.util.logging.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class AdministratorDAO {
    private static final String insertStatementString = "INSERT INTO administrator (administratorId,name,username,password,email)"
            + " VALUES (?,?,?,?,?)";
    private static final String findByUsername = "SELECT password FROM administrator where username= ?";
    protected static final Logger LOGGER = Logger.getLogger(Client.class.getName());
    public static int insert(Administrator administrator) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, administrator.getAdministratorId());
            insertStatement.setString(2, administrator.getName());
            insertStatement.setString(3, administrator.getUsername());
            insertStatement.setString(4, administrator.getPassword());
            insertStatement.setString(5, administrator.getEmail());
            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "Administrator:insert " + e.getMessage());
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
            LOGGER.log(Level.WARNING, "AdministratorDAO:findByUsername " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return password;
    }
}
