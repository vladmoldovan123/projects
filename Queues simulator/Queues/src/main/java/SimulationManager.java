import java.io.*;
import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;


public class SimulationManager implements Runnable {

    public int timeLimit;
    public int maxProcessingTime ;
    public int minProcessingTime ;
    public int maxArrivalTime;
    public int minArrivalTime;
    public int numberOfServers;
    public int numberOfClients;
    public int currentTime;
    private String input;
    private String output;

    private Scheduler scheduler;

    private List<Task> generatedTasks=null;

    public void readFile() throws FileNotFoundException {
        File f = new File(input);
        Scanner sc=new Scanner(f);
        String a1 = sc.nextLine();
        numberOfClients=Integer.parseInt(a1);
        String a2 = sc.nextLine();
        numberOfServers=Integer.parseInt(a2);
        String a3 = sc.nextLine();
        timeLimit=Integer.parseInt(a3);
        String a4 = sc.nextLine();
        String[] b =a4.split(",");
        minArrivalTime=Integer.parseInt(b[0]);
        maxArrivalTime=Integer.parseInt(b[1]);
        String a5 = sc.nextLine();
        String[] c =a5.split(",");
        minProcessingTime=Integer.parseInt(c[0]);
        maxProcessingTime=Integer.parseInt(c[1]);
    }

    public SimulationManager(String input,String output) throws FileNotFoundException {
        this.input=input;
        this.output=output;
        readFile();
        scheduler=new Scheduler(numberOfServers,numberOfClients);
        generateNRandomTasks();
    }

    public void afisare (List<Server> a,List<Task> list,int time) throws IOException {
        FileWriter fileWriter = new FileWriter(output,true);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        if(scheduler.checkEmptyServers(a)==true&&list.isEmpty())
        {
            printWriter.println("Time "+time);
            for (int i=1;i<=a.size();i++) {
                printWriter.println("Queue " + i+ ":" + " closed");
            }
            printWriter.close();
            return;
        }
        printWriter.println("Time "+time);
        printWriter.println("Waiting clients: "+list);
        int aux=1;
        for (Server b:a) {
            if(b.getTasks().isEmpty())
            {
                printWriter.println("Queue "+aux+":"+" closed");
            }
            else
            {
                printWriter.print("Queue "+aux+":");
                for (Task c:b.getTasks()) {
                    printWriter.print(c);
                }
                printWriter.println();
            }
            aux++;
        }
        printWriter.close();
    }

    private void generateNRandomTasks() {
        this.generatedTasks=Collections.synchronizedList(new ArrayList<Task>(numberOfClients));
        for (int i=1;i<=numberOfClients;i++) {
            int processingTime=minProcessingTime + (int)(Math.random() * ((maxProcessingTime - minProcessingTime) + 1));
            int arrivalTime=minArrivalTime + (int)(Math.random() * ((maxArrivalTime - minArrivalTime) + 1));
            Task a =new Task(i,arrivalTime,processingTime);
            this.generatedTasks.add(a);
        }
        Collections.sort(this.generatedTasks);
    }


    public void avgTime(List<Server> s) throws IOException
    {
        double suma=0;
        for (Server a:s) {
            suma=suma+a.getAvgTime();
        }
        suma=suma/numberOfClients;
        FileWriter fileWriter = new FileWriter(output,true);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.println("Average waiting time: "+suma);
        printWriter.close();
    }

    public void run()   {
        currentTime = 0;
        while(currentTime < timeLimit) {
            Iterator<Task> itr = generatedTasks.iterator();
            while(itr.hasNext()){
                Task a=itr.next();
                if(a.getArrivalTime()==currentTime) {
                    this.scheduler.dispatchTask(a);
                    itr.remove();
                }
            }
            try { afisare(scheduler.getServers(),generatedTasks,currentTime);
            } catch (IOException e) { e.printStackTrace(); }
            List<Server> s = scheduler.getServers();
            for (Server a:s) {
                AtomicInteger at = a.getWaitingPeriod();
                if(at.intValue()!=0) {
                    at.decrementAndGet();
                    a.setWaitingPeriod(at); }
                BlockingQueue<Task> ta=a.getTasks();
                Task primu=ta.peek();
                if(primu!=null)
                    primu.setProcessingTime(primu.getProcessingTime()-1);
            }
            scheduler.setServers(s);
            currentTime++;
            List<Server> sv = scheduler.getServers();
            if(currentTime==timeLimit) {
                for (Server serv : sv)
                    serv.setVerifica(true);
                scheduler.setServers(sv);
                try { avgTime(scheduler.getServers()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            if(scheduler.checkEmptyServers(scheduler.getServers())==true&&generatedTasks.isEmpty()) {
                for (Server serv : sv)
                    serv.setVerifica(true);
                scheduler.setServers(sv);
                currentTime = timeLimit;
                try { avgTime(scheduler.getServers()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            try { Thread.sleep(1000); }
            catch (InterruptedException ex) { }
        }
    }

    public static void main(String[] args) throws IOException {
        FileWriter fileWriter = new FileWriter(args[1]);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.close();
        SimulationManager gen = new SimulationManager(args[0],args[1]);
        Thread t = new Thread(gen);
        t.start();
    }
}
