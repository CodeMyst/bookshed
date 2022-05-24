package rs.myst.bookshed.controllers;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/")
    public ResponseEntity<?> getFact() {
        InterestingFact fact = factRepo.findFirstByOrderById();

        if (fact == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(fact);
    }

    @PostMapping("/")
    @PreAuthorize(RoleConstants.ADMIN)
    public ResponseEntity<?> createFact(@Valid @RequestBody String content) {
        InterestingFact fact = factRepo.findFirstByOrderById();

        if (fact == null) {
            fact = new InterestingFact();
        }

        fact.setContent(content);
        fact.setCreatedAt(LocalDateTime.now());

        factRepo.save(fact);

        return ResponseEntity.ok(fact);
    }
}
