package caffrey.zsz.caffrey_management.service.impl;

import caffrey.zsz.caffrey_management.entity.Admin;
import caffrey.zsz.caffrey_management.mapper.AdminMapper;
import caffrey.zsz.caffrey_management.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Boolean verifyUser(String id, String password) {
        Admin admin = adminMapper.selectById(id);
        Admin adminverify = new Admin(id,password);
        if(admin!=null){
            return admin.equals(adminverify);
        }
        return  false;
    }

    @Override
    public Boolean addUser(String id, String password) {
        Admin admin = adminMapper.selectById(id);
        if(admin == null){
            int i = adminMapper.insert(new Admin(id,password));
            if(i == 1){
                return true;
            }
        }
        return false;
    }
}
