public class Monom implements Comparable<Monom> {

    private double coef;
    private int grad;

    public Monom()
    {

    }

    public Monom(double coef,int grad)
    {
        this.coef=coef;
        this.grad=grad;
    }

    public double getCoef() {
        return coef;
    }

    public void setCoef(double coef) {
        this.coef = coef;
    }

    public int getGrad() {
        return grad;
    }

    public void setGrad(int grad) {
        this.grad = grad;
    }

    @Override
    public int compareTo(Monom c) {
        return c.getGrad()-this.grad;
    }

    @Override
    public String toString() {
        return "Monom{" +
                "coef=" + coef +
                ", grad=" + grad +
                '}';
    }
}
