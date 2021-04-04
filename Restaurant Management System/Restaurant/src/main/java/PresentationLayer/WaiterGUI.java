package PresentationLayer;

import BusinessLayer.MenuItem;
import BusinessLayer.Order;
import BusinessLayer.Restaurant;
import DataLayer.RestaurantSerializator;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

public class WaiterGUI {

    public WaiterGUI(Restaurant r){

        JFrame frame = new JFrame("Waiter");
        JTable table = new JTable();
        JTable table2 = new JTable();
        JTable table3 = new JTable();

        Object[] columns = {"OrderId","Date","Table"};
        Object[] columns2 = {"Name","Price"};
        DefaultTableModel model = new DefaultTableModel();
        DefaultTableModel model2 = new DefaultTableModel();
        DefaultTableModel model3 = new DefaultTableModel();
        model.setColumnIdentifiers(columns);
        model2.setColumnIdentifiers(columns2);
        model3.setColumnIdentifiers(columns2);

        table.setModel(model);
        table2.setModel(model2);
        table3.setModel(model3);

        table.setBackground(Color.LIGHT_GRAY);
        table.setForeground(Color.black);
        Font font = new Font("",1,22);
        table.setFont(font);
        table.setRowHeight(30);

        JTextField textTable = new JTextField();
        JTextField selectedId = new JTextField();
        JTextField selectedName = new JTextField();
        JTextField selectedPrice = new JTextField();

        JLabel labelTable = new JLabel("Table:");

        JButton btnAdd = new JButton("Create");
        JButton btnGenerate = new JButton("Generate Bill");
        JButton btnSelect = new JButton("Select");
        JButton btnSave = new JButton("Save");
        JButton btnBack = new JButton("Back");

        textTable.setBounds(70, 220, 100, 25);
        labelTable.setBounds(20,220,100,25);

        btnAdd.setBounds(170, 220, 100, 25);
        btnGenerate.setBounds(150, 265, 150, 25);

        btnSelect.setBounds(950, 80, 100, 25);
        btnSave.setBounds(700, 300, 100, 25);
        btnBack.setBounds(600, 300, 100, 25);

        JScrollPane pane = new JScrollPane(table);
        JScrollPane pane2 = new JScrollPane(table2);
        JScrollPane pane3 = new JScrollPane(table3);
        pane.setBounds(0, 0, 400, 200);
        pane2.setBounds(550, 0, 400, 200);
        pane3.setBounds(1050, 0, 400, 200);

        frame.setLayout(null);

        frame.add(pane);
        frame.add(pane2);
        frame.add(pane3);

        frame.add(textTable);
        frame.add(labelTable);

        frame.add(btnAdd);
        frame.add(btnGenerate);
        frame.add(btnSelect);
        frame.add(btnSave);
        frame.add(btnBack);

        Object[] row = new Object[3];
        Object[] row2 = new Object[2];
        Object[] row3 = new Object[2];

        if(r.getOrders()!=null)
        { ArrayList<Order> orders = r.getOrders();
            for (Order o: orders) {
                row[0]=o.getOrderId();
                DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
                String testDateString = df2.format(o.getDate());
                row[1]=testDateString;
                row[2]=o.getTable();
                model.addRow(row);
            }}

        ArrayList<MenuItem> items = r.getMenu();
        for (MenuItem m:items) {
            row2[0]=m.getName();
            row2[1]=m.computePrice();
            model2.addRow(row2);
        }

        btnBack.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                RestaurantManagementGUI g=new RestaurantManagementGUI(r);
                frame.setVisible(false);

            }
        } );

        btnSave.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    RestaurantSerializator.serialize(r);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        });

        btnGenerate.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    r.generateBill(selectedId.getText());
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

            }
        });

        btnSelect.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                row3[0]=selectedName.getText();
                row3[1]=selectedPrice.getText();
                model3.addRow(row3);
            }
        });

        btnAdd.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                model.setRowCount(0);
                ArrayList<MenuItem> items = new ArrayList<MenuItem>();
                for (int i = 0; i < model3.getRowCount(); i++)
                {
                    String a = model3.getValueAt(i, 0).toString();
                    items.add(r.findItem(a));
                }
                model3.setRowCount(0);
                r.createOrder(textTable.getText(),items);
                ArrayList<Order> orders = r.getOrders();
                for (Order o: orders) {
                    row[0]=o.getOrderId();
                    DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
                    String testDateString = df2.format(o.getDate());
                    row[1]=testDateString;
                    row[2]=o.getTable();
                    model.addRow(row);
                }
            }
        });

        table.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){
                int i = table.getSelectedRow();
                selectedId.setText(model.getValueAt(i, 0).toString());
            }
        });

        table2.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){
                int j = table2.getSelectedRow();
                selectedName.setText(model2.getValueAt(j, 0).toString());
                selectedPrice.setText(model2.getValueAt(j, 1).toString());
            }
        });

        frame.setSize(1500,400);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);

    }
}