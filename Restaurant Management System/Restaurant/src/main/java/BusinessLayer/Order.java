package BusinessLayer;

import java.io.Serializable;
import java.util.Date;

public class Order implements Serializable {
    private int orderId;
    private Date date;
    private int table;

    public Order(int orderId, Date date, int table) {
        this.orderId = orderId;
        this.date = date;
        this.table = table;
    }

    public int getOrderId() {
        return orderId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getTable() {
        return table;
    }

    public void setTable(int table) {
        this.table = table;
    }

    @Override
    public int hashCode() {
        return orderId ;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", date=" + date +
                ", table=" + table +
                '}';
    }
}
