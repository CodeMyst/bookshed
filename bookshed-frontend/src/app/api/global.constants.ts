import { DatePipe } from '@angular/common';
import { Book } from './book';

export class GlobalConstants {
  public static viewedBook: Book;

  // used as a list of books on home page (also as search results)
  public static books: Book[];
  public static onSearch: any;

  public static goToPage: any;

  public static formatDate = (date: Date): string => {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formatedDate: string | null = datepipe.transform(date, 'dd/MM/YYYY');
    return formatedDate != null ? formatedDate : "unknown";
  }
}
