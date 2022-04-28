package rs.myst.bookshed.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Post {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "author")
    private String author;
    @Basic
    @Column(name = "content")
    private String content;
    @Basic
    @Column(name = "sticky")
    private boolean sticky;
    @Basic
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Basic
    @Column(name = "last_edit")
    private LocalDateTime lastEdit;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isSticky() {
        return sticky;
    }

    public void setSticky(boolean sticky) {
        this.sticky = sticky;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastEdit() {
        return lastEdit;
    }

    public void setLastEdit(LocalDateTime lastEdit) {
        this.lastEdit = lastEdit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return id == post.id && sticky == post.sticky && Objects.equals(author, post.author) && Objects.equals(content, post.content) && Objects.equals(createdAt, post.createdAt) && Objects.equals(lastEdit, post.lastEdit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, author, content, sticky, createdAt, lastEdit);
    }
}
