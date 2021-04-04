
public class PolinomMVC {

    public static void main(String[] args) {

        Operatii     model      = new Operatii();
        PolinomView       view       = new PolinomView(model);
        PolinomController controller = new PolinomController(model, view);

        view.setVisible(true);
    }
}
