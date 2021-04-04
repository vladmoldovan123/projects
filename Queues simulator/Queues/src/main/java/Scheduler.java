import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Scheduler {
    private List<Server> servers;
    private int maxNoServers;
    private int maxTasksPerServer;
    private Thread[] t;

    public Scheduler(int maxNoServers,int maxTasksPerServer)
    {
        this.maxNoServers=maxNoServers;
        this.maxTasksPerServer=maxTasksPerServer;
        servers =new ArrayList<Server>(maxNoServers);
        t =new Thread[maxNoServers];
        for(int i=0;i<maxNoServers;i++)
        {
            Server s=new Server();
            servers.add(s);
            t[i]=new Thread(s);
        }
    }

    public boolean checkEmptyServers(List<Server> s)
    {
        for (Server a:s) {
            if(!a.getTasks().isEmpty())
                return false;
        }
        return true;

    }


    public void dispatchTask(Task task)
    {
        int min=9999999;
        for (Server a:servers) {
            if(a.getWaitingPeriod().intValue()<min)
            {
                min=a.getWaitingPeriod().intValue();
            }
        }
        Iterator<Server> itr = servers.iterator();
        while(itr.hasNext()){
            Server a=itr.next();
            if(a.getWaitingPeriod().intValue()==min)
            {
                a.addTask(task);
                int x=servers.indexOf(a);
                if(!t[x].isAlive())
                    {
                        a.setRunning(true);
                        t[x].start();
                    }
                break;
            }

            }
    }


    public List<Server> getServers(){
        return servers;
    }

    public void setServers(List<Server> servers) {
        this.servers = servers;
    }

    @Override
    public String toString() {
        return "Scheduler{" +
                "servers=" + servers +
                ", maxNoServers=" + maxNoServers +
                ", maxTasksPerServer=" + maxTasksPerServer +
                ", strategy=" +
                '}';
    }
}
