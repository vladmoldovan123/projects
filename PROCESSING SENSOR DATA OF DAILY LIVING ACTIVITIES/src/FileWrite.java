
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class FileWrite {

    public FileWrite(ArrayList<MonitoredData> list, String id) throws IOException {
        String nr ="Task_"+id+".txt";
        FileWriter fileWriter = new FileWriter(nr);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        for (MonitoredData m:list) {
            printWriter.println(m);
        }
        printWriter.close();
        fileWriter.close();
    }
    public FileWrite(int x,String id) throws IOException {
        String nr ="Task_"+id+".txt";
        FileWriter fileWriter = new FileWriter(nr);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.println(x);
        printWriter.close();
        fileWriter.close();
    }

    public FileWrite(Map<String,Integer> map, String id) throws IOException {
        String nr ="Task_"+id+".txt";
        FileWriter fileWriter = new FileWriter(nr);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        for (Map.Entry<String,Integer> a:map.entrySet()){
            printWriter.println(a.getKey()+": "+a.getValue());
        }
        printWriter.close();
        fileWriter.close();
    }

    public FileWrite(Map<Integer, Map<String, Integer>> map) throws IOException {
        String nr ="Task_4"+".txt";
        FileWriter fileWriter = new FileWriter(nr);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        for (Map.Entry<Integer, Map<String, Integer>> a:map.entrySet()){
            printWriter.println("Day "+a.getKey()+": ");
            Map <String,Integer> map2 = a.getValue();
            for (Map.Entry<String, Integer> b:map2.entrySet())
            {
                printWriter.println("\t\t"+b.getKey()+": "+b.getValue());
            }
        }
        printWriter.close();
        fileWriter.close();
    }

    public FileWrite(List<String> list, String id) throws IOException {
        String nr ="Task_"+id+".txt";
        FileWriter fileWriter = new FileWriter(nr);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        for (String a:list) {
            printWriter.println(a);
        }
        printWriter.close();
        fileWriter.close();
    }
}
