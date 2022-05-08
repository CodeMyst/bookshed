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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "post_reply")
public class PostReply {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @JoinColumn(name = "post_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Post post;

    @JoinColumn(name = "author", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User author;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_edit", nullable = true)
    private LocalDateTime lastEdit;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @JsonBackReference()
    public Post getPost() {
        return this.post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getAuthor() {
        return this.author;
    }

    public void setAuthor(User author) {
        this.author = author;
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
        if (!(o instanceof PostReply)) {
            return false;
        }
        PostReply postReply = (PostReply) o;
        return id == postReply.id && Objects.equals(post, postReply.post) && Objects.equals(author, postReply.author) && Objects.equals(createdAt, postReply.createdAt) && Objects.equals(lastEdit, postReply.lastEdit) && Objects.equals(content, postReply.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, post, author, createdAt, lastEdit, content);
    }
}
