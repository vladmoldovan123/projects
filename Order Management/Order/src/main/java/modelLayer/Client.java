package modelLayer;

/**
 * Aceasta clasa reprezinta modelul pentru tabeleul client din baza de date.
 */
public class Client {
    /**
     * id-ul clientului
     */
    private int clientId;
    /**
     * numele clientului
     */
    private String name;
    /**
     * orasul din care este clientului
     */
    private String city;

    /**
     * Constructorul acestei clase.
     * @param clientId Id-ul noului client.
     * @param name Numele noului client.
     * @param city Orasul noului client.
     */
    public Client(int clientId,String name, String city) {
        this.clientId=clientId;
        this.name = name;
        this.city = city;
    }

    /**
     * Metoda pentru obtinerea numelui unui client.
     * @return Numele clientului.
     */

    public String getName() {
        return name;
    }

    /**
     * Metoda pentru obtinerea orasului unui client.
     * @return Orasul clientului.
     */
    public String getCity() {
        return city;
    }

    /**
     * Metoda pentru obtinerea  id-ului unui client.
     * @return Id-ul clientului.
     */
    public int getIdClient() {
        return clientId;
    }
}
