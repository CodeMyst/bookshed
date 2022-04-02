package rs.myst.bookshed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.myst.bookshed.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}