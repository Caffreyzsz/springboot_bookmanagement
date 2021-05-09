package caffrey.zsz.caffrey_management.service;

import caffrey.zsz.caffrey_management.Vo.DataVo;
import caffrey.zsz.caffrey_management.entity.Book;

import java.util.Date;
import java.util.List;

public interface BookService {
    public DataVo findAll(Integer page, Integer limit);
    public List<Book> find();
    public DataVo ConditionalQuery(Integer page, Integer limit,String searContent);
    public void add(Integer id, String name, String author, String publish, Integer pages, Float price);
    public Boolean del(Integer id);
}
