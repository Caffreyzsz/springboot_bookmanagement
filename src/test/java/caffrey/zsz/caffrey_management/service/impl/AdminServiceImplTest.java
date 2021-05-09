package caffrey.zsz.caffrey_management.service.impl;

import caffrey.zsz.caffrey_management.service.AdminService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.xml.ws.soap.Addressing;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class AdminServiceImplTest {
    @Autowired
    private AdminService adminService;
    @Test
    void verifyUser() {
        System.out.println(adminService.verifyUser("1", "8888"));
    }

    @Test
    void addUser(){
        System.out.println(adminService.addUser("caffrey", "111"));
        System.out.println(adminService.addUser("c", "111"));
        int i = 0;
    }

}