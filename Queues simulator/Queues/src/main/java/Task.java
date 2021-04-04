public class Task implements Comparable<Task>{
    private int id;
    private int arrivalTime;
    private int processingTime;
    private int waitingTime;

    public Task(int id,int arrivalTime, int processingTime) {
        this.id=id;
        this.arrivalTime = arrivalTime;
        this.processingTime = processingTime;
    }

    public int getArrivalTime() {
        return arrivalTime;
    }

    public int getProcessingTime() {
        return processingTime;
    }

    public void setArrivalTime(int arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public void setProcessingTime(int processingTime) {
        this.processingTime = processingTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int compareTo(Task c) {
        return this.arrivalTime-c.getArrivalTime();
    }

    @Override
    public String toString() {
        return ("("+ id +
                ","+ arrivalTime +
                "," + processingTime +
                ")");
    }
}
