package caffrey.zsz.caffrey_management.controller;

import caffrey.zsz.caffrey_management.Vo.DataVo;
import caffrey.zsz.caffrey_management.entity.Book;
import caffrey.zsz.caffrey_management.service.AdminService;
import caffrey.zsz.caffrey_management.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/search")
    @ResponseBody
    public DataVo find(Integer page, Integer limit){return bookService.findAll(page,limit);}

    @RequestMapping("/likequery")
    @ResponseBody
    public DataVo query(Integer page, Integer limit, String searContent){return bookService.ConditionalQuery(page,limit,searContent);}

    @PostMapping("/addbook")
    @ResponseBody
    public String add(Integer id, String name, String author, String publish, Integer pages, Float price)
    {
        bookService.add(id,name,author,publish,pages,price);
        return "true";
    }

    @PostMapping("/del")
    @ResponseBody
    public String del(Integer id)
    {
        if(bookService.del(id))
            return "true";
        return "";
    }


}
