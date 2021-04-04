import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Tasks {
    ArrayList<MonitoredData> list;
    private static int nr=0;
    private static long time=0;

    public Tasks()
    {

    }

    public Tasks(String file) throws IOException {

        list = new ArrayList<MonitoredData>();
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Stream<String> lines = Files.lines(Paths.get(file));
        lines
                .map(l->l.split("\t\t"))
                .forEach(l->{
                    try {
                        Date startTime = format.parse(l[0]);
                        Date endTime = format.parse(l[1]);
                        MonitoredData item = new MonitoredData(startTime,endTime,l[2]);
                        list.add(item);
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                });
        FileWrite f = new FileWrite(list,"1");
    }

    public void getTask2() throws IOException {
        Stream <MonitoredData> list2 =list.stream();
        List<Integer> v = list2
                .map(x->x.getId(x.getStartTime()))
                .distinct()
                .collect(Collectors.toList());
        FileWrite f =new FileWrite(v.size(),"2");
    }

    public long countActivity(String a)
    {
        long count = list
                .stream()
                .filter(l->l.getActivity().equals(a))
                .count();
        return count;
    }

    public Map<String,Integer> getTask3() throws IOException {
        Map<String,Integer> map = new HashMap<String,Integer>();
        Stream <MonitoredData> list2 =list.stream();
        List<String> a = list2
                .map(x->x.getActivity())
                .distinct()
                .collect(Collectors.toList());
        a
                .stream()
                .forEach(x->{
                    map.put(x, (int) countActivity(x));
                });
        FileWrite f = new FileWrite(map,"3");
        return map;
    }

    public long countActivityTask4(String a,int id)
    {
        long count = list
                .stream()
                .filter(l->l.getActivity().equals(a)&&(l.getId(l.getStartTime())==id||l.getId(l.getEndTime())==id))
                .count();
        return count;
    }

    public LocalDateTime convertToLocalDateTime(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

    public long getNewTime(LocalDateTime a,LocalDateTime b)
    {
        long c =java.time.Duration.between(a, b).toSeconds();
        return c;
    }
    public void getTask4() throws IOException {
        Map<Integer, Map<String, Integer>> map = new HashMap<Integer, Map<String, Integer>>();

        Stream <MonitoredData> list2 =list.stream();
        List<Integer> v = list2
                .map(x->x.getId(x.getStartTime()))
                .distinct()
                .collect(Collectors.toList());
        v.forEach(y->{
            Stream <MonitoredData> list3 =list.stream();
            Map<String, Integer> map2 = new HashMap<String,Integer>();
            List<String> a = list3
                    .filter(x->x.getId(x.getStartTime())==y||x.getId(x.getEndTime())==y)
                    .map(x->x.getActivity())
                    .distinct()
                    .collect(Collectors.toList());
            a
                    .stream()
                    .forEach(z->{
                        map2.put(z,(int)countActivityTask4(z,y));
                    });
            nr++;
            map.put(nr,map2);

        });
        FileWrite f = new FileWrite(map);
    }

    public void getTask5() throws IOException {
        Map<String,Integer> map = new HashMap<String,Integer>();
        Stream <MonitoredData> list2 =list.stream();
        List<String> a = list2
                .map(x->x.getActivity())
                .distinct()
                .collect(Collectors.toList());
        a
                .stream()
                .forEach(x->{
                    time=0;
                    list
                            .stream()
                            .filter(l->l.getActivity().equals(x))
                            .forEach(y->{
                                LocalDateTime start = convertToLocalDateTime(y.getStartTime());
                                LocalDateTime end = convertToLocalDateTime(y.getEndTime());
                                time =time+ getNewTime(start,end);
                            });
                    map.put(x,(int)(time/60));
                });
        FileWrite f = new FileWrite(map,"5");
    }

    public long countTask6(String a)
    {
        long count = list
                .stream()
                .filter(l->l.hasLessThan5Min(l)&&l.getActivity().equals(a))
                .count();
        return count;
    }

    public boolean checkTask6(long a,long b)
    {
        double res = 0.9*a;
        if(b>res)
            return true;
        return false;
    }

    public long findValue(Map<String,Integer> map,String a)
    {
        for (Map.Entry<String,Integer> entry: map.entrySet()) {
            if(entry.getKey().equals(a))
                return entry.getValue();
        }
        return 0;
    }

    public void getTask6() throws IOException {
        Map<String,Integer> map =  getTask3();
        List<String> list2 = new ArrayList<String>();
        list
                .stream()
                .map(y->y.getActivity())
                .distinct()
                .filter(l->checkTask6(findValue(map,l),countTask6(l)))

                .forEach(x->{
                    list2.add(x);
                });
        FileWrite f = new FileWrite(list2,"6");
    }

}
