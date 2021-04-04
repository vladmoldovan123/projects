package StarterLayer;

import BusinessLayer.*;
import DataLayer.RestaurantSerializator;
import PresentationLayer.AdministratorGUI;
import PresentationLayer.RestaurantManagementGUI;
import PresentationLayer.WaiterGUI;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

public class Start {

    public static void main(String[] args) throws IOException, ClassNotFoundException {

        RestaurantSerializator s= new RestaurantSerializator(args[0]);
        s.deserialize();
        ArrayList<MenuItem> menu=s.getMenu();
        HashMap<Order, Collection<MenuItem>> map=s.getMap();
        Restaurant r= new Restaurant(menu,map);
        RestaurantManagementGUI g2 = new RestaurantManagementGUI(r);
    }
}
