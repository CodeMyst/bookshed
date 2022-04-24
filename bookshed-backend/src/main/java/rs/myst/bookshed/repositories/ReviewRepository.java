package rs.myst.bookshed.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.myst.bookshed.model.Book;
import rs.myst.bookshed.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	List<Review> findAllByBook(Book b);
}
