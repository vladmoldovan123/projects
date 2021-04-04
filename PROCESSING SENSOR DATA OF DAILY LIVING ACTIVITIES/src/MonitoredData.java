import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;

public class MonitoredData {
    private Date startTime;
    private Date endTime;
    private String Activity;
    private DateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss" );

    public MonitoredData(Date startTime, Date endTime, String activity) {
        this.startTime = startTime;
        this.endTime = endTime;
        Activity = activity;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getActivity() {
        return Activity;
    }

    public void setActivity(String activity) {
        Activity = activity;
    }

    public int getId(Date m)
    {
        LocalDate localDate = m.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int value = localDate.getMonthValue()*31*localDate.getDayOfMonth();
        return value;
    }

    public boolean checkEquals(MonitoredData a,MonitoredData b)
    {
        return a.equals(b);
    }

    public boolean hasLessThan5Min(MonitoredData m)
    {
        Tasks t=new Tasks();
        LocalDateTime start = t.convertToLocalDateTime(m.getStartTime());
        LocalDateTime end = t.convertToLocalDateTime(m.getEndTime());
        long c = t.getNewTime(start,end);
        if(c<300)
            return true;
        return false;
    }

    @Override
    public String toString() {
        return dateFormat.format(startTime) + "\t\t"+
                dateFormat.format(endTime) + "\t\t" + Activity ;
    }
}
