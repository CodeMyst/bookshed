package rs.myst.bookshed.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.myst.bookshed.model.User;
import rs.myst.bookshed.model.UserRole;
import rs.myst.bookshed.payload.MessageResponse;
import rs.myst.bookshed.payload.RegisterRequest;
import rs.myst.bookshed.repositories.UserRepository;

import javax.validation.Valid;
import java.sql.Timestamp;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepo;

    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        if (userRepo.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken."));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        user.setEmail(request.getEmail());

        // first user that registers will have the admin role
        user.setRole(userRepo.count() == 0 ? UserRole.ADMIN : UserRole.USER);

        userRepo.save(user);

        return ResponseEntity.ok().build();
    }
}
