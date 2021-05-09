package caffrey.zsz.caffrey_management.service.impl;

import caffrey.zsz.caffrey_management.Vo.DataVo;
import caffrey.zsz.caffrey_management.entity.Book;
import caffrey.zsz.caffrey_management.mapper.BookMapper;
import caffrey.zsz.caffrey_management.service.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
@SpringBootTest
class BookServiceImplTest {
    @Autowired
    BookService bookService;
    @Test
    void find(){
        DataVo dataVo = bookService.ConditionalQuery(1,10,"2");
        DataVo dataVo1 = bookService.findAll(1,10);
        int i = 10;
    }

    @Test
    void del(){
        bookService.del(123);
    }

}