package rs.myst.bookshed.model;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "interesting_fact")
public class InterestingFact {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof InterestingFact)) {
            return false;
        }
        InterestingFact interestingFact = (InterestingFact) o;
        return id == interestingFact.id && Objects.equals(createdAt, interestingFact.createdAt) && Objects.equals(content, interestingFact.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, createdAt, content);
    }
}
