import static org.junit.Assert.*;
import org.junit.*;

public class JUnitTest {

    private static Operatii m;
    private static int nrTesteExecutate = 0;
    private static int nrTesteCuSucces = 0;

    public JUnitTest()
    {

    }

    @BeforeClass
    public static void setUpBeforeClass() throws Exception {
        m = new Operatii();
    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {
        System.out.println("Au fost executate " + nrTesteExecutate + " teste din care "+ nrTesteCuSucces + " au fost realizate cu  succes !");
    }

    @Before
    public void setUp() throws Exception {
        System.out.println("A inceput un test nou !");
        nrTesteExecutate++;
    }

    @After
    public void tearDown() throws Exception {
        System.out.println("S-a incheiat testul !");
    }

    @Test
    public void testAdunare() {
        m.reset();
        Polinom p1=new Polinom("x^2+2x+1");
        Polinom p2=new Polinom("x^3-x^2+x-3");
        String rez=m.adunare(p1,p2).getFunctie();
        assertNotNull(rez);
        assertEquals(rez,"x^3+3.0x-2.0");
        nrTesteCuSucces++;
    }

    @Test
    public void testScadere() {
        m.reset();
        Polinom p1=new Polinom("x^2+2x+1");
        Polinom p2=new Polinom("x^3-x^2+x-3");
        String rez=m.subPolimon(p1,p2).getFunctie();
        assertNotNull(rez);
        assertEquals(rez,"-x^3+2.0x^2+x+4.0");
        nrTesteCuSucces++;
    }

    @Test
    public void testInmultire() {
        m.reset();
        Polinom p1=new Polinom("x+1");
        Polinom p2=new Polinom("x+2");
        String rez=m.inmultire(p1,p2).getFunctie();
        assertNotNull(rez);
        assertEquals(rez,"x^2+3.0x+2.0");
        nrTesteCuSucces++;
    }

    @Test
    public void testDerivare() {
        m.reset();
        Polinom p=new Polinom("2x^3-x^2+2x-3");
        String rez=m.derivare(p).getFunctie();
        assertNotNull(rez);
        assertEquals(rez,"6.0x^2-2.0x+2.0");
        nrTesteCuSucces++;
    }

    @Test
    public void testIntegrare() {
        m.reset();
        Polinom p = new Polinom("2x^3-6x^2+2x-3");
        String rez = m.integrare(p).getFunctie();
        assertNotNull(rez);
        assertEquals(rez, "0.5x^4-2.0x^3+x^2-3.0x");
        nrTesteCuSucces++;
    }

}
