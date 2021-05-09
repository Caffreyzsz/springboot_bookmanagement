package caffrey.zsz.caffrey_management.service.impl;

import caffrey.zsz.caffrey_management.Vo.DataVo;
import caffrey.zsz.caffrey_management.entity.Book;
import caffrey.zsz.caffrey_management.mapper.BookMapper;
import caffrey.zsz.caffrey_management.service.BookService;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookMapper bookMapper;
    @Override
    public DataVo findAll(Integer page, Integer limit) {
        DataVo dataVo = new DataVo();
        dataVo.setCode(0);
        dataVo.setMsg("");

        //分页逻辑处理
        IPage<Book> productIPage = new Page<>(page,limit);
        IPage<Book> result = bookMapper.selectPage(productIPage,null);
        dataVo.setCount(result.getTotal());//获取总条数

        List<Book> list = new ArrayList<>();
        List<Book> data = result.getRecords();

        for (Book datum : data) {
            Book book = new Book();
            BeanUtils.copyProperties(datum,book);
            list.add(book);
        }
        dataVo.setData(list);
        return dataVo;
    }

    @Override
    public List<Book> find() {
        List<Book> list = new ArrayList<>();
        Wrapper wrapper =new QueryWrapper();

        List<Book> data = bookMapper.selectList(wrapper);
        System.out.println(data);
        for (Book datum : data) {
            Book book = new Book();
            BeanUtils.copyProperties(datum,book);
            list.add(book);
        }
        return list;
    }

    @Override
    public DataVo ConditionalQuery(Integer page, Integer limit, String searContent) {
        DataVo dataVo = new DataVo();
        dataVo.setCode(0);
        dataVo.setMsg("");
        //分页逻辑处理
        IPage<Book> productIPage = new Page<>(page,limit);
        QueryWrapper<Book> qw = new QueryWrapper<>();
        qw.like("name",searContent).or().like("id",searContent).or().like("author",searContent);

        IPage<Book> result = bookMapper.selectPage(productIPage,qw);
        dataVo.setCount(result.getTotal());//获取总条数

        List<Book> list = new ArrayList<>();
        List<Book> data = result.getRecords();

        for (Book datum : data) {
            Book book = new Book();
            BeanUtils.copyProperties(datum,book);
            list.add(book);
        }
        dataVo.setData(list);
        return dataVo;
    }

    @Override
    public void add(Integer id, String name, String author, String publish, Integer pages, Float price) {
        Book book = new Book();
        book.setId(id);
        book.setName(name);
        book.setAuthor(author);
        book.setPublish(publish);
        book.setPages(pages);
        book.setPrice(price);
        bookMapper.insert(book);

        return;
    }

    @Override
    public Boolean del(Integer id) {
        if(bookMapper.selectById(id) != null){
            bookMapper.deleteById(id);
            return true;
        }
        return false;
    }
}
