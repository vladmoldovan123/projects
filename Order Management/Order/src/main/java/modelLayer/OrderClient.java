package modelLayer;

/**
 * Aceasta clasa reprezinta modelul pentru tabeleul order_client din baza de date.
 */
public class OrderClient {
    /**
     * id-ul pentru orderClient
     */
    private int ocId;
    /**
     * id-ul clientului
     */
    private int clientId;
    /**
     * pretul total al comenzii
     */
    private float price;

    /**
     * Constructorul clasei.
     * @param ocId Id-ul orderClient pentru noul obiect orderClient
     * @param clientId Id-ul clientului pentru noul obiect orderClient
     * @param price Pretul total al noului obiect orderClient
     */

    public OrderClient(int ocId, int clientId, float price) {
        this.ocId = ocId;
        this.clientId = clientId;
        this.price = price;
    }

    /**
     * Metoda pentru obtinerea id-ului unui orderClient.
     * @return Id-ul orderClient.
     */

    public int getOcId() {
        return ocId;
    }

    /**
     * Metoda pentru obtinerea id-ului clienului unui orderClient.
     * @return Id-ul clientului.
     */
    public int getClientId() {
        return clientId;
    }

    /**
     * Metoda pentru obtinerea pretului total unui orderClient
     * @return Pretul total.
     */
    public float getPrice() {
        return price;
    }

}
