package rs.myst.bookshed.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.myst.bookshed.constants.RoleConstants;
import rs.myst.bookshed.model.Post;
import rs.myst.bookshed.model.User;
import rs.myst.bookshed.payload.PostCreateInfo;
import rs.myst.bookshed.repositories.PostRepository;
import rs.myst.bookshed.repositories.UserRepository;
import rs.myst.bookshed.services.UserDetailsImpl;

import javax.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/post")
public class PostController {
    private final PostRepository postRepo;
    private final UserRepository userRepo;

    public PostController(PostRepository postRepository, UserRepository userRepo) {
        this.postRepo = postRepository;
        this.userRepo = userRepo;
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

        Post post = new Post();
        post.setTitle(createInfo.getTitle());
        post.setContent(createInfo.getContent());
        post.setAuthor(currentUser);
        post.setSticky(createInfo.isSticky());
        post.setCreatedAt(LocalDateTime.now());

        postRepo.save(post);

        return ResponseEntity.ok(post);
    }
}
