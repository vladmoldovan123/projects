package presentationLayer;

import businessLayer.AccountController;
import modelLayer.Account;
import modelLayer.Client;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class AccountView {

    private AccountController accountController;
    private int idClient;

    JFrame frame;

    private JTable table = new JTable();

    private JScrollPane pane;
    private JTextField identificationNumber = new JTextField();
    private JTextField type = new JTextField();
    private JTextField balance = new JTextField();
    private JTextField creationDate = new JTextField();

    private JLabel identificationNumberLbl = new JLabel("Identification number:");
    private JLabel typeLbl = new JLabel("Type:");
    private JLabel balanceLbl = new JLabel("Balance:");
    private JLabel creationDateLbl = new JLabel("Creation Date:");

    private JButton addBtn = new JButton("Create");
    private JButton deleteBtn = new JButton("Delete");
    private JButton selectBtn = new JButton("Select");
    private JButton updateBtn = new JButton("Update");

    String selectedIdentificationNumber;
    String selectedType;
    String selectedBalance;

    DefaultTableModel model = new DefaultTableModel();
    Object[] row = new Object[4];

    private JButton payGas= new JButton("Pay Gas");
    private JButton payElectricity = new JButton("Pay Electricity");
    private JButton payInternet = new JButton("Pay Internet");

    private JLabel sumLbl= new JLabel("Amount:");
    private JTextField sum = new JTextField();

    private final Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

    public AccountView(int idClient) {
        this.idClient=idClient;
        accountController = new AccountController();
        frame = new JFrame("Bank system");
        initialize();
        frame.setVisible(true);
    }

    public void initialize()
    {
        Object[] columns = {"Identification Number","Type","Balance","creationDate"};

        model.setColumnIdentifiers(columns);

        table.setModel(model);
        table.setBackground(Color.LIGHT_GRAY);
        table.setForeground(Color.black);
        Font font = new Font("",1,14);
        table.setFont(font);
        table.setRowHeight(30);
        pane = new JScrollPane(table);
        pane.setBounds(5, 5, 1000, 350);

        identificationNumberLbl.setBounds(1130,30,150,30);
        identificationNumber.setBounds(1270,35,100,20);

        typeLbl.setBounds(1200,70,140,30);
        type.setBounds(1270,75,100,20);

        balanceLbl.setBounds(1200,110,80,30);
        balance.setBounds(1270,115,100,20);

        addBtn.setBounds(1235,250,100,30);
        updateBtn.setBounds(1235,285,100,30);
        deleteBtn.setBounds(1235,320,100,30);
        selectBtn.setBounds(1050,110,100,30);

        payElectricity.setBounds(400,400,150,30);
        payInternet.setBounds(400,450,150,30);
        payGas.setBounds(400,500,150,30);
        sumLbl.setBounds(100,450,100,30);
        sum.setBounds(150,450,100,25);



        frame.setLayout(null);

        frame.add(pane);
        frame.add(identificationNumber);
        frame.add(identificationNumberLbl);
        frame.add(type);
        frame.add(typeLbl);
        frame.add(balance);
        frame.add(balanceLbl);
        frame.add(addBtn);
        frame.add(updateBtn);
        frame.add(deleteBtn);
        frame.add(selectBtn);
        frame.add(payGas);
        frame.add(payElectricity);
        frame.add(payInternet);
        frame.add(sum);
        frame.add(sumLbl);

        frame.setSize(1500,600);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setLocation(dim.width / 2 - frame.getSize().width / 2, dim.height / 2 - frame.getSize().height / 2);

        ArrayList<Account> accounts = accountController.getAccounts(idClient);
        if(accounts!=null)
        {
            for (Account account:accounts) {
                row[0]=account.getIdentificationNumber();
                row[1]=account.getType();
                row[2]=account.getBalance();
                row[3]=account.getCreationDate();
                model.addRow(row);
            }
        }

        table.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){

                int i = table.getSelectedRow();

                selectedIdentificationNumber=model.getValueAt(i,0).toString();
                selectedType=model.getValueAt(i,1).toString();
                selectedBalance=model.getValueAt(i,2).toString();
            }
        });

        selectBtn.addActionListener( e -> {
            identificationNumber.setText(selectedIdentificationNumber);
            balance.setText(selectedBalance);
            type.setText(selectedType);
        });

        payElectricity.addActionListener( e -> {
            accountController.pay(selectedIdentificationNumber,"Electricity",sum.getText());
            updateTable();
            sum.setText("");
        });

        payGas.addActionListener( e -> {
            accountController.pay(selectedIdentificationNumber,"Gas",sum.getText());
            updateTable();
            sum.setText("");
        });

        payInternet.addActionListener( e -> {
            accountController.pay(selectedIdentificationNumber,"Internet",sum.getText());
            updateTable();
            sum.setText("");
        });

        addBtn.addActionListener( e -> {
            accountController.insertAccount(identificationNumber.getText(),balance.getText(),idClient,type.getText());
            updateTable();
            identificationNumber.setText("");
            balance.setText("");
            type.setText("");

        });

        deleteBtn.addActionListener( e -> {
            accountController.delete(identificationNumber.getText());
            updateTable();
            identificationNumber.setText("");
            balance.setText("");
            type.setText("");
        });

        updateBtn.addActionListener( e -> {
            accountController.updateAccount(identificationNumber.getText(),type.getText(),balance.getText(),selectedIdentificationNumber);
            updateTable();
            identificationNumber.setText("");
            balance.setText("");
            type.setText("");

        });

    }
    private void updateTable() {
        model.setRowCount(0);
        if(accountController.getAccounts(idClient)!=null) {
            ArrayList<Account> accounts = accountController.getAccounts(idClient);
            for (Account account:accounts){
                row[0]=account.getIdentificationNumber();
                row[1]=account.getType();
                row[2]=account.getBalance();
                row[3]=account.getCreationDate();
                model.addRow(row);
            }
        }
    }
}
