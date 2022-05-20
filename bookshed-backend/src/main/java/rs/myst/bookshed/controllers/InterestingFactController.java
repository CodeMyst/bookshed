package rs.myst.bookshed.controllers;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rs.myst.bookshed.constants.RoleConstants;
import rs.myst.bookshed.model.InterestingFact;
import rs.myst.bookshed.repositories.InterestingFactRepository;

@RestController
@RequestMapping("/api/fact")
public class InterestingFactController {
    private final InterestingFactRepository factRepo;

    public InterestingFactController(InterestingFactRepository factRepo) {
        this.factRepo = factRepo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFact(@PathVariable int id) {
        InterestingFact fact = factRepo.findById(id).orElse(null);

        if (fact == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(fact);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllFacts() {
        return ResponseEntity.ok(factRepo.findAll());
    }

    @PostMapping("/create")
    @PreAuthorize(RoleConstants.ADMIN)
    public ResponseEntity<?> createFact(@Valid @RequestBody String content) {
        InterestingFact fact = new InterestingFact();
        fact.setContent(content);
        fact.setCreatedAt(LocalDateTime.now());

        factRepo.save(fact);
        
        return ResponseEntity.ok(fact);
    }
}

