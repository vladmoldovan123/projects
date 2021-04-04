package presentationLayer;

import businessLayer.AccountTransferController;
import modelLayer.Account;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class AccountTransferView {

    private AccountTransferController accountTransferController;
    private int clientId;

    public JFrame frame;

    private JTable table = new JTable();
    private JTable table2 = new JTable();

    private JScrollPane pane;
    DefaultTableModel model = new DefaultTableModel();
    Object[] row = new Object[3];

    private JScrollPane pane2;
    DefaultTableModel model2 = new DefaultTableModel();
    Object[] row2 = new Object[3];

    String selectedIdentificationNumber1;
    String selectedType1;
    String selectedBalance1;

    String selectedIdentificationNumber2;
    String selectedType2;
    String selectedBalance2;

    private JLabel amountLbl = new JLabel("Amount:");
    private JTextField amount = new JTextField();

    private JButton confirm = new JButton("Confirm");

    private final Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

    public AccountTransferView(int clientId)
    {
        this.clientId=clientId;
        accountTransferController=new AccountTransferController();
        frame = new JFrame("Bank system");
        initialize();
        frame.setVisible(true);
    }

    public void initialize()
    {
        Object[] columns = {"Identification Number","Type","Balance"};

        model.setColumnIdentifiers(columns);

        table.setModel(model);
        table.setBackground(Color.LIGHT_GRAY);
        table.setForeground(Color.black);
        Font font = new Font("",1,14);
        table.setFont(font);
        table.setRowHeight(30);
        pane = new JScrollPane(table);
        pane.setBounds(5, 5, 450, 350);

        Object[] columns2 = {"Identification Number","Type","Balance"};

        model2.setColumnIdentifiers(columns2);

        table2.setModel(model2);
        table2.setBackground(Color.LIGHT_GRAY);
        table2.setForeground(Color.black);
        table2.setFont(font);
        table2.setRowHeight(30);
        pane2 = new JScrollPane(table2);
        pane2.setBounds(1000, 5, 450, 350);

        amountLbl.setBounds(650,100,80,30);
        amount.setBounds(720,100,80,30);
        confirm.setBounds(700,150,80,30);

        frame.setLayout(null);

        frame.add(pane);
        frame.add(pane2);
        frame.add(amountLbl);
        frame.add(amount);
        frame.add(confirm);

        frame.setSize(1500,400);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setLocation(dim.width / 2 - frame.getSize().width / 2, dim.height / 2 - frame.getSize().height / 2);

        ArrayList<Account> accounts = accountTransferController.getAccounts(clientId);
        if(accounts!=null)
        {
            for (Account account:accounts) {
                row[0]=account.getIdentificationNumber();
                row[1]=account.getType();
                row[2]=account.getBalance();
                model.addRow(row);
            }
        }

        ArrayList<Account> accounts2 = accountTransferController.getAllAccounts();
        if(accounts!=null)
        {
            for (Account account2:accounts2) {
                row2[0]=account2.getIdentificationNumber();
                row2[1]=account2.getType();
                row2[2]=account2.getBalance();
                model2.addRow(row2);
            }
        }

        table.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){

                int i = table.getSelectedRow();

                selectedIdentificationNumber1=model.getValueAt(i,0).toString();
                selectedType1=model.getValueAt(i,1).toString();
                selectedBalance1=model.getValueAt(i,2).toString();
            }
        });

        table2.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseClicked(MouseEvent e){

                int i = table2.getSelectedRow();

                selectedIdentificationNumber2=model2.getValueAt(i,0).toString();
                selectedType2=model2.getValueAt(i,1).toString();
                selectedBalance2=model2.getValueAt(i,2).toString();
            }
        });

        confirm.addActionListener( e -> {
            accountTransferController.transfer(selectedIdentificationNumber1,selectedIdentificationNumber2,amount.getText());
            updateTable();
            updateTable2();
            amount.setText("");
        });
    }

    private void updateTable() {
        model.setRowCount(0);
        if(accountTransferController.getAccounts(clientId)!=null) {
            ArrayList<Account> accounts = accountTransferController.getAccounts(clientId);
            for (Account account:accounts){
                row[0]=account.getIdentificationNumber();
                row[1]=account.getType();
                row[2]=account.getBalance();
                model.addRow(row);
            }
        }
    }

    private void updateTable2() {
        model2.setRowCount(0);
        if(accountTransferController.getAllAccounts()!=null) {
            ArrayList<Account> accounts2 = accountTransferController.getAllAccounts();
            for (Account account2:accounts2){
                row2[0]=account2.getIdentificationNumber();
                row2[1]=account2.getType();
                row2[2]=account2.getBalance();
                model2.addRow(row2);
            }
        }
    }
}
