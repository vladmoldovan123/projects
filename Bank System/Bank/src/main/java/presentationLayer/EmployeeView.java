package presentationLayer;

import businessLayer.EmployeeController;
import modelLayer.Client;
import modelLayer.Employee;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class EmployeeView {

    private EmployeeController employeeController;

    public JFrame frame;

    private JTable table = new JTable();
    private JScrollPane pane;

    private JTextField name = new JTextField();
    private JTextField identityCardNumber =new JTextField();
    private JTextField cnp= new JTextField();
    private JTextField address= new JTextField();
    private JTextField email = new JTextField();

    private JButton addBtn = new JButton("Create");
    private JButton deleteBtn = new JButton("Delete");
    private JButton selectBtn = new JButton("Select");
    private JButton updateBtn = new JButton("Update");
    private JButton viewBtn = new JButton("View accounts");
    private JButton transferBtn = new JButton("Transfer");


    private JLabel nameLbl = new JLabel("Name:");
    private JLabel identityCardNumberLbl = new JLabel("Identity Card Number:");
    private JLabel cnpLbl = new JLabel("CNP:");
    private JLabel emailLbl = new JLabel("Email:");
    private JLabel addressLbl = new JLabel("Address:");





    String selectedName;
    String selectedCnp;
    String selectedIdentityCardNumber;
    String selectedAddress;
    String selectedEmail;

    DefaultTableModel model = new DefaultTableModel();
    Object[] row = new Object[5];

    private final Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

    public EmployeeView()
    {
        employeeController = new EmployeeController();
        frame = new JFrame("Bank system");
        initialize();
        frame.setVisible(true);
    }

    public void initialize()
    {
        Object[] columns = {"Name","Identity Card Number","Cnp","Address","E-mail"};

        model.setColumnIdentifiers(columns);

        table.setModel(model);
        table.setBackground(Color.LIGHT_GRAY);
        table.setForeground(Color.black);
        Font font = new Font("",1,14);
        table.setFont(font);
        table.setRowHeight(30);
        pane = new JScrollPane(table);
        pane.setBounds(5, 5, 1000, 350);

        nameLbl.setBounds(1200,30,80,30);
        name.setBounds(1270,35,100,20);

        identityCardNumberLbl.setBounds(1140,70,140,30);
        identityCardNumber.setBounds(1270,75,100,20);

        cnpLbl.setBounds(1200,110,80,30);
        cnp.setBounds(1270,115,100,20);

        addressLbl.setBounds(1200,150,80,30);
        address.setBounds(1270,155,100,20);

        emailLbl.setBounds(1200,190,80,30);
        email.setBounds(1270,195,100,20);

        addBtn.setBounds(1235,250,100,30);
        updateBtn.setBounds(1235,285,100,30);
        deleteBtn.setBounds(1235,320,100,30);
        selectBtn.setBounds(1050,110,100,30);
        viewBtn.setBounds(1040,145,120,30);
        transferBtn.setBounds(1050,180,100,30);


        frame.setLayout(null);

        frame.add(pane);
        frame.add(name);
        frame.add(nameLbl);
        frame.add(identityCardNumber);
        frame.add(identityCardNumberLbl);
        frame.add(cnp);
        frame.add(cnpLbl);
        frame.add(email);
        frame.add(emailLbl);
        frame.add(address);
        frame.add(addressLbl);
        frame.add(addBtn);
        frame.add(updateBtn);
        frame.add(deleteBtn);
        frame.add(selectBtn);
        frame.add(viewBtn);
        frame.add(transferBtn);



        ArrayList<Client> clients = employeeController.getClients();
        if(clients!=null)
        {
            for (Client client:clients) {
                row[0]=client.getName();
                row[1]=client.getIdentityCardNumber();
                row[2]=client.getCnp();
                row[3]=client.getAddress();
                row[4]=client.getEmail();
                model.addRow(row);
            }
        }

        frame.setSize(1500,400);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setLocation(dim.width / 2 - frame.getSize().width / 2, dim.height / 2 - frame.getSize().height / 2);

        table.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){

                int i = table.getSelectedRow();

                selectedName=model.getValueAt(i,0).toString();
                selectedIdentityCardNumber=model.getValueAt(i,1).toString();
                selectedCnp=model.getValueAt(i,2).toString();
                selectedAddress=model.getValueAt(i,3).toString();
                selectedEmail=model.getValueAt(i,4).toString();
            }
        });

        selectBtn.addActionListener( e -> {
            name.setText(selectedName);
            identityCardNumber.setText(selectedIdentityCardNumber);
            cnp.setText(selectedCnp);
            address.setText(selectedAddress);
            email.setText(selectedEmail);
        });

        viewBtn.addActionListener( e -> {
            employeeController.viewAccount(selectedCnp);
        });

        transferBtn.addActionListener( e -> {
            employeeController.transfer(selectedCnp);
        });

        updateBtn.addActionListener( e -> {
            employeeController.updateClient(name.getText(),identityCardNumber.getText(),cnp.getText(),address.getText(),email.getText(),selectedCnp);
            updateTable();
            identityCardNumber.setText("");
            address.setText("");
            name.setText("");
            email.setText("");
            cnp.setText("");

        });

        addBtn.addActionListener( e -> {
            employeeController.insertClient(name.getText(),identityCardNumber.getText(),cnp.getText(),address.getText(),email.getText());
            updateTable();
            identityCardNumber.setText("");
            address.setText("");
            name.setText("");
            email.setText("");
            cnp.setText("");
        });

        deleteBtn.addActionListener( e -> {
            employeeController.deleteClient(cnp.getText());
            updateTable();
            identityCardNumber.setText("");
            address.setText("");
            name.setText("");
            email.setText("");
            cnp.setText("");
        });

    }

    private void updateTable() {
        model.setRowCount(0);
        if(employeeController.getClients()!=null) {
            ArrayList<Client> clients = employeeController.getClients();
            for (Client client : clients ){
                row[0]=client.getName();
                row[1]=client.getIdentityCardNumber();
                row[2]=client.getCnp();
                row[3]=client.getAddress();
                row[4]=client.getEmail();
                model.addRow(row);
            }
        }
    }
}
