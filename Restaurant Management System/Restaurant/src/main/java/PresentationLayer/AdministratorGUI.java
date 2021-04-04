package PresentationLayer;

import BusinessLayer.BaseProduct;
import BusinessLayer.CompositeProduct;
import BusinessLayer.MenuItem;
import BusinessLayer.Restaurant;
import DataLayer.RestaurantSerializator;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.util.ArrayList;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

public class AdministratorGUI {

    public AdministratorGUI(Restaurant r){
        JFrame frame = new JFrame("Administrator");
        JTable table = new JTable();
        JTable table2 = new JTable();
        JTable table3 = new JTable();
        JTable table4 = new JTable();

        Object[] columns = {"Produs","Pret"};
        DefaultTableModel model = new DefaultTableModel();
        DefaultTableModel model2 = new DefaultTableModel();
        DefaultTableModel model3 = new DefaultTableModel();
        DefaultTableModel model4 = new DefaultTableModel();
        model.setColumnIdentifiers(columns);
        model2.setColumnIdentifiers(columns);
        model3.setColumnIdentifiers(columns);
        model4.setColumnIdentifiers(columns);

        table.setModel(model);
        table2.setModel(model2);
        table3.setModel(model3);
        table4.setModel(model4);
        table.setBackground(Color.LIGHT_GRAY);
        table.setForeground(Color.black);
        Font font = new Font("",1,22);
        table.setFont(font);
        table.setRowHeight(30);

        JTextField textNume = new JTextField();
        JTextField textPret = new JTextField();
        JTextField SelectNume = new JTextField();
        JTextField SelectPret = new JTextField();
        JTextField textCreate = new JTextField();
        JTextField previousRow = new JTextField();
        JTextField deleteCompositeProduct = new JTextField();

        JLabel labelNume = new JLabel("Name:");
        JLabel labelPret = new JLabel("Price:");
        JLabel labelUpdate = new JLabel("New Price:");
        JLabel labelNewName = new JLabel("New Name:");

        JButton btnAdd = new JButton("Add");
        JButton btnDelete = new JButton("Delete");
        JButton btnUpdate = new JButton("Update");
        JButton btnSelect = new JButton("Select");
        JButton btnModify = new JButton("Modify");
        JButton btnDelete2 = new JButton("Delete");
        JButton btnAdd2 = new JButton("Add");
        JButton btnCreateCompositProduct = new JButton("Create");
        JButton btnSave = new JButton("Save");
        JButton btnBack = new JButton("Back");

        textNume.setBounds(130, 220, 100, 25);
        textPret.setBounds(130, 250, 100, 25);
        textCreate.setBounds(650, 250, 100, 25);

        labelNume.setBounds(75,220,100,25);
        labelPret.setBounds(75,250,100,25);
        labelUpdate.setBounds(1125,250,100,25);
        labelNewName.setBounds(575,250,100,25);

        btnAdd.setBounds(250, 220, 100, 25);
        btnUpdate.setBounds(1300, 250, 100, 25);
        btnDelete.setBounds(250, 250, 100, 25);
        btnSelect.setBounds(425, 80, 100, 25);
        btnModify.setBounds(425, 120, 100, 25);
        btnDelete2.setBounds(1200, 220, 100, 25);
        btnAdd2.setBounds(1200, 250, 100, 25);
        btnSave.setBounds(700, 300, 100, 25);
        btnBack.setBounds(600, 300, 100, 25);
        btnCreateCompositProduct.setBounds(750, 250, 100, 25);

        JScrollPane pane = new JScrollPane(table);
        JScrollPane pane2 = new JScrollPane(table2);
        JScrollPane pane3 = new JScrollPane(table3);
        JScrollPane pane4 = new JScrollPane(table4);
        pane.setBounds(0, 0, 400, 200);
        pane2.setBounds(550, 0, 400, 200);
        pane3.setBounds(1050, 0, 400, 200);
        pane4.setBounds(1050, 0, 400, 200);
        frame.setLayout(null);

        frame.add(pane);
        frame.add(pane2);
        frame.add(pane3);
        frame.add(pane4);

        frame.add(textNume);
        frame.add(textPret);
        frame.add(textCreate);

        frame.add(labelNume);
        frame.add(labelPret);
        frame.add(labelNewName);

        frame.add(btnAdd);
        frame.add(btnDelete);
        frame.add(btnUpdate);
        frame.add(btnSelect);
        frame.add(btnCreateCompositProduct);
        frame.add(btnModify);
        frame.add(btnDelete2);
        frame.add(btnAdd2);
        frame.add(btnSave);
        frame.add(btnBack);

        Object[] row = new Object[2];
        Object[] row2 = new Object[2];
        Object[] row3 = new Object[2];
        Object[] row4 = new Object[2];
        ArrayList<MenuItem> items = r.getMenu();
        if(items!=null)
        {
            for (MenuItem m:items) {
                row[0]=m.getName();
                row[1]=m.computePrice();
                model.addRow(row);
            }
        }

        JTextField updateNume = new JTextField();
        JTextField updatePrice = new JTextField();
        updateNume.setBounds(1200, 220, 100, 25);
        updatePrice.setBounds(1200, 250, 100, 25);
        frame.add(updatePrice);
        frame.add(labelUpdate);
        updatePrice.setVisible(false);
        pane3.setVisible(false);
        pane4.setVisible(false);
        btnAdd2.setVisible(false);
        btnDelete2.setVisible(false);
        labelUpdate.setVisible(false);
        btnUpdate.setVisible(false);

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

        btnModify.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                MenuItem newItem = r.getItem(SelectNume.getText());
                model3.setRowCount(0);
                model4.setRowCount(0);
                if(newItem instanceof BaseProduct)
                {
                    labelUpdate.setVisible(true);
                    btnUpdate.setVisible(true);
                    pane4.setVisible(false);
                    pane3.setVisible(true);
                    updatePrice.setVisible(true);
                    btnAdd2.setVisible(false);
                    btnDelete2.setVisible(false);
                    row3[0] = SelectNume.getText();
                    row3[1] = SelectPret.getText();
                    model3.addRow(row3);
                }
                if(newItem instanceof CompositeProduct)
                {
                    labelUpdate.setVisible(false);
                    btnUpdate.setVisible(false);
                    updatePrice.setVisible(false);
                    pane3.setVisible(false);
                    pane4.setVisible(true);
                    btnAdd2.setVisible(true);
                    btnDelete2.setVisible(true);
                    for (MenuItem mi : ((CompositeProduct) newItem).getItems()) {
                        previousRow.setText(textNume.getText());
                        String p = toString().valueOf(mi.computePrice());
                        row4[0] = mi.getName();
                        row4[1] = p;
                        model4.addRow(row4);
                    }
                }
            }
        });

        btnSelect.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {
                row2[0] = SelectNume.getText();
                row2[1] = SelectPret.getText();
                model2.addRow(row2);
            }
        });

        btnCreateCompositProduct.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                ArrayList<String> data = new ArrayList<String>();
                for (int count = 0; count < model2.getRowCount(); count++) {
                    data.add(model2.getValueAt(count, 0).toString());
                }
                ArrayList<MenuItem> newItems = new ArrayList<MenuItem>();
                for (MenuItem m: r.getMenu()) {
                    for (String s: data) {
                        if(s.equals(m.getName()))
                        {
                            newItems.add(m);
                        }
                    }
                }
                MenuItem compositProduct = new CompositeProduct(textCreate.getText(),newItems);
                r.addItem(compositProduct);
                double p = compositProduct.computePrice();
                String p2 =Double.toString(p);
                row[0]=textCreate.getText();
                row[1]= p2;
                model.addRow(row);
                for(int i = model2.getRowCount() - 1; i >=0; i--)
                {
                    model2.removeRow(i);
                }
                textCreate.setText("");
            }
        });

        btnAdd.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                row[0] = textNume.getText();
                row[1] = textPret.getText();
                double price = Double.parseDouble(textPret.getText());
                MenuItem baseProduct = new BaseProduct(textNume.getText(),price);
                r.addItem(baseProduct);

                model.addRow(row);
            }
        });

        btnDelete2.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {
                int i = table4.getSelectedRow();
                String name = model4.getValueAt(i, 0).toString();
                MenuItem newItem = r.getItem(SelectNume.getText());
                if(i >= 0){
                    r.deleteIngredient(newItem,name);
                    model4.removeRow(i);
                }
                else{
                    System.out.println("Delete Error");
                }
                model.setRowCount(0);
                ArrayList<MenuItem> items = r.getMenu();
                if(items!=null)
                {
                    for (MenuItem m:items) {
                        row[0]=m.getName();
                        row[1]=m.computePrice();
                        model.addRow(row);
                    }
                }
                model4.setRowCount(0);
            }
        });

        btnAdd2.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {
               String nameProduct = previousRow.getText();
               r.addIngredient(nameProduct,textNume.getText());
               row4[0]=textNume.getText();
               row4[1]=textPret.getText();
               model4.addRow(row4);
                model.setRowCount(0);
                ArrayList<MenuItem> items = r.getMenu();
                if(items!=null)
                {
                    for (MenuItem m:items) {
                        row[0]=m.getName();
                        row[1]=m.computePrice();
                        model.addRow(row);
                    }
                }
                model4.setRowCount(0);
            }
        });

        btnDelete.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {

                int i = table.getSelectedRow();
                if(i >= 0){
                    r.deleteItem(textNume.getText());
                    model.setRowCount(0);
                    ArrayList<MenuItem> items = r.getMenu();
                    for (MenuItem m:items) {
                        row[0]=m.getName();
                        row[1]=m.computePrice();
                        model.addRow(row);
                    }
                }
                else{
                    System.out.println("Delete Error");
                }
            }
        });

        table.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){

                int i = table.getSelectedRow();

                textNume.setText(model.getValueAt(i, 0).toString());
                SelectNume.setText(model.getValueAt(i, 0).toString());
                SelectPret.setText(model.getValueAt(i, 1).toString());
                textPret.setText(model.getValueAt(i, 1).toString());
            }
        });

        table4.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){
                int i = table4.getSelectedRow();
                deleteCompositeProduct.setText(model.getValueAt(i, 0).toString());
            }
        });

        btnUpdate.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent e) {
                int i = table.getSelectedRow();

                if(i >= 0)
                {
                    model.setValueAt(updatePrice.getText(), i, 1);
                    r.modifyBaseProduct(SelectNume.getText(),updatePrice.getText());
                }
                else{
                    System.out.println("Update Error");
                }
                model.setRowCount(0);
                ArrayList<MenuItem> items = r.getMenu();
                if(items!=null)
                {
                    for (MenuItem m:items) {
                        row[0]=m.getName();
                        row[1]=m.computePrice();
                        model.addRow(row);
                    }
                }

            }
        });
        frame.setSize(1500,400);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);

    }
}