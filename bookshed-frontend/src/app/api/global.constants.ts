import { User } from 'src/app/api/user';
import { Book } from './book';

export class GlobalConstants {
  // used for authentication
  public static currentUser: User | null = null;
  public static checkIfLogged: any;
  public static isLoggedIn: boolean;
  
  public static viewedBook: Book;

  // used as a list of books on home page (also as search results)
  public static books: Book[];
  public static onSearch: any;

  public static goToPage: any;
}