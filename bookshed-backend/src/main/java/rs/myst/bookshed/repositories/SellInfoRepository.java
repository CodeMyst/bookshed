package rs.myst.bookshed.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.myst.bookshed.model.Book;
import rs.myst.bookshed.model.SellInfo;

public interface SellInfoRepository extends JpaRepository<SellInfo, Integer> {
    List<SellInfo> findAllByBook(Book book);
}
