package rs.myst.bookshed.controllers;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rs.myst.bookshed.constants.RoleConstants;
import rs.myst.bookshed.model.Book;
import rs.myst.bookshed.model.Review;
import rs.myst.bookshed.model.User;
import rs.myst.bookshed.repositories.BookRepository;
import rs.myst.bookshed.repositories.ReviewRepository;
import rs.myst.bookshed.repositories.UserRepository;
import rs.myst.bookshed.services.UserDetailsImpl;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

	private final ReviewRepository reviewRepo;
	private final BookRepository bookRepo;
	private final UserRepository userRepo;

	public ReviewController(ReviewRepository reviewRepo, BookRepository bookRepo, UserRepository userRepo) {
		this.reviewRepo = reviewRepo;
		this.bookRepo = bookRepo;
		this.userRepo = userRepo;
	}

	@GetMapping("/{idBook}")
	public ResponseEntity<?> getAllReviewsByBook(@PathVariable int idBook) {
		if (!bookRepo.existsById(idBook)) {
			return ResponseEntity.badRequest().build();
		}
		
		Book book = bookRepo.findById(idBook).get();
		List<Review> reviews = reviewRepo.findAllByBook(book);
		
		return ResponseEntity.ok(reviews);
	}

	@PostMapping("/{idBook}")
	@PreAuthorize(RoleConstants.USER)
	public ResponseEntity<?> createReview(@PathVariable int idBook, @Valid @RequestBody String content) {
		if (!bookRepo.existsById(idBook)) {
			return ResponseEntity.badRequest().build();
		}

		Book book = bookRepo.findById(idBook).get();

		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		User currentUser = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();

		Review review = new Review();
		review.setAuthor(currentUser);
		review.setBook(book);
		review.setContent(content);
		review.setCreatedAt(LocalDateTime.now());

		reviewRepo.save(review);

		return ResponseEntity.ok(review);
	}
}
