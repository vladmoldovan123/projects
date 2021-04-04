package dataAccesLayer;

import com.itextpdf.text.pdf.PdfPTable;
import connectionLayer.ConnectionFactory;
import modelLayer.Product;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Aceasta clasa comunica cu tabelul product din baza de date.
 */
public class ProductDAO {

    protected static final Logger LOGGER = Logger.getLogger(ProductDAO.class.getName());
    /**
     * Query-ul pentru inserarea unui produs in tabelul product din baza de date.
     */
    private static final String insertStatementString = "INSERT INTO product (productId,name,quantity,price)"
            + " VALUES (?,?,?,?)";
    /**
     * Query-ul pentru gasirea id-ului unui produs dupa numele acestuia.
     */
    private final static String findStatementString = "SELECT * FROM product where name = ?";
    /**
     * Query-ul pentru gasirea tuturor elementelor din tabelul order_client al bazei de date.
     */
    private final static String findAllStatementString = "SELECT * FROM product";
    /**
     * Query-ul pentru gasirea unui produs care are id-ul specificat.
     */
    private final static String findPriceStatementString = "SELECT * FROM product where productId = ?";
    /**
     * Query-ul folosit pentru gasirea cantitatii unui produs cu id-ul specificat.
     */
    private final static String findQuantityStatementString = "SELECT * FROM product where productId = ?";
    /**
     * Query-ul folosit pentru stergerea unui produs din tabelul product al bazei de date dupa numele produsului.
     */
    private final static String deleteStatementString = "DELETE FROM product where name = ?";
    /**
     * Query-ul pentru modificarea cantitatii unui produs dupa numele produsului.
     */
    private final static String updateQuantityStatementString = "UPDATE product SET quantity=quantity+? where name=?";

    /**
     * Metoda care modifica pretul unui produs.
     * @param product Numele produsului care isi va modifica cantitatea.
     * @param nr Valoarea care va fi adaugata la cantitatea curenta.
     */
    public static void updateQuantity(String product, int nr) {

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement updateQuantityStatement = null;
        int rs = 0;
        try {
            updateQuantityStatement = dbConnection.prepareStatement(updateQuantityStatementString);
            updateQuantityStatement.setInt(1, nr);
            updateQuantityStatement.setString(2,product );
            rs = updateQuantityStatement.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ProductDAO:updateQuantity " + e.getMessage());
        } finally {
            ConnectionFactory.close(updateQuantityStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    /**
     * Metoda care gaseste id-ul unui produs dupa numele acestuia.
     * @param name Numele produsului.
     * @return Returneaza 0 daca produsul nu a fost gasit sau id-ul produsului daca acesta a fost gasit.
     */
    public static int findByName(String name) {
        int id=0;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findStatement = null;
        ResultSet rs = null;
        try {
            findStatement = dbConnection.prepareStatement(findStatementString);
            findStatement.setString(1, name);
            rs = findStatement.executeQuery();
            if(rs.next()) {
                id=rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ProductDAO:findByName " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
        return id;
    }

    /**
     * Metoda care gaseste pretul unui produs dupa id-ul acestuia.
     * @param id Id-ul produsului.
     * @return Returneaza 0 daca produsul nu exista sau pretul produsului daca acesta a fost gasit.
     */

    public static float findById(int id) {
        float p=0;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findPriceStatement = null;
        ResultSet rs = null;
        try {
            findPriceStatement = dbConnection.prepareStatement(findPriceStatementString);
            findPriceStatement.setInt(1, id);
            rs = findPriceStatement.executeQuery();
            if(rs.next()) {
                p=rs.getFloat(4);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ProductDAO:findById " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findPriceStatement);
            ConnectionFactory.close(dbConnection);
        }
        return p;
    }

    /**
     * Metoda care gaseste numele unui produs dupa id-ul acestuia.
     * @param id Id-ul produsului.
     * @return Returneaza null daca produsul nu a fost gasit sau numele produsului daca acesta a fost gasit.
     */

    public static String findName(int id) {
        String name=null;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findNametatement = null;
        ResultSet rs = null;
        try {
            findNametatement = dbConnection.prepareStatement(findPriceStatementString);
            findNametatement.setInt(1, id);
            rs = findNametatement.executeQuery();
            if(rs.next()) {
                name=rs.getString(2);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ProductDAO:findName " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findNametatement);
            ConnectionFactory.close(dbConnection);
        }
        return name;
    }

    /**
     * Metoda care gaseste cantitatea unui produs dupa id-ul acestuia.
     * @param id Id-ul produsului.
     * @return Returneaza 0 daca produsul nu exista sau cantitatea produsului daca acesta a fost gasit.
     */

    public static int findQuantity(int id) {
        int p=0;

        Connection dbConnection = ConnectionFactory.getConnection();
        PreparedStatement findQuantityStatement = null;
        ResultSet rs = null;
        try {
            findQuantityStatement = dbConnection.prepareStatement(findQuantityStatementString);
            findQuantityStatement.setInt(1, id);
            rs = findQuantityStatement.executeQuery();
            if(rs.next()) {
                p=rs.getInt(3);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ProductDAO:findById " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findQuantityStatement);
            ConnectionFactory.close(dbConnection);
        }
        return p;
    }

    /**
     * Metoda care insereaza un produs in tabelul product al bazei de date.
     * @param product Produsul care va fi inserat.
     * @return Returneaza -1 daca produsul nu a fost inserat sau id-ul produsului daca acesta a fost inserat.
     */

    public static int insert(Product product) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement insertStatement = null;
        int insertedId = -1;
        try {
            insertStatement = dbConnection.prepareStatement(insertStatementString, Statement.RETURN_GENERATED_KEYS);
            insertStatement.setInt(1, product.getProductId());
            insertStatement.setString(2, product.getName());
            insertStatement.setInt(3, product.getQuantity());
            insertStatement.setFloat(4, product.getPrice());
            insertStatement.executeUpdate();

            ResultSet rs = insertStatement.getGeneratedKeys();
            if (rs.next()) {
                insertedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "ProductDAO:insert " + e.getMessage());
        } finally {
            ConnectionFactory.close(insertStatement);
            ConnectionFactory.close(dbConnection);
        }
        return insertedId;
    }

    /**
     * Metoda care genereaza toate elementele tabelului product din baza de date.
     * @param table Pdf-ul in care vor fi inserate elemetele tabelului.
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
                int quantity = rs.getInt(3);
                float price = rs.getFloat(4);
                String str = Integer.toString(id);
                String str2 = Integer.toString(quantity);
                String str3 = Float.toString(price);
                table.addCell(str);
                table.addCell(nume);
                table.addCell(str2);
                table.addCell(str3);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING,"ProductDAO:findByName " + e.getMessage());
        } finally {
            ConnectionFactory.close(rs);
            ConnectionFactory.close(findStatement);
            ConnectionFactory.close(dbConnection);
        }
    }

    /**
     * Metoda care va sterge un produs dupa numele acestuia.
     * @param product Numele produsului.
     * @return Returneaza -1 daca produsul nu a fost sters sau id-ul produsului daca acesta a fost sters.
     */
    public static int delete(String product) {
        Connection dbConnection = ConnectionFactory.getConnection();

        PreparedStatement deleteStatement = null;
        int deletedId = -1;
        try {
            deleteStatement = dbConnection.prepareStatement(deleteStatementString, Statement.RETURN_GENERATED_KEYS);
            deleteStatement.setString(1, product);
            deleteStatement.executeUpdate();

            ResultSet rs = deleteStatement.getGeneratedKeys();
            if (rs.next()) {
                deletedId = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "ProductDAO:delete " + e.getMessage());
        } finally {
            ConnectionFactory.close(deleteStatement);
            ConnectionFactory.close(dbConnection);
        }
        return deletedId;
    }
}
