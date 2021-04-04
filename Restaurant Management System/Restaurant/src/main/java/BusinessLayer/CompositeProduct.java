package BusinessLayer;

import java.util.ArrayList;

public class CompositeProduct extends MenuItem {
    private String name;
    private ArrayList<MenuItem> items;

    public CompositeProduct(String name, ArrayList<MenuItem> items) {
        this.name = name;
        this.items = items;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<MenuItem> getItems() {
        return items;
    }

    public void setItems(ArrayList<MenuItem> items) {
        this.items = items;
    }

    public double computePrice() {
        double price=0;
        for (MenuItem i:items) {
            price=price+i.computePrice();
        }
        return price;
    }

    public void setPrice(double x)
    {
        return;
    }

    @Override
    public String toString() {
        return "CompositeProduct{" +
                "name='" + name + '\'' +
                ", items=" + items +
                '}';
    }
}
