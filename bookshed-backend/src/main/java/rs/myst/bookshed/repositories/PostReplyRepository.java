package rs.myst.bookshed.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.myst.bookshed.model.Post;
import rs.myst.bookshed.model.PostReply;

public interface PostReplyRepository extends JpaRepository<PostReply, Integer> {
	List<PostReply> findAllByPost(Post p);
}
