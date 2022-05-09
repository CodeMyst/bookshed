package rs.myst.bookshed.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.myst.bookshed.constants.RoleConstants;
import rs.myst.bookshed.model.Post;
import rs.myst.bookshed.model.PostReply;
import rs.myst.bookshed.model.User;
import rs.myst.bookshed.model.UserRole;
import rs.myst.bookshed.payload.MessageResponse;
import rs.myst.bookshed.payload.PostCreateInfo;
import rs.myst.bookshed.repositories.PostReplyRepository;
import rs.myst.bookshed.repositories.PostRepository;
import rs.myst.bookshed.repositories.UserRepository;
import rs.myst.bookshed.services.UserDetailsImpl;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {
    private final PostRepository postRepo;
    private final UserRepository userRepo;
    private final PostReplyRepository replyRepo;

    public PostController(PostRepository postRepository, UserRepository userRepo, PostReplyRepository replyRepo) {
        this.postRepo = postRepository;
        this.userRepo = userRepo;
        this.replyRepo = replyRepo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable int id) {
    	Post post = postRepo.findById(id).orElse(null);
    	
    	if (post == null) {
    		return ResponseEntity.notFound().build();
    	}
    	
    	return ResponseEntity.ok(post);
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(postRepo.findAll());
    }

    @PostMapping("/create")
    @PreAuthorize(RoleConstants.USER)
    public ResponseEntity<?> createPost(@Valid @RequestBody PostCreateInfo createInfo) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User currentUser = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();

        if (createInfo.isSticky() && currentUser.getRole() != UserRole.ADMIN) {
			return new ResponseEntity<>(
					new MessageResponse("You cannot create sticky posts!"),
					HttpStatus.BAD_REQUEST
			);
        }
        
        Post post = new Post();
        post.setTitle(createInfo.getTitle());
        post.setContent(createInfo.getContent());
        post.setAuthor(currentUser);
        post.setSticky(createInfo.isSticky());
        post.setCreatedAt(LocalDateTime.now());

        postRepo.save(post);

        return ResponseEntity.ok(post);
    }
    
    @GetMapping("/reply/{idPost}")
    public ResponseEntity<?> getAllPostReplies(@PathVariable int idPost) {
    	Post post = postRepo.findById(idPost).orElse(null);
    	if (post == null) {
    		return ResponseEntity.notFound().build();
    	}
    	
    	List<PostReply> replies = replyRepo.findAllByPost(post);
    	
    	return ResponseEntity.ok(replies);
    }
    
    @PostMapping("/{idPost}")
    @PreAuthorize(RoleConstants.USER)
    public ResponseEntity<?> createPostReply(@PathVariable int idPost, @RequestBody String content) {
    	Post post = postRepo.findById(idPost).orElse(null);
    	if (post == null) {
    		return ResponseEntity.notFound().build();
    	}
    	
    	UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
    	User currentUser = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();
    	
    	PostReply reply = new PostReply();
    	reply.setAuthor(currentUser);
    	reply.setPost(post);
    	reply.setContent(content);
    	reply.setCreatedAt(LocalDateTime.now());
    	
    	replyRepo.save(reply);
    	
    	return ResponseEntity.ok(reply);
    }
    
    @DeleteMapping("/{idPost}")
    @PreAuthorize(RoleConstants.ADMIN)
    public ResponseEntity<?> deletePostAndReplies(@PathVariable int idPost) {
    	Post post = postRepo.findById(idPost).orElse(null);
    	if (post == null) {
    		return ResponseEntity.notFound().build();
    	}
    	
    	List<PostReply> replies = replyRepo.findAllByPost(post);
    	for (int i = 0; i < replies.size(); i++) {
    		replyRepo.delete(replies.get(i));
    	}
    	
    	postRepo.delete(post);
    	
    	return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{idPost}/{idReply}")
    @PreAuthorize(RoleConstants.ADMIN)
    public ResponseEntity<?> deletePostReply(@PathVariable int idPost, @PathVariable int idReply) {
    	Post post = postRepo.findById(idPost).orElse(null);
    	PostReply reply = replyRepo.findById(idReply).orElse(null);
    	if (post == null || reply == null) {
    		return ResponseEntity.notFound().build();
    	}
    	
    	replyRepo.delete(reply);
    	
    	return ResponseEntity.ok().build();
    }
}
