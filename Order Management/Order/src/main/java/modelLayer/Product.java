package modelLayer;

/**
 * Aceasta clasa reprezinta modelul pentru tabeleul product din baza de date.
 */

public class Product {

    /**
     * Id-ul produsului
     */
    private int productId;
    /**
     * Numele produsului
     */
    private String name;
    /**
     * Cantitatea produsului
     */
    private int quantity;
    /**
     * Pretul produsului
     */
    private float price;

    /**
     * Constructorul clasei.
     * @param productId Id-ul noului produs.
     * @param name Numele noului produs.
     * @param quantity Cantitatea noului produs.
     * @param price Pretul noului produs.
     */

    public Product(int productId,String name, int quantity, float price) {
        this.productId=productId;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    /**
     * Metoda pentru obtinerea numelui unui produs.
     * @return Numele produsului.
     */
    public String getName() {
        return name;
    }

    /**
     * Metoda pentru obtinerea cantitatii unui produs.
     * @return Cantitatea produsului.
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Metoda pentru obtinerea pretului unui produs.
     * @return Pretul produsului.
     */
    public float getPrice() {
        return price;
    }

    /**
     * Metoda pentru obtinerea id-ului unui produs.
     * @return Id-ul produsului
     */

    public int getProductId() {
        return productId;
    }

}
