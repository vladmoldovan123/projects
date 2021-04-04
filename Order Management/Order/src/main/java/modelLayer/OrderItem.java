package modelLayer;

/**
 * Aceasta clasa reprezinta modelul pentru tabeleul order_item din baza de date.
 */
public class OrderItem {
    /**
     * Id-ul pentru orderItem
     */
    private int oiId;
    /**
     * Id-ul clientului
     */
    private int clientId;
    /**
     * Id-ul produsului
     */
    private int productId;
    /**
     * Cantitatea comandata a produsului
     */
    private int quantity;

    /**
     * Constructorul clasei
     * @param oiId Id-ul orderItem a noului obiect
     * @param clientId Id-ul clientului a noului obiect
     * @param productId Id-ul prdosului a noului obiect
     * @param quantity Cantitatea comandata a noului produs
     */

    public OrderItem(int oiId, int clientId, int productId, int quantity) {
        this.oiId = oiId;
        this.clientId = clientId;
        this.productId = productId;
        this.quantity = quantity;
    }

    /**
     * Metoda pentru obtinerea id-ului orderItem.
     * @return Id-ul orderItem
     */
    public int getOiId() {
        return oiId;
    }

    /**
     * Metoda pentru obtinerea id-ului clientului.
     * @return Id-ul clientului
     */
    public int getClientId() {
        return clientId;
    }

    /**
     * Metoda pentru obtinerea id-ului produsului.
     * @return Id-ul Produsului
     */
    public int getProductId() {
        return productId;
    }

    /**
     * Metoda pentru obtinerea cantitatii comandate.
     * @return Cantitatea comandata
     */
    public int getQuantity() {
        return quantity;
    }

}
