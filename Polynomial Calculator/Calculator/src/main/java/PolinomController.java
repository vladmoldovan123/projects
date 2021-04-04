import java.awt.event.*;

public class PolinomController {
    private Operatii model;
    private PolinomView view;

    PolinomController(Operatii model, PolinomView view) {
        this.model = model;
        this.view  = view;

        view.addAdunareListener(new AdunareListener());
        view.addScadereListener(new ScadereListener());
        view.addInmultireListener(new InmultireListener());
        view.addDerivareListener(new DerivareListener());
        view.addIntegrareListener(new IntegrareListener());
        view.addResetListener(new ResetListener());
    }


    class AdunareListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            String pol1 = "";
            String pol2 = "";

            try {
                pol1 = view.getPol1();
                pol2 = view.getPol2();
                Polinom p1=new Polinom(pol1);
                Polinom p2=new Polinom(pol2);
                view.setRezultat(model.adunare(p1,p2).getFunctie());

            } catch (NumberFormatException nfex) {
                view.showError("Format gresit!");
            }
        }
    }

    class ScadereListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            String pol1 = "";
            String pol2 = "";

            try {
                pol1 = view.getPol1();
                pol2 = view.getPol2();
                Polinom p1=new Polinom(pol1);
                Polinom p2=new Polinom(pol2);
                view.setRezultat(model.subPolimon(p1,p2).getFunctie());

            } catch (NumberFormatException nfex) {
                view.showError("Format gresit!");
            }
        }
    }

    class InmultireListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            String pol1 = "";
            String pol2 = "";

            try {
                pol1 = view.getPol1();
                pol2 = view.getPol2();
                Polinom p1=new Polinom(pol1);
                Polinom p2=new Polinom(pol2);
                view.setRezultat(model.inmultire(p1,p2).getFunctie());

            } catch (NumberFormatException nfex) {
                view.showError("Format gresit!");
            }
        }
    }

    class DerivareListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            String pol1 = "";

            try {
                pol1 = view.getPol1();
                Polinom p1=new Polinom(pol1);
                view.setRezultat(model.derivare(p1).getFunctie());

            } catch (NumberFormatException nfex) {
                view.showError("Format gresit!");
            }
        }
    }

    class IntegrareListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            String pol1 = "";

            try {
                pol1 = view.getPol1();
                Polinom p1=new Polinom(pol1);
                view.setRezultat(model.integrare(p1).getFunctie());

            } catch (NumberFormatException nfex) {
                view.showError("Format gresit!");
            }
        }
    }


    class ResetListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            model.reset();
            view.reset();
            view.setRezultat("");
            view.setPol1TextF("");
            view.setPol2TextF("");
        }
    }
}