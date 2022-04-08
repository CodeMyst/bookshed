package rs.myst.bookshed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.myst.bookshed.model.BookCategory;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Integer> {
}