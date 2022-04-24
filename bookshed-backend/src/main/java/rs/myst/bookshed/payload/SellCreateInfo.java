package rs.myst.bookshed.payload;

import java.math.BigDecimal;

public class SellCreateInfo {
    private String location;
    private BigDecimal price;

    public String getLocation() {
        return location;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
