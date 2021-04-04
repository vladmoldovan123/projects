package dataAccesLayer;

import connectionLayer.ConnectionFactory;

import modelLayer.OrderClient;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Aceasta clasa comunica cu tabelul order_client din baza de date.
 */

public class OrderClientDAO {

    protected static final Logger LOGGER = Logger.getLogger(ProductDAO.class.getName());
    /**
     * Reprezinta query-ul pentru inserare unui order final pentru client.
     */
    private static final String insertStatementString = "INSERT INTO order_client (ocId,clientId,price)"
            + " VALUES (?,?,?)";
    /**
     * Reprezinta query-ul pentru a verifica daca exita clientul cu id-ul specificat.
     */
    private final static String findStatementString = "SELECT * FROM order_client where clientId = ?";
    /**
     * Reprezinta query-ul pentru selectarea tuturor elementelor din tabelul order_client al bazei de date.
     */
    private final static String getAllStatementString = "SELECT * FROM order_client";
    /**
     * Reprezinta query-ul pentru stergerea unui orderClient dupa id-ul acestuia.
     */
    private final static String deleteStatementString = "DELETE FROM order_client where clientId = ?";
    /**
     * Reprezinta query-ul pentru modificarea pretului din tabelul order_client dupa id-ul specificat.
     */
    private final static String updatePriceStatementString = "UPDATE order_client SET price=price+? where clientId=?";


    /**
     * Metoda care modifica pretul unui orderClient dupa id-ul specificat.
     * @param id Id-ul pentru orderClient
     * @param nr Valoarea care va fi adaugata la pretul curent.
     */
    public static void updatePrice(int id, float nr) {

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement updatePriceStatement = null;
        int rs = 0;
        try {
            updatePriceStatement = dbConnection.prepareStatement(updatePriceStatementString);
            updatePriceStatement.setFloat(1, nr);
            updatePriceStatement.setInt(2,id );
            rs = updatePriceStatement.executeUpdate();

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"OrderClientDAO:updatePrice " + e.getMessage());
        } finally {
            ConnectionFactory.close(updatePriceStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    /**
     * Metoda care verifica daca un orderClient cu id-ul specificat exista sau nu.
     * @param id Id-ul pentru orderClient.
     * @return Returneaza true in cazul in care a fost gasit sau false in cazul in care nu a fost gasit.
     */

    public static Boolean findById(int id) {
        boolean toReturn = false;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findStatementString);
            findStatement.setInt(1, id);
            rs = findStatement.executeQuery();
            if(rs.next())
                toReturn=true;

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"OrderClientDAO:findById " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return toReturn;
    }

    /**
     * Metoda care insereaza un orderClient in tabelul order_client.
     * @param order orderClient-ul care trebuie inserat.
     * @return Returneza -1 daca inserarea nu a reusit sau id-ul pentru orderClient daca inserarea a reusit.
     */

    public static int insert(OrderClient order) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, order.getOcId());
            insertStatement.setInt(2, order.getClientId());
            insertStatement.setFloat(3, order.getPrice());
            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "OrderClientDAO:insert " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
        return insertedId;
    }

    /**
     * Metoda care genereaza toate elementele tabelului  order_client.
     * @return O lista de tipul String care contine mesajele pentru factura.
     */

    public static ArrayList<String> getFinalBil() {

        ArrayList<String> list=new ArrayList<String>(10000);
        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;

        try {
            findStatement = dbConnection.prepareStatement(getAllStatementString);
            rs = findStatement.executeQuery();
            while(rs.next()) {
                int clientId = rs.getInt(2);
                float price = rs.getInt(3);
                String client = ClientDAO.findById(clientId);
                String str2 = Float.toString(price);
                String a="Total bill: "+"client "+client+",total price "+str2+" .";
                list.add(a);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"OrderClientDAO:getFinalBill " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return list;
    }

    /**
     * Metoda care sterge un orderClient din tabelul order_client al bazei de date dupa id.
     * @param id Id-ul specificat al orderClient.
     * @return Returneaza -1 daca stergerea nu a reusit sau id-ul orderClient in caz ca stergerea a reusit.
     */
    public static int delete(int id) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement deleteStatement = null;
        int deletedId = -1;
        try {
            deleteStatement = dbConnection.prepareStatement(deleteStatementString, Statement.RETURN_GENERATED_KEYS);
            deleteStatement.setInt(1, id);
            deleteStatement.executeUpdate();

            ResultSet rs = deleteStatement.getGeneratedKeys();
            if (rs.next()) {
                deletedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "OrderClientDAO:delete " + e.getMessage());
        } finally {
            ConnectionFactory.close(deleteStatement);
            ConnectionFactory.close(dbConnection);
        }
        return deletedId;
    }
}
