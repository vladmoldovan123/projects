package connectionLayer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Clasa realizeaza conexiunea proiectului la baza de date.
 */

public class ConnectionFactory {

    private static final Logger LOGGER = Logger.getLogger(ConnectionFactory.class.getName());
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    /**
     * locatia bazei de date
     */
    private static final String DBURL = "jdbc:mysql://localhost:3306/tema1";
    /**
     * user-ul bazei de date
     */
    private static final String USER = "root";
    /**
     * parola bazei de date
     */
    private static final String PASS = "admin";


    /**
     * Constructorul clasei.
     */
    public ConnectionFactory() {
        try {
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    /**
     * Metoda pentru obtinerea conexiunuii la baza de date.
     * @return Returneaza conexiunea la baza de date.
     */
    public static Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(DBURL, USER, PASS);
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "An error occured while trying to connect to the database");
            e.printStackTrace();
        }
        return connection;
    }

    /**
     * Metoda pentru inchiderea conexiunii la baza de date.
     * @param connection Conexiunea la baza de date.
     */
    public static void close(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "An error occured while trying to close the connection");
            }
        }
    }

    /**
     * Metoda pentru inchiderea unui statement.
     * @param statement Statement-ul
     */
    public static void close(Statement statement) {
        if (statement != null) {
            try {
                statement.close();
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "An error occured while trying to close the statement");
            }
        }
    }

}