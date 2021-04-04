package DataLayer;

import BusinessLayer.*;

import java.io.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

public class RestaurantSerializator {
    private ArrayList<MenuItem> menu;
    private HashMap<Order, Collection<MenuItem>> map;
    private static String filename;


    public RestaurantSerializator(String filename)
    {
        this.filename=filename;
    }

    public void deserialize() throws IOException, ClassNotFoundException {
        File file = new File(filename);
        if(file.exists())
        {
            FileInputStream f = new FileInputStream(filename);
            ObjectInputStream in = new ObjectInputStream(f);

            if(f.available()!=0)
            {
                menu =(ArrayList<MenuItem>) in.readObject();
            }
            if(f.available()!=0)
            {
                map=(HashMap<Order, Collection<MenuItem>>) in.readObject();
                if(map!=null)
                    Restaurant.setNrOrder(map.size());
            }
            in.close();
            f.close();
        }
    }

    public static void serialize(Restaurant r) throws IOException {
        FileOutputStream file = new FileOutputStream(filename);
        ObjectOutputStream out = new ObjectOutputStream(file);
        out.writeObject(r.getMenu());
        out.writeObject(r.getMap());
        out.close();
        file.close();
    }

    public ArrayList<MenuItem> getMenu() {
        return menu;
    }

    public HashMap<Order, Collection<MenuItem>> getMap() {
        return map;
    }
}