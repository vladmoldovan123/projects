package presentationLayer;

import businessLayer.AdministratorController;
import modelLayer.Employee;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class AdministratorView {

    private AdministratorController administratorController;

    public JFrame frame;

    private JTable table = new JTable();
    private JScrollPane pane;

    private JTextField name = new JTextField();
    private JTextField username =new JTextField();
    private JTextField password= new JTextField();
    private JTextField email = new JTextField();

    private JButton addBtn = new JButton("Create");
    private JButton deleteBtn = new JButton("Delete");
    private JButton selectBtn = new JButton("Select");
    private JButton updateBtn = new JButton("Update");

    private JLabel nameLbl = new JLabel("Name:");
    private JLabel usernameLbl = new JLabel("Username:");
    private JLabel passwordLbl = new JLabel("Password:");
    private JLabel emailLbl = new JLabel("Email:");

    private String selectedName;
    private String selectedUsername;
    private String selectedPassword;
    private String selectedEmail;

    DefaultTableModel model = new DefaultTableModel();
    Object[] row = new Object[4];

    private final Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

    public AdministratorView()
    {
        administratorController = new AdministratorController();
        frame = new JFrame("Bank system");
        initialize();
        frame.setVisible(true);
    }

    private void initialize() {

        Object[] columns = {"Name","Username","Password","E-mail"};

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

        usernameLbl.setBounds(1200,70,80,30);
        username.setBounds(1270,75,100,20);

        passwordLbl.setBounds(1200,110,80,30);
        password.setBounds(1270,115,100,20);

        emailLbl.setBounds(1200,150,80,30);
        email.setBounds(1270,155,100,20);

        addBtn.setBounds(1235,200,100,30);
        updateBtn.setBounds(1235,235,100,30);
        deleteBtn.setBounds(1235,270,100,30);
        selectBtn.setBounds(1050,70,100,30);

        frame.setLayout(null);

        frame.add(pane);
        frame.add(username);
        frame.add(usernameLbl);
        frame.add(name);
        frame.add(nameLbl);
        frame.add(password);
        frame.add(passwordLbl);
        frame.add(email);
        frame.add(emailLbl);
        frame.add(addBtn);
        frame.add(selectBtn);
        frame.add(updateBtn);
        frame.add(deleteBtn);


        ArrayList<Employee> employees = administratorController.getEmployees();
        if(employees!=null)
        {
            for (Employee employee:employees) {
                row[0]=employee.getName();
                row[1]=employee.getUsername();
                row[2]=employee.getPassword();
                row[3]=employee.getEmail();
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
                selectedUsername=model.getValueAt(i,1).toString();
                selectedPassword=model.getValueAt(i,2).toString();
                selectedEmail=model.getValueAt(i,3).toString();
            }
        });

        selectBtn.addActionListener( e -> {
            name.setText(selectedName);
            username.setText(selectedUsername);
            password.setText(selectedPassword);
            email.setText(selectedEmail);
        });

        updateBtn.addActionListener( e -> {
            administratorController.updateEmployee(name.getText(),username.getText(),password.getText(),email.getText(),selectedUsername);
            updateTable();
            username.setText("");
            password.setText("");
            name.setText("");
            email.setText("");
        });

        deleteBtn.addActionListener( e -> {
            administratorController.deleteEmployee(username.getText());
            updateTable();
            username.setText("");
            password.setText("");
            name.setText("");
            email.setText("");
        });

        addBtn.addActionListener( e -> {
            administratorController.insertEmployee(name.getText(),username.getText(),password.getText(),email.getText());
            updateTable();
            username.setText("");
            password.setText("");
            name.setText("");
            email.setText("");
        });



    }
    private void updateTable() {
        model.setRowCount(0);
        if(administratorController.getEmployees()!=null) {
            ArrayList<Employee> employees = administratorController.getEmployees();
            for (Employee employee : employees ){
                row[0]=employee.getName();
                row[1]=employee.getUsername();
                row[2]=employee.getPassword();
                row[3]=employee.getEmail();
                model.addRow(row);
            }
        }
    }
}
