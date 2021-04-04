package presentationLayer;

import businessLayer.SelectUserController;

import javax.swing.*;
import java.awt.*;

public class SelectUserView {

    private SelectUserController selectUserController;

    public JFrame frame;
    public JButton btnAdministrator = new JButton("Administrator");
    public JButton btnEmployee = new JButton("Employee");
    private final Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

    public SelectUserView()
    {
        selectUserController = new SelectUserController();
        frame = new JFrame("Bank system");
        initialize();
        frame.setVisible(true);
    }

    private void initialize() {

        btnAdministrator.setBounds(65,80,150,30);
        btnEmployee.setBounds(65,110,150,30);

        frame.setLayout(null);
        frame.add(btnAdministrator);
        frame.add(btnEmployee);

        frame.setSize(300,300);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setLocation(dim.width / 2 - frame.getSize().width / 2, dim.height / 2 - frame.getSize().height / 2);

        btnAdministrator.addActionListener( e -> {
            selectUserController.loginAdministrator();
            frame.dispose();
        });

        btnEmployee.addActionListener( e -> {
            selectUserController.loginEmployee();
            frame.dispose();
        });


    }

}
