import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class MainClass {

    public static void main(String[] args) throws IOException {
        Tasks t = new Tasks("Activities.txt");
        t.getTask2();
        t.getTask3();
        t.getTask4();
        t.getTask5();
        t.getTask6();
    }
}
