package modelLayer;

public class Client {
    private int clientId;
    private String name;
    private int identityCardNumber;
    private String cnp;
    private String address;
    private String email;

    public Client(int clientId, String name, int identityCardNumber, String cnp, String address, String email) {
        this.clientId = clientId;
        this.name = name;
        this.identityCardNumber = identityCardNumber;
        this.cnp = cnp;
        this.address = address;
        this.email = email;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public int getIdentityCardNumber() {
        return identityCardNumber;
    }

    public void setIdentityCardNumber(int identityCardNumber) {
        this.identityCardNumber = identityCardNumber;
    }

    public String getCnp() {
        return cnp;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
