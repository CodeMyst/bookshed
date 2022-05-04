import { Book } from './book';

export class GlobalConstants {
  public static viewedBook: Book;

  // used as a list of books on home page (also as search results)
  public static books: Book[];
  public static onSearch: any;

  public static goToPage: any;
}
