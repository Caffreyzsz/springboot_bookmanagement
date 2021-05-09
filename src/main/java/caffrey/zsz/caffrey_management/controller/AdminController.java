package caffrey.zsz.caffrey_management.controller;

import caffrey.zsz.caffrey_management.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdminController {
    @Autowired
    private AdminService adminService;
    @PostMapping("/verify")
    @ResponseBody
    public String verify(String id, String password)
    {
        if(adminService.verifyUser(id,password))
            return "true";
        return "";
    }

    @PostMapping("/addadmin")
    @ResponseBody
    public String addadmin(String id, String password)
    {
        if(adminService.addUser(id,password))
            return "true";
        return "";
    }
}
