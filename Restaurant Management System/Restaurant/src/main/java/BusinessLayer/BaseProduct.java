package BusinessLayer;

import java.util.ArrayList;

public class BaseProduct extends MenuItem{
    private String name;
    private double price;

    public BaseProduct(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double computePrice() {
        return price;
    }

    @Override
    public ArrayList<MenuItem> getItems() {
        return null;
    }

    @Override
    public void setItems(ArrayList<MenuItem> items) {

    }

    @Override
    public String toString() {
        return "BaseProduct{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
