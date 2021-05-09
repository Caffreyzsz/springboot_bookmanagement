package caffrey.zsz.caffrey_management;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("caffrey.zsz.caffrey_management.mapper")
public class CaffreyManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(CaffreyManagementApplication.class, args);
    }

}
