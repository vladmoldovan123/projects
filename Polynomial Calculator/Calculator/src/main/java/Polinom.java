import java.util.ArrayList;
import java.util.Collections;

public class Polinom {
    private String functie;
    private ArrayList<Monom> monom = new ArrayList<Monom>();


    public Polinom()
    {

    }

    public Polinom(ArrayList<Monom> monom) {
        Collections.sort(monom);
        this.monom = monom;
        String f = "";
        for (Monom a:monom) {
            if(a.getCoef()!=0) {
                if (a.getGrad() != 0) {
                    if (a.getCoef() == 1.0 )
                        f = f + "+x";
                    else {
                        if(a.getCoef()==-1.0)
                            f= f+"+-x";
                        else
                            f = f + "+" + a.getCoef() + "x";
                    }
                    if (a.getGrad() != 1)
                        f = f + "^" + a.getGrad();
                } else
                    f = f +"+"+ a.getCoef();
            }
        }
        f=f.replace("+-", "-");
        if(f.equals(""))
            functie="0";
        else{
            if(f.length()!=0&&f.charAt(0)=='+') {
                String f2=f.substring(1,f.length());
                functie=f2; }
            else
                functie=f; }
    }


    public Polinom(String functie) {
        functie = functie.replace("-", "+-");
        String[] m, b;
        double c;
        int g;
        m = functie.split("\\+");
        for (String s : m) {
            if(s.length()!=0) {
                s=adaugaFunctie(s);
                b = s.split("x\\^");
                c = Double.parseDouble(b[0]);
                g = Integer.parseInt(b[1]);
                Monom mon = new Monom(c,g);
                monom.add(mon);
            }

        }
        this.functie = functie;
    }

    public String adaugaFunctie(String s) {
        if (s.equals("x"))
            s = "1" + s + "^1";
        else {
            if (s.equals("-x"))
                s = "-1x^1";
            else {
                if (s.indexOf("^") == -1 && s.indexOf("x") == -1)
                    s = s + "x^0";
                else {
                    if (s.indexOf("x") != -1 && s.indexOf("^") == -1)
                        s = s + "^1";
                    else {
                        if (s.charAt(0) == 'x') {
                            s = "1" + s;
                        } else {
                            if (s.charAt(1) == 'x' && s.charAt(0) == '-')
                                s = s.replace("-", "-1");
                        }
                    }
                }
            }
        }
        return s;
    }



    public String getFunctie() {
        return functie;
    }

    public void setFunctie(String functie) {
        this.functie = functie;
    }

    public ArrayList<Monom> getMonom() {
        return monom;
    }

    public void setMonom(ArrayList<Monom> monom) {
        this.monom = monom;
    }

    @Override
    public String toString() {
        return "Polinom{" +
                "functie='" + functie + '\'' +
                ", monom=" + monom +
                '}';
    }
}
