package rs.myst.bookshed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rs.myst.bookshed.model.Book;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query(
            "select b from Book b " +
            "where b.title like %:query% " +
            "or b.author like %:query% " +
            "or b.category.name like %:query% "
    )
    List<Book> search(@Param("query") String query);

    List<Book> findAllByCategoryId(int categoryId);
}