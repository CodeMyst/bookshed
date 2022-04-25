package rs.myst.bookshed.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.myst.bookshed.model.Book;
import rs.myst.bookshed.model.Review;
import rs.myst.bookshed.model.User;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	List<Review> findAllByBook(Book b);

    boolean existsByAuthorAndBook(User currentUser, Book book);
}
