package rs.myst.bookshed.repositories;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.myst.bookshed.model.Book;
import rs.myst.bookshed.model.Rating;
import rs.myst.bookshed.model.User;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Optional<Rating> findByBookAndAuthor(Book book, User author);
    Collection<Rating> findByBook(Book book);
}
