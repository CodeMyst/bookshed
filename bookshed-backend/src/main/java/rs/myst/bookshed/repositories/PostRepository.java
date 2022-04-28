package rs.myst.bookshed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.myst.bookshed.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

}
