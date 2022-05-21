package rs.myst.bookshed.model;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "rating")
public class Rating {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @JoinColumn(name = "book_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Book book;

    @JoinColumn(name = "author", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User author;

    @Column(name = "rated_at", nullable = false)
    private LocalDateTime ratedAt;

    @Column(name = "rating_value", nullable = false)
    private int rating;


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Book getBook() {
        return this.book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public User getAuthor() {
        return this.author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public LocalDateTime getRatedAt() {
        return this.ratedAt;
    }

    public void setRatedAt(LocalDateTime ratedAt) {
        this.ratedAt = ratedAt;
    }

    public int getRating() {
        return this.rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Rating)) {
            return false;
        }
        Rating rating = (Rating) o;
        return id == rating.id && Objects.equals(book, rating.book) && Objects.equals(author, rating.author) && Objects.equals(ratedAt, rating.ratedAt) && this.rating == rating.rating;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, book, author, ratedAt, rating);
    }
}
