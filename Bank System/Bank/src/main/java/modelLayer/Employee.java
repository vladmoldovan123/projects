package modelLayer;

public class Employee {
    private int employeeId;
    private String name;
    private String username;
    private String password;
    private String email;

    public Employee(int employeeId, String name, String username, String password, String email) {
        this.employeeId = employeeId;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
