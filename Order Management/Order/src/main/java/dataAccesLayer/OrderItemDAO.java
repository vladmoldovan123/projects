package dataAccesLayer;

import com.itextpdf.text.pdf.PdfPTable;
import connectionLayer.ConnectionFactory;
import modelLayer.OrderItem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Aceasta clasa comunica cu tabelul order_item din baza de date.
 */

public class OrderItemDAO {

    protected static final Logger LOGGER = Logger.getLogger(ProductDAO.class.getName());
    /**
     * Reprezinta query-ul pentru inserarea unui orderItem in tabelul order_item din baza de date.
     */
    private static final String insertStatementString = "INSERT INTO order_item (oiId,clientId,productId,quantity)"
            + " VALUES (?,?,?,?)";
    /**
     * Reprezinta query-ul pentru selectarea tuturor elementelor din tabelul order_item din baza de date.
     */
    private final static String findAllStatementString = "SELECT * FROM order_item";
    /**
     * Reprezinta query-ul pentru stergerea unui orderItem dupa id-ul specificat.
     */
    private final static String deleteStatementString = "DELETE FROM order_item where clientId = ?";

    /**
     * Metoda care insereaza un orderItem in tabelul order_item al bazei de date.
     * @param item orderItem-ul care va fi introdus.
     * @return Returneaza -1 daca inserarea nu a reusit sau id-ul orderItem daca inserarea a reusit.
     */
    public static int insert(OrderItem item) {
        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, item.getOiId());
            insertStatement.setInt(2, item.getClientId());
            insertStatement.setInt(3, item.getProductId());
            insertStatement.setInt(4, item.getQuantity());
            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "OrderItemDAO:insert " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
        return insertedId;
    }

    /**
     * Metoda care genereaza toate elementele din tabelul order_item al bazei de date.
     * @param table Pdf-ul in care se va scrie tabelul order_item.
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
                int clientId = rs.getInt(2);
                int productId = rs.getInt(3);
                int quantity = rs.getInt(4);
                String client = ClientDAO.findById(clientId);
                String product = ProductDAO.findName(productId);
                String str = Integer.toString(id);
                String str2 = Integer.toString(quantity);
                float p = ProductDAO.findById(productId);
                p=p*quantity;
                String str3 = Float.toString(p);
                table.addCell(str);
                table.addCell(client);
                table.addCell(product);
                table.addCell(str2);
                table.addCell(str3);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"OrderItemDAO:findAll" + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    /**
     * Metoda care sterge un orderItem din tabelul order_item al bazei de date dupa un id-specificat.
     * @param id Id-ul specificat dupa care se va face stergerea.
     * @return Returneaza -1 daca stergerea nu a reusit sau id-ul orderItem daca stergerea a reusit.
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
            LOGGER.log(Level.WARNING, "OrderItemDAO:delete " + e.getMessage());
        } finally {
            ConnectionFactory.close(deleteStatement);
            ConnectionFactory.close(dbConnection);
        }
        return deletedId;
    }

}
