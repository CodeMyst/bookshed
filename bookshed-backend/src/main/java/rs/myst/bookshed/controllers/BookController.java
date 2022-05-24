package rs.myst.bookshed.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rs.myst.bookshed.constants.RoleConstants;
import rs.myst.bookshed.model.Book;
import rs.myst.bookshed.model.BookCategory;
import rs.myst.bookshed.model.Rating;
import rs.myst.bookshed.model.SellInfo;
import rs.myst.bookshed.model.User;
import rs.myst.bookshed.payload.BookCreateInfo;
import rs.myst.bookshed.payload.SellCreateInfo;
import rs.myst.bookshed.repositories.BookCategoryRepository;
import rs.myst.bookshed.repositories.BookRepository;
import rs.myst.bookshed.repositories.RatingRepository;
import rs.myst.bookshed.repositories.SellInfoRepository;
import rs.myst.bookshed.repositories.UserRepository;
import rs.myst.bookshed.services.UserDetailsImpl;

@RestController
@RequestMapping("/api/book")
public class BookController {
    private final BookRepository bookRepo;
    private final BookCategoryRepository bookCategoryRepo;
    private final SellInfoRepository sellInfoRepo;
    private final UserRepository userRepo;
    private final RatingRepository ratingRepo;

    public BookController(BookRepository bookRepo, BookCategoryRepository bookCategoryRepo,
            SellInfoRepository sellInfoRepo, UserRepository userRepo, RatingRepository ratingRepo) {
        this.bookRepo = bookRepo;
        this.bookCategoryRepo = bookCategoryRepo;
        this.sellInfoRepo = sellInfoRepo;
        this.userRepo = userRepo;
        this.ratingRepo = ratingRepo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBook(@PathVariable int id) {
        Optional<Book> book = bookRepo.findById(id);

        if (book.isEmpty())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(book.get());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity.ok(bookRepo.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(String query, int categoryId) {
        List<Book> books = bookRepo.search(query);

        if (categoryId > 0) {
            books.retainAll(bookRepo.findAllByCategoryId(categoryId));
        }

        return ResponseEntity.ok(books);
    }

    @GetMapping("/getByCategory")
    public ResponseEntity<?> getByCategory(int categoryId) {
        return ResponseEntity.ok(bookRepo.findAllByCategoryId(categoryId));
    }

    @GetMapping("/allCat")
    public ResponseEntity<?> getAllBookCategories() {
        return ResponseEntity.ok(bookCategoryRepo.findAll());
    }

    @PostMapping("/createBook")
    @PreAuthorize(RoleConstants.USER)
    public ResponseEntity<?> createBook(@Valid @RequestBody BookCreateInfo createInfo) {
        if (!bookCategoryRepo.existsById(createInfo.getCategoryId())) {
            return ResponseEntity.badRequest().build();
        }

        BookCategory cat = bookCategoryRepo.getById(createInfo.getCategoryId());

        Book book = new Book();
        book.setAuthor(createInfo.getAuthor());
        book.setCategory(cat);
        book.setDescription(createInfo.getDescription());
        book.setTitle(createInfo.getTitle());
        book.setImageUrl(createInfo.getImageUrl());

        bookRepo.save(book);

        return ResponseEntity.ok(book);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(RoleConstants.ADMIN)
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        Optional<Book> book = bookRepo.findById(id);

        if (book.isEmpty())
            return ResponseEntity.notFound().build();

        bookRepo.delete(book.get());

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    @PreAuthorize(RoleConstants.USER)
    public ResponseEntity<?> editBook(@Valid @RequestBody BookCreateInfo createInfo, @PathVariable int id) {
        Book book = bookRepo.findById(id).orElse(null);
        if (book == null)
            return ResponseEntity.notFound().build();

        BookCategory cat = bookCategoryRepo.findById(createInfo.getCategoryId()).orElse(null);
        if (cat == null)
            return ResponseEntity.notFound().build();

        book.setCategory(cat);
        book.setTitle(createInfo.getTitle());
        book.setAuthor(createInfo.getAuthor());
        book.setImageUrl(createInfo.getImageUrl());
        book.setDescription(createInfo.getDescription());

        bookRepo.save(book);

        return ResponseEntity.ok(book);
    }

    @PostMapping("/{id}/sellInfo")
    @PreAuthorize(RoleConstants.USER)
    public ResponseEntity<?> addSellInfo(@Valid @RequestBody SellCreateInfo createInfo, @PathVariable int id) {
        Book book = bookRepo.findById(id).orElse(null);
        if (book == null)
            return ResponseEntity.notFound().build();

        SellInfo sellInfo = new SellInfo();
        sellInfo.setBook(book);
        sellInfo.setLocation(createInfo.getLocation());
        sellInfo.setPrice(createInfo.getPrice());

        sellInfoRepo.save(sellInfo);

        return ResponseEntity.ok(sellInfo);
    }

    @GetMapping("/{id}/sellInfo")
    public ResponseEntity<?> getSellInfos(@PathVariable int id) {
        Book book = bookRepo.findById(id).orElse(null);
        if (book == null)
            return ResponseEntity.notFound().build();

        List<SellInfo> infos = sellInfoRepo.findAllByBook(book);

        return ResponseEntity.ok(infos);
    }

    @PreAuthorize(RoleConstants.USER)
    @GetMapping("/{id}/rate")
    public ResponseEntity<?> getUserBookRating(@PathVariable int id) {
        Book book = bookRepo.findById(id).orElse(null);
        if (book == null)
            return ResponseEntity.notFound().build();

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User currentUser = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();

        Optional<Rating> existing = ratingRepo.findByBookAndAuthor(book, currentUser);

        if (existing.isPresent()) {
            return ResponseEntity.ok(existing.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize(RoleConstants.USER)
    @PostMapping("/{id}/rate")
    public ResponseEntity<?> postRateBook(@PathVariable int id, int ratingValue) {
        Book book = bookRepo.findById(id).orElse(null);
        if (book == null)
            return ResponseEntity.notFound().build();

        if (ratingValue < 1 || ratingValue > 5)
            return ResponseEntity.badRequest().build();

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User currentUser = userRepo.findByUsername(userDetails.getUsername()).orElseThrow();

        Optional<Rating> existing = ratingRepo.findByBookAndAuthor(book, currentUser);

        // if a rating on this book already exists by this user, update it
        if (existing.isPresent()) {
            existing.get().setRatedAt(LocalDateTime.now());
            existing.get().setRating(ratingValue);

            return ResponseEntity.ok(ratingRepo.save(existing.get()));
        } else {
            Rating rating = new Rating();
            rating.setBook(book);
            rating.setRatedAt(LocalDateTime.now());
            rating.setRating(ratingValue);
            rating.setAuthor(currentUser);

            return ResponseEntity.ok(ratingRepo.save(rating));
        }
    }

    @GetMapping("/{id}/avgRating")
    public ResponseEntity<?> getAverageRating(@PathVariable int id) {
        Book book = bookRepo.findById(id).orElse(null);
        if (book == null)
            return ResponseEntity.notFound().build();

        Collection<Rating> ratings = ratingRepo.findByBook(book);

        return ResponseEntity.ok(ratings.stream().mapToDouble(Rating::getRating).average());
    }

    @GetMapping("/bestLastMonth")
    public ResponseEntity<?> getBestInLastMonth() {
        // used for connecting the book and it's average rating
        class BookRating {
            private Book book;
            private double rating;

            public BookRating(Book book, double rating) {
                this.book = book;
                this.rating = rating;
            }

            public Book getBook() {
                return book;
            }

            public double getRating() {
                return rating;
            }
        }

        LocalDateTime monthAgo = LocalDate.now().minusMonths(1).atStartOfDay();

        Collection<Rating> ratings = ratingRepo.findAllByRatedAtAfter(monthAgo);

        // group all ratings by their book and average their rating
        Map<Book, Double> groupedRatings = ratings.stream()
                .collect(Collectors.groupingBy(Rating::getBook, Collectors.averagingDouble(Rating::getRating)));

        List<BookRating> bookRatings = new ArrayList<>();

        for (Map.Entry<Book, Double> entry : groupedRatings.entrySet()) {
            bookRatings.add(new BookRating(entry.getKey(), entry.getValue()));
        }

        bookRatings.sort(Comparator.comparing(BookRating::getRating).reversed());

        return ResponseEntity.ok(bookRatings);
    }
}
