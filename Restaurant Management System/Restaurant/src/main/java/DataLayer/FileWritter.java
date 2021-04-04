package DataLayer;

import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class FileWritter {

    public FileWritter(String a,String b,String id) throws IOException {
        String nr ="BillOrder"+id+".txt";
        FileWriter fileWriter = new FileWriter(nr);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.println(a);
        printWriter.println(b);
        printWriter.close();
        fileWriter.close();
    }
}
