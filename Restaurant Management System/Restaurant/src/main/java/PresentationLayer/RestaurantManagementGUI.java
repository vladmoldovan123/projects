package PresentationLayer;

import BusinessLayer.Restaurant;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class RestaurantManagementGUI {
    public RestaurantManagementGUI(Restaurant r) {
        JFrame frame = new JFrame("Restaurant Management System");

        JButton btnAdministrator = new JButton("Administrator");
        JButton btnWaiter = new JButton("Waiter");
        JButton btnChef = new JButton("Chef");

        btnAdministrator.setBounds(125, 125, 125, 25);
        btnWaiter.setBounds(250, 125, 100, 25);
        btnChef.setBounds(200, 150, 100, 25);

        frame.add(btnAdministrator);
        frame.add(btnWaiter);
        frame.add(btnChef);

        frame.setLayout(null);


        btnAdministrator.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                AdministratorGUI g=new AdministratorGUI(r);
                frame.setVisible(false);

            }
        } );

        btnChef.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                ChefGUI g=new ChefGUI();
                r.addObserver(g);
            }
        } );

        btnWaiter.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                WaiterGUI g=new WaiterGUI(r);
                frame.setVisible(false);

            }
        } );

        frame.setSize(500,400);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);

    }
}
