package rs.myst.bookshed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.myst.bookshed.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
}