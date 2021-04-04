package dataAccessLayer;

import connectionLayer.ConnectionFactory;
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
import java.util.logging.Level;
import java.util.logging.Logger;

public class ClientDAO {

    private static final String insertStatementString = "INSERT INTO client (clientId,name,identityCardNumber,cnp,address,email)"
            + " VALUES (?,?,?,?,?,?)";
    private static final String findStatementByCnp = "SELECT clientId FROM client where cnp =?";
    private static final String getClientsStatement="SELECT * from client";
    private static final String getMaxIdStatement="SELECT MAX(clientId) from client";
    private static final String updateStatement="UPDATE client SET name=?, identityCardNumber=?, cnp=? , address=? , email=? WHERE clientId=?";
    private static final String deleteStatementString="DELETE from client WHERE cnp=?";
    protected static final Logger LOGGER = Logger.getLogger(Client.class.getName());
    public static int insert(Client client) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, client.getClientId());
            insertStatement.setString(2, client.getName());
            insertStatement.setInt(3, client.getIdentityCardNumber());
            insertStatement.setString(4, client.getCnp());
            insertStatement.setString(5, client.getAddress());
            insertStatement.setString(6, client.getEmail());
            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "Client:insert " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
        return insertedId;
    }

    public static int findByCnp(String cnp) {
        int clientId = -1;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findStatementByCnp);
            findStatement.setString(1, cnp);
            rs = findStatement.executeQuery();

            if(rs.next())
            {
                clientId = rs.getInt("clientId");
            }

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "ClientDAO:findByCnp " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return clientId;
    }

    public static void update(String name,int identityCardNumber,String cnp,String address ,String email,int id) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;

        try {
            insertStatement = dbConnection.prepareStatement(updateStatement, Statement.RETURN_GENERATED_KEYS);

            insertStatement.setString(1, name);
            insertStatement.setInt(2, identityCardNumber);
            insertStatement.setString(3, cnp);
            insertStatement.setString(4, address);
            insertStatement.setString(5,email);
            insertStatement.setInt(6, id);
            insertStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "ClientDAO:update " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    public static ArrayList<Client> getClients() {
        ArrayList<Client> clients = new ArrayList<>();

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(getClientsStatement);
            rs = findStatement.executeQuery();
            while(rs.next())
            {
                Client client= new Client(rs.getInt("clientId"),rs.getString("name"),rs.getInt("identityCardNumber"),rs.getString("cnp"),rs.getString("address"),rs.getString("email"));
                clients.add(client);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "CLientDAO:getClients " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return clients;
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
            LOGGER.log(Level.WARNING, "ClientDAO:getMaximumId " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return id;
    }

    public static void delete(String cnp) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement deleteStatement = null;

        try {
            deleteStatement = dbConnection.prepareStatement(deleteStatementString, Statement.RETURN_GENERATED_KEYS);

            deleteStatement.setString(1, cnp);
            deleteStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "ClientDAO:delete " + e.getMessage());
        } finally {
            ConnectionFactory.close(deleteStatement);
            ConnectionFactory.close(dbConnection);
        }
    }
}

