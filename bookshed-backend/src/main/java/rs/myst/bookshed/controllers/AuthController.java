package rs.myst.bookshed.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import rs.myst.bookshed.model.User;
import rs.myst.bookshed.model.UserRole;
import rs.myst.bookshed.payload.LoginRequest;
import rs.myst.bookshed.payload.MessageResponse;
import rs.myst.bookshed.payload.RegisterRequest;
import rs.myst.bookshed.repositories.UserRepository;
import rs.myst.bookshed.services.UserDetailsImpl;
import rs.myst.bookshed.utils.JwtUtils;

import javax.validation.Valid;
import java.sql.Timestamp;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepo;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authManager;

    private final JwtUtils jwtUtils;

    public AuthController(UserRepository userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authManager, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
        this.jwtUtils = jwtUtils;
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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {
        if (!userRepo.existsByUsername(request.getUsername())) {
            return ResponseEntity.notFound().build();
        }

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(auth);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        ResponseCookie cookie = jwtUtils.generateJwtCookies(userDetails);

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }

    @GetMapping("/self")
    public ResponseEntity<?> getSelf() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof AnonymousAuthenticationToken) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        return ResponseEntity.ok(userRepo.findByUsername(userDetails.getUsername()));
    }
}
