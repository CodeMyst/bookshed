package rs.myst.bookshed.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import rs.myst.bookshed.payload.BookCreateInfo;
import rs.myst.bookshed.repositories.BookCategoryRepository;
import rs.myst.bookshed.repositories.BookRepository;

@RestController
@RequestMapping("/api/book")
public class BookController {
    private final BookRepository bookRepo;
    private final BookCategoryRepository bookCategoryRepo;

    public BookController(BookRepository bookRepo, BookCategoryRepository bookCategoryRepo) {
        this.bookRepo = bookRepo;
        this.bookCategoryRepo = bookCategoryRepo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBook(@PathVariable int id) {
        Optional<Book> book = bookRepo.findById(id);

        if (book.isEmpty()) return ResponseEntity.notFound().build();

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

        if (book.isEmpty()) return ResponseEntity.notFound().build();

        bookRepo.delete(book.get());

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    @PreAuthorize(RoleConstants.USER)
    public ResponseEntity<?> editBook(@Valid @RequestBody BookCreateInfo createInfo, @PathVariable int id) {
        Book book  = bookRepo.findById(id).orElse(null);
        if (book == null) return ResponseEntity.notFound().build();

        BookCategory cat = bookCategoryRepo.findById(createInfo.getCategoryId()).orElse(null);
        if (cat == null) return ResponseEntity.notFound().build();

        book.setCategory(cat);
        book.setTitle(createInfo.getTitle());
        book.setAuthor(createInfo.getAuthor());
        book.setImageUrl(createInfo.getImageUrl());
        book.setDescription(createInfo.getDescription());

        bookRepo.save(book);

        return ResponseEntity.ok(book);
    }
}
