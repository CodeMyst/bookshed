package rs.myst.bookshed.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.myst.bookshed.constants.RoleConstants;
import rs.myst.bookshed.model.Book;
import rs.myst.bookshed.model.BookCategory;
import rs.myst.bookshed.payload.BookCreateInfo;
import rs.myst.bookshed.repositories.BookCategoryRepository;
import rs.myst.bookshed.repositories.BookRepository;

import javax.validation.Valid;
import java.util.Optional;

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

    @PostMapping("/")
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
}
