package rs.myst.bookshed.payload;

public class PostCreateInfo {
    private String content;
    private boolean sticky;

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
}
