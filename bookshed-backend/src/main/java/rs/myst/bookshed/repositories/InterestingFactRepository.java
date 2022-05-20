package rs.myst.bookshed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.myst.bookshed.model.InterestingFact;

public interface InterestingFactRepository extends JpaRepository<InterestingFact, Integer> {
    public InterestingFact findFirstByOrderById();
}
