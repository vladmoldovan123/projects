import java.util.ArrayList;

public class Operatii {

    public ArrayList<Monom> restrange(Monom a,ArrayList<Monom> monom)
    {
        int ok=0;
        for (Monom m:monom) {
            if(a.getGrad()==m.getGrad())
            {
                monom.set(monom.indexOf(m),new Monom(a.getCoef()+m.getCoef(),a.getGrad()));
                ok=1;
            }
        }
        if(ok==0)
            monom.add(a);
        return monom;
    }

    public Monom find(Monom a, Polinom b) {
        Monom m = new Monom();
        for (Monom p : b.getMonom()) {
            if (a.getGrad() == p.getGrad()) {
                m.setCoef(a.getCoef() + p.getCoef());
                m.setGrad(a.getGrad());
                return m;
            }
        }
        return null;
    }

    public Polinom adunare(Polinom p1, Polinom p2) {
        ArrayList<Monom> monom = new ArrayList<Monom>();
        for (Monom a : p1.getMonom()) {
            Monom m = new Monom();
            if (find(a, p2) == null)
                monom.add(a);
            else {
                m = find(a, p2);
                monom.add(m);
            }
        }
        for (Monom a : p2.getMonom()) {
            if (find(a, p1) == null)
                monom.add(a);
        }
        Polinom p = new Polinom(monom);
        p.setMonom(monom);
        return p;
    }

    public Monom findSub(Monom a, Polinom b) {
        Monom m = new Monom();
        for (Monom p : b.getMonom()) {
            if (a.getGrad() == p.getGrad()) {
                m.setCoef(a.getCoef() - p.getCoef());
                m.setGrad(a.getGrad());
                return m;
            }
        }
        return null;
    }

    public Polinom subPolimon(Polinom p1, Polinom p2) {
        ArrayList<Monom> monom = new ArrayList<Monom>();
        for (Monom a : p1.getMonom()) {
            Monom m = new Monom();
            if (findSub(a, p2) == null)
                monom.add(a);
            else {
                m = findSub(a, p2);
                monom.add(m);
            }
        }
        for (Monom a : p2.getMonom()) {
            if (findSub(a, p1) == null) {
                Monom n = new Monom(-a.getCoef(), a.getGrad());
                monom.add(n);
            }
        }
        Polinom p = new Polinom(monom);
        p.setMonom(monom);
        return p;
    }


    public Polinom derivare(Polinom p)
    {
        ArrayList<Monom> monom = new ArrayList<Monom>();
        for (Monom a:p.getMonom()) {
            Monom m = new Monom(a.getCoef()*a.getGrad(),a.getGrad()-1);
            monom.add(m);
        }
        Polinom r=new Polinom(monom);
        return r;
    }

    public Polinom integrare(Polinom p)
    {
        ArrayList<Monom> monom = new ArrayList<Monom>();
        for (Monom a:p.getMonom()) {
            Monom m = new Monom(a.getCoef()/(a.getGrad()+1),a.getGrad()+1);
            monom.add(m);
        }
        Polinom r=new Polinom(monom);
        return r;
    }

    public Polinom inmultire(Polinom p1,Polinom p2)
    {
        ArrayList<Monom> monom = new ArrayList<Monom>();
        for (Monom a:p1.getMonom()) {
            for (Monom b:p2.getMonom()) {
                Monom m=new Monom(a.getCoef()*b.getCoef(),a.getGrad()+b.getGrad());
                monom.add(m);
                System.out.println(m);
            }
        }
        Operatii op = new Operatii();
        ArrayList<Monom> m = new ArrayList<Monom>();
        for (Monom a:monom) {
            m=op.restrange(a,m);
            System.out.println(m);
        }
        Polinom p=new Polinom(m);
        return p;
    }

    static final String INITIAL_VALUE = "";
    String polinom="";
    Operatii() {
        reset();
    }

    public void reset() {
        polinom = new String(INITIAL_VALUE);
    }

    public void setValue(String initialValue) {
        polinom = initialValue;
    }

}
