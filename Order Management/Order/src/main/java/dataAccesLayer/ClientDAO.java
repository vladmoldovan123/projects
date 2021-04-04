package dataAccesLayer;

import com.itextpdf.text.pdf.PdfPTable;
import connectionLayer.ConnectionFactory;
import modelLayer.Client;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Aceasta clasa comunica cu tabelul Client din baza de date.
 */

public class ClientDAO {

    protected static final Logger LOGGER = Logger.getLogger(ClientDAO.class.getName());
    /**
     * Reprezinta query-ul pentru insert.
     */
    private static final String insertStatementString = "INSERT INTO client (clientId,name,city)"
            + " VALUES (?,?,?)";
    /**
     * Reprezinta query-ul pentru a gasi numele unui client dupa id-ul clientului.
     */
    private final static String findStatementString = "SELECT * FROM client where clientId = ?";
    /**
     * Reprezinta query-ul pentru a gasi id-ul unui client dupa numele clientului.
     */
    private final static String findByNameStatementString = "SELECT * FROM client where name = ?";
    /**
     * Reprezinta query-ul pentru pentru stergerea unui cleint dupa numele acestuia.
     */
    private final static String deleteStatementString = "DELETE FROM client where name = ?";
    /**
     * Reprezinta query-ul pentru selectarea tuturor elementelor din tabelul client.
     */
    private final static String findAllStatementString = "SELECT * FROM client";

    /**
     * Metoda care gaseste numele unui client dupa id-ul acestuia.
     * @param clientId Id-ul clientului.
     * @return Numele clientului.
     */

    public static String findById(int clientId) {
        String name=null;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findStatementString);
            findStatement.setInt(1, clientId);
            rs = findStatement.executeQuery();
            rs.next();

            name = rs.getString("name");

        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ClientDAO:findById " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return name;
    }

    /**
     * Metoda care gaseste id-ul unui client dupa numele acestuia.
     * @param name Numele clientului.
     * @return Id-ul clientului.
     */

    public static int findByName(String name) {
        int id=0;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findByNameStatementString);
            findStatement.setString(1, name);
            rs = findStatement.executeQuery();
            if(rs.next()) {
                id=rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ClientDAO:findByName " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return id;
    }

    /**
     * Metoda care genereaza toate elementele din tabelul Client al bazei de date.
     * @param table Pdf-ul in care se va scrie tabelul Client.
     */

    public static void findAll(PdfPTable table) {

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findAllStatementString);
            rs = findStatement.executeQuery();
            while(rs.next()) {
               int id=rs.getInt(1);
               String nume = rs.getString(2);
               String city = rs.getString(3);
                String str = Integer.toString(id);
                table.addCell(str);
               table.addCell(nume);
               table.addCell(city);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ClientDAO:findAll " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    /**
     * Metoda care insereaza un client in tabelul Client din baza de date.
     * @param client Clientul care va fi inserat.
     * @return Returneaza -1 daca clientul nu a fost inserat sau id-ul clientului daca acesta a fost inserat cu succes.
     */

    public static int insert(Client client) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, client.getIdClient());
            insertStatement.setString(2, client.getName());
            insertStatement.setString(3, client.getCity());
            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "ClientDAO:insert " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
        return insertedId;
    }

    /**
     * Metoda care sterge un client din tabelul Client din baza de date.
     * @param client Clientul care va fi sters.
     * @return Returneza -1 daca clientul nu a fost sters sau id-ul clientului care a fost sters daca acesta a fost sters cu succes.
     */

    public static int delete(String client) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement deleteStatement = null;
        int deletedId = -1;
        try {
            deleteStatement = dbConnection.prepareStatement(deleteStatementString, Statement.RETURN_GENERATED_KEYS);
            deleteStatement.setString(1, client);
            deleteStatement.executeUpdate();

            ResultSet rs = deleteStatement.getGeneratedKeys();
            if (rs.next()) {
                deletedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "ClientDAO:delete " + e.getMessage());
        } finally {
            ConnectionFactory.close(deleteStatement);
            ConnectionFactory.close(dbConnection);
        }
        return deletedId;
    }
}
