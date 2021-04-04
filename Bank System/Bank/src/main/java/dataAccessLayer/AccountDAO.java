package dataAccessLayer;

import connectionLayer.ConnectionFactory;
import modelLayer.Account;
import modelLayer.Administrator;
import modelLayer.Client;
import modelLayer.Employee;

import java.sql.*;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AccountDAO {

    private static final String insertStatementString = "INSERT INTO account (accountId,identificationNumber,clientId,type,balance,creationDate)"
            + " VALUES (?,?,?,?,?,?)";
    private static final String getAccountsStatement="SELECT * from account where clientId=?";
    private static final String getMaxIdStatement="SELECT MAX(accountId) from account";
    private static final String findIdByNumber="SELECT accountId FROM account where identificationNumber=?";
    private static final String updateStatement="UPDATE account SET identificationNumber=?, type=?, balance=? WHERE accountId=?";
    private static final String deleteStatement="DELETE from account WHERE accountId=?";
    private static final String getAllAccountsStatement = "Select * from account";
    private static final String updateBalanceStatement = "UPDATE account SET balance=? where accountId=?";
    private static final String getBalanceStatement = "Select balance from account where accountId=?";
    private static final String findIdByType = "Select identificationNumber from account where type=?";
    private static final String deleteAccountsString="DELETE from account WHERE clientId=?";
    protected static final Logger LOGGER = Logger.getLogger(Client.class.getName());
    public static int insert(Account account) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, account.getAccountId());
            insertStatement.setString(2, account.getIdentificationNumber());
            insertStatement.setInt(3, account.getClientId());
            insertStatement.setString(4, account.getType());
            insertStatement.setDouble(5, account.getBalance());
            insertStatement.setDate(6, account.getCreationDate());

            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "Account:insert " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
        return insertedId;
    }

    public static ArrayList<Account> getAccounts(int id) {
        ArrayList<Account> accounts = new ArrayList<>();

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(getAccountsStatement);
            findStatement.setInt(1,id);
            rs = findStatement.executeQuery();
            while(rs.next())
            {
                Account account = new Account(rs.getInt("accountId"),rs.getString("identificationNumber"),rs.getInt("clientId"),rs.getString("type"),rs.getDouble("balance"),rs.getDate("creationDate"));
                accounts.add(account);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:getAccounts " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return accounts;
    }

    public static ArrayList<Account> getAllAccounts() {
        ArrayList<Account> accounts = new ArrayList<>();

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(getAllAccountsStatement);
            rs = findStatement.executeQuery();
            while(rs.next())
            {
                Account account = new Account(rs.getInt("accountId"),rs.getString("identificationNumber"),rs.getInt("clientId"),rs.getString("type"),rs.getDouble("balance"),rs.getDate("creationDate"));
                accounts.add(account);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:getAllAccounts " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return accounts;
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
            LOGGER.log(Level.WARNING, "AccountDAO:getMaximumId " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return id;
    }

    public static String getIdByType(String type) {
        String id="";

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findIdByType);
            findStatement.setString(1,type);
            rs = findStatement.executeQuery();
            if(rs.next())
            {
                id=rs.getString(1);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:getIdByType " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return id;
    }

    public static Double getBalance(int id) {
        double balance = 0;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(getBalanceStatement);
            findStatement.setInt(1,id);
            rs = findStatement.executeQuery();
            if(rs.next())
            {
                balance=rs.getDouble(1);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:getBalance " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return balance;
    }

    public static int getAccountId(String identificationNumber)
    {
        int id=-1;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findIdByNumber);
            findStatement.setString(1, identificationNumber);
            rs = findStatement.executeQuery();
            if(rs.next())
            {
                id = rs.getInt(1);
            }


        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO: getAccountId " + e.getMessage());
        } finally {
            //ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }

        return id;
    }

    public static void update(String identificationNumber,String type,Double balance,int id) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;

        try {
            insertStatement = dbConnection.prepareStatement(updateStatement, Statement.RETURN_GENERATED_KEYS);

            insertStatement.setString(1, identificationNumber);
            insertStatement.setString(2, type);
            insertStatement.setDouble(3, balance);
            insertStatement.setInt(4, id);
            insertStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:update " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    public static void updateBalance(Double balance,int id) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;

        try {
            insertStatement = dbConnection.prepareStatement(updateBalanceStatement, Statement.RETURN_GENERATED_KEYS);

            insertStatement.setDouble(1, balance);
            insertStatement.setInt(2, id);
            insertStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:updateBalance " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    public static void delete(int accountId) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;

        try {
            insertStatement = dbConnection.prepareStatement(deleteStatement, Statement.RETURN_GENERATED_KEYS);

            insertStatement.setInt(1, accountId);
            insertStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:delete " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    public static void deleteByClientId(int clientId) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;

        try {
            insertStatement = dbConnection.prepareStatement(deleteAccountsString, Statement.RETURN_GENERATED_KEYS);

            insertStatement.setInt(1, clientId);
            insertStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "AccountDAO:deleteByClientId " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
    }
}
