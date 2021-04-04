package BusinessLayer;

import java.util.ArrayList;

public abstract class MenuItem implements java.io.Serializable{

    public MenuItem() {
    }

    public abstract String getName();
    public abstract double computePrice();

    public abstract ArrayList<MenuItem> getItems();

    public abstract void setItems(ArrayList<MenuItem> items);

    public abstract void setPrice(double p);
}
