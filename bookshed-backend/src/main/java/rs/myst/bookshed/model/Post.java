package rs.myst.bookshed.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "post")
public class Post {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @JoinColumn(name = "author", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User author;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "sticky", nullable = false)
    private boolean sticky;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_edit", nullable = true)
    private LocalDateTime lastEdit;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getAuthor() {
        return this.author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isSticky() {
        return this.sticky;
    }

    public boolean getSticky() {
        return this.sticky;
    }

    public void setSticky(boolean sticky) {
        this.sticky = sticky;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastEdit() {
        return this.lastEdit;
    }

    public void setLastEdit(LocalDateTime lastEdit) {
        this.lastEdit = lastEdit;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Post)) {
            return false;
        }
        Post post = (Post) o;
        return id == post.id && Objects.equals(title, post.title) && Objects.equals(author, post.author) && Objects.equals(content, post.content) && sticky == post.sticky && Objects.equals(createdAt, post.createdAt) && Objects.equals(lastEdit, post.lastEdit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, author, content, sticky, createdAt, lastEdit);
    }
}
