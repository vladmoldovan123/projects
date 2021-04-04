package modelLayer;

import java.sql.Date;

public class Account {

    private int accountId;
    private String identificationNumber;
    private int clientId;
    private String type;
    private double balance;
    private Date creationDate;


    public Account(int accountId, String identificationNumber, int clientId, String type, double balance, Date creationDate) {
        this.accountId = accountId;
        this.identificationNumber = identificationNumber;
        this.clientId = clientId;
        this.type = type;
        this.balance = balance;
        this.creationDate = creationDate;
    }

    public Account(int accountId, String identificationNumber, int clientId, String type, double balance) {
        this.accountId = accountId;
        this.identificationNumber = identificationNumber;
        this.clientId = clientId;
        this.type = type;
        this.balance = balance;
        this.creationDate = new Date(System.currentTimeMillis());
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}
