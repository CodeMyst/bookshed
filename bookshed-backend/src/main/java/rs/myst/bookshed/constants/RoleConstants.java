package rs.myst.bookshed.constants;

public class RoleConstants {
    public final static String USER = "hasAnyAuthority('USER', 'ADMIN')";
    public final static String ADMIN = "hasAuthority('ADMIN')";
}
