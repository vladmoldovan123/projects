package presentationLayer;

import businessLayer.LoginAdministratorController;
import businessLayer.LoginEmployeeController;

import javax.swing.*;
import java.awt.*;

public class LoginEmployeeView {
        private LoginEmployeeController loginEmployeeController;

        public JFrame frame;
        private JTextField username;
        private JPasswordField password;
        public JButton btnLogin = new JButton("Login");
        public JLabel lblUsername = new JLabel("Username:");
        public JLabel lblPassword = new JLabel("Password:");
        private final Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

        public LoginEmployeeView() {
            loginEmployeeController = new LoginEmployeeController();
            frame = new JFrame("Bank system");
            initialize();
            frame.setVisible(true);
        }

        public void initialize() {


            username = new JTextField();

            password = new JPasswordField();

            frame.setIconImage(null);

            //JLabel lblNewLabel = new JLabel("Enter your login credentials");
            //lblNewLabel.setFont(new Font("Franklin Gothic Demi", Font.BOLD | Font.ITALIC, 16));

            username.setBounds(120,80,100,20);
            lblUsername.setBounds(50,80,100,20);
            lblPassword.setBounds(50,110,100,20);
            password.setBounds(120,110,100,20);
            btnLogin.setBounds(85,170,100,30);

            frame.setLayout(null);
            frame.add(username);
            frame.add(password);
            frame.add(lblUsername);
            frame.add(lblPassword);
            frame.add(btnLogin);

            frame.setSize(300,300);
            frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
            frame.setLocation(dim.width / 2 - frame.getSize().width / 2, dim.height / 2 - frame.getSize().height / 2);

            btnLogin.addActionListener( e -> {
                loginEmployeeController.login(username.getText(), String.valueOf(password.getPassword()));
                username.setText("");
                password.setText("");
            });

        }

}
