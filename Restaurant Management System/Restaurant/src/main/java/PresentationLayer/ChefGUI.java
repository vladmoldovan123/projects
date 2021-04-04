package PresentationLayer;

import BusinessLayer.MenuItem;
import BusinessLayer.Order;

import javax.swing.*;
import java.util.*;

public class ChefGUI implements Observer {
    private JTextArea text=new JTextArea();

    public ChefGUI()  {
        JFrame frame = new JFrame("Chef");

        text.setBounds(50, 50, 100, 25);
        text.setSize(400,300);
        text.setEditable(false);
        frame.add(text);
        frame.setLayout(null);

        frame.setSize(500,400);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }

    @Override
    public void update(Observable o, Object arg) {

        Order order = (Order) ((ArrayList<Object>) arg).get(0);
        ArrayList<MenuItem> items = (ArrayList<MenuItem>) ((ArrayList<Object>) arg).get(1);
        String s="Se pregateste comanda " + order.getOrderId()+ " cu urmatoarele produse : ";
        for (MenuItem i:items) {
            s=s+i.getName()+",";
        }
        s=s.substring(0,s.length()-1);
        s=s+"\n";
        text.append(s);
    }
}
