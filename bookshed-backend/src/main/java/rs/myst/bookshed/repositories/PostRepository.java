package rs.myst.bookshed.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.myst.bookshed.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findAllByStickyTrue();
}
