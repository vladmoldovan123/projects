package modelLayer;

public class Administrator {
    private int administratorId;
    private String name;
    private String username;
    private String password;
    private String email;

    public Administrator(int administratorId, String name, String username, String password, String email) {
        this.administratorId = administratorId;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public int getAdministratorId() {
        return administratorId;
    }

    public void setAdministratorId(int administratorId) {
        this.administratorId = administratorId;
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
