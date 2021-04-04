import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

class PolinomView extends JFrame {
    private JTextField pol1TextF = new JTextField(20);
    private JTextField pol2TextF = new JTextField(20);
    private JTextField rezultatTextF     = new JTextField(40);
    private JButton    adunareBtn = new JButton("Adunare");
    private JButton    scadereBtn = new JButton("Scadere");
    private JButton    inmultireBtn = new JButton("Inmultire");
    private JButton    derivareBtn = new JButton("Derivare");
    private JButton    integrareBtn = new JButton("Integrare");
    private JButton    clearBtn    = new JButton("Clear");

    private Operatii model;


    PolinomView(Operatii model) {
        this.model = model;
        this.model.setValue(Operatii.INITIAL_VALUE);

        rezultatTextF.setEditable(false);

        JPanel content = new JPanel();
        JPanel content2 = new JPanel();
        JPanel content3 = new JPanel();
        JPanel content4 = new JPanel();
        JPanel content41 = new JPanel();
        JPanel content42 = new JPanel();
        JPanel content43 = new JPanel();
        content.setLayout(new FlowLayout());
        content2.setLayout(new FlowLayout());
        content3.setLayout(new BorderLayout());
        content4.setLayout(new BorderLayout());
        content41.setLayout(new FlowLayout());
        content42.setLayout(new FlowLayout());
        content43.setLayout(new FlowLayout());
        content.add(new JLabel("Polinom 1"));
        content.add(pol1TextF);
        content.add(new JLabel("Polinom 2"));
        content.add(pol2TextF);
        content41.add(adunareBtn);
        content41.add(scadereBtn);
        content43.add(inmultireBtn);
        content42.add(derivareBtn);
        content42.add(integrareBtn);
        content2.add(new JLabel("Rezultat"));
        content2.add(rezultatTextF);
        content2.add(clearBtn);

        content4.add(content41,BorderLayout.NORTH);
        content4.add(content42,BorderLayout.CENTER);
        content4.add(content43,BorderLayout.SOUTH);

        content3.add(content,BorderLayout.NORTH);
        content3.add(content4,BorderLayout.CENTER);
        content3.add(content2,BorderLayout.SOUTH);

        this.setContentPane(content3);

        this.pack();

        this.setTitle("Calculator de polinoame");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    void reset() {
        pol1TextF.setText(Operatii.INITIAL_VALUE);
    }

    String getPol1() {
        return pol1TextF.getText();
    }

    String getPol2() {
        return pol2TextF.getText();
    }

    void setRezultat(String rezultat) {
        rezultatTextF.setText(rezultat);
    }

    void showError(String errMessage) {
        JOptionPane.showMessageDialog(this, errMessage);
    }

    void addAdunareListener(ActionListener mal) {
        adunareBtn.addActionListener(mal);
    }

    void addScadereListener(ActionListener mal) {
        scadereBtn.addActionListener(mal);
    }

    void addInmultireListener(ActionListener mal) {
        inmultireBtn.addActionListener(mal);
    }

    void addDerivareListener(ActionListener mal) {
        derivareBtn.addActionListener(mal);
    }

    void addIntegrareListener(ActionListener mal) {
        integrareBtn.addActionListener(mal);
    }

    void addResetListener(ActionListener cal) {
        clearBtn.addActionListener(cal);
    }

    public void setPol1TextF(String pol1TextF) {
        this.pol1TextF.setText(pol1TextF);
    }

    public void setPol2TextF(String pol2TextF) {
        this.pol2TextF.setText(pol2TextF);
    }
}