package caffrey.zsz.caffrey_management.entity;

import lombok.Data;

@Data
public class Admin {
    private String id;
    private String password;

    public Admin(String id, String password) {
        this.id = id;
        this.password = password;
    }

    public Admin() {

    }
}
