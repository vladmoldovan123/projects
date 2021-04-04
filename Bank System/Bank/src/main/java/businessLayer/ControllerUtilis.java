package businessLayer;

import javax.swing.*;

public class ControllerUtilis {

    public static void createSwingErrorMessage(String message){
        JOptionPane.showMessageDialog(null,
                message,
                "Error",
                JOptionPane.ERROR_MESSAGE);
    }
}
