import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;

public class Server implements Runnable {

    private BlockingQueue<Task> tasks;
    private AtomicInteger waitingPeriod;
    private boolean running;
    private boolean verifica=false;
    private int avgTime;

    public Server(){
        tasks = new ArrayBlockingQueue<Task>(10000);
        waitingPeriod= new AtomicInteger(0);
        running=false;
        avgTime=0;
    }

    public void addTask(Task newTask)
    {
        tasks.add(newTask);
        running=true;
        waitingPeriod.getAndAdd(newTask.getProcessingTime());
        //Task c=tasks.poll();
        avgTime=avgTime+waitingPeriod.intValue();
        //c.setWaitingTime(waitingPeriod.intValue());
    }

    public int getAvgTime() {
        return avgTime;
    }

    public void setAvgTime(int avgTime) {
        this.avgTime = avgTime;
    }

    public void run()
    {
        while(running)
        {
            Task t=null;
            if(!tasks.isEmpty()) {
                try {

                    t=tasks.peek();
                    int x=t.getProcessingTime();
                    for(int i=0;i<x;i++)
                        Thread.sleep(1000);
                    tasks.remove(t);

                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                finally {
                    if(tasks.isEmpty()) {
                        setRunning(false);
                        while(running==false&&isVerifica()==false)
                        {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException e) { e.printStackTrace(); }
                        }
                    }
                }
            }
        }
    }

    public void setRunning(boolean running) {
        this.running = running;
    }

    public boolean isRunning() {
        return running;
    }

    public AtomicInteger getWaitingPeriod() {
        return waitingPeriod;
    }

    public void setWaitingPeriod(AtomicInteger waitingPeriod) {
        this.waitingPeriod = waitingPeriod;
    }

    public BlockingQueue<Task> getTasks() {
        return tasks;
    }

    public void setTasks(BlockingQueue<Task> tasks) {
        this.tasks = tasks;
    }

    public boolean isVerifica() {
        return verifica;
    }

    public void setVerifica(boolean verifica) {
        this.verifica = verifica;
    }

    @Override
    public String toString() {
        return "Server{" +
                "tasks=" + tasks +
                ", avgTime=" + avgTime +
                '}';
    }
}