create database if not exists bookshed;

drop schema if exists bookshed;
create schema if not exists bookshed;
use bookshed;


drop table if exists bookshed.user;

create table user
(
    username      varchar(50)            not null primary key,
    email         varchar(50)            not null,
    role          enum ('ADMIN', 'USER') not null,
    password_hash tinytext               not null,
    created_at    datetime               not null
);


drop table if exists bookshed.book_category;

create table book_category
(
    id   int         not null primary key auto_increment,
    name varchar(50) not null
);


drop table if exists bookshed.book;

create table book
(
    id          int         not null primary key auto_increment,
    title       varchar(50) not null,
    author      varchar(50) not null,
    category_id int         not null,
    description mediumtext  not null,
    image_url   tinytext,

    constraint fk_book_category
        foreign key (category_id)
            references book_category (id)
);


drop table if exists bookshed.review;

create table review
(
    id         int         not null primary key auto_increment,
    book_id    int         not null,
    author     varchar(50) not null,
    content    mediumtext  not null,
    created_at datetime    not null,
    last_edit  datetime    not null,

    constraint fk_book_id
        foreign key (book_id)
            references book (id),

    constraint fk_author
        foreign key (author)
            references user (username)
);


insert into book_category (name)
values ('Fantasy');
insert into book_category (name)
values ('Adventure');
insert into book_category (name)
values ('Romance');
insert into book_category (name)
values ('Contemporary');
insert into book_category (name)
values ('Dystopian');
insert into book_category (name)
values ('Mystery');
insert into book_category (name)
values ('Horror');
insert into book_category (name)
values ('Thriller');
insert into book_category (name)
values ('Paranormal');
insert into book_category (name)
values ('Historical fiction');
insert into book_category (name)
values ('Science Fiction');
insert into book_category (name)
values ('Children’s');
insert into book_category (name)
values ('Memoir');
insert into book_category (name)
values ('Cooking');
insert into book_category (name)
values ('Art');
insert into book_category (name)
values ('Self-help / Personal');
insert into book_category (name)
values ('Development');
insert into book_category (name)
values ('Motivational');
insert into book_category (name)
values ('Health');
insert into book_category (name)
values ('History');
insert into book_category (name)
values ('Travel');
insert into book_category (name)
values ('Guide / How-to');
insert into book_category (name)
values ('Families & Relationships');
insert into book_category (name)
values ('Humor');


insert into book (title, author, category_id, description, image_url)
values ('Pride and Prejudice',
        'Jane Austen',
        7,
        'It is a truth universally acknowledged that when most people think of Jane Austen they think of this charming and humorous story of love, difficult families and the tricky task of finding a handsome husband with a good fortune.',
        'https://www.penguin.co.uk/content/dam/prh/books/183/183689/9780141199078.jpg.transform/PRHDesktopWide_small/image.jpg');

insert into book (title, author, category_id, description, image_url)
values ('To Kill a Mockingbird',
        'Harper Lee',
        14,
        'A novel before its time, Harper Lee’s Pulitzer-prize winner addresses issues of race, inequality and segregation with both levity and compassion. Told through the eyes of loveable rogues Scout and Jem, it also created one of literature’s most beloved heroes – Atticus Finch, a man determined to right the racial wrongs of the Deep South.',
        'https://www.penguin.co.uk/content/dam/prh/books/108/1088099/9781784752637.jpg.transform/PRHDesktopWide_small/image.jpg');

insert into book (title, author, category_id, description, image_url)
values ('The Great Gatsby',
        'F. Scott Fitzgerald',
        9,
        'Jay Gatsby, the enigmatic millionaire who throws decadent parties but doesn’t attend them, is one of the great characters of American literature. This is F. Scott Fitzgerald at his most sparkling and devastating',
        'https://www.penguin.co.uk/content/dam/prh/books/566/56606/9780141182636.jpg.transform/PRHDesktopWide_small/image.jpg');

insert into book (title, author, category_id, description, image_url)
values ('Cold Blood',
        'Truman Capote',
        7,
        'The ‘true crime’ TV show / podcast you’re obsessed with probably owes a debt to this masterpiece of reportage by Truman Capote. Chilling and brilliant.',
        'https://www.penguin.co.uk/content/dam/prh/books/570/57020/9780141182575.jpg.transform/PRHDesktopWide_small/image.jpg');;

insert into book (title, author, category_id, description, image_url)
values ('Wide Sargasso Sea',
        'Jean Rhys',
        8,
        'Jean Rhys wrote this feminist and anti-colonial prequel to Charlotte Bronte’s novel Jane Eyre which chronicles the events of Mr Rochester’s disastrous marriage to Antoinette Conway or Bertha as we come to know her.',
        'https://www.penguin.co.uk/content/dam/prh/books/572/57281/9780241281901.jpg.transform/PRHDesktopWide_small/image.jpg');;

insert into book (title, author, category_id, description, image_url)
values ('Brave New World',
        'Aldous Huxley',
        6,
        'One of the greatest and most prescient dystopian novels ever written, this should be on everyone’s must-read list.',
        'https://www.penguin.co.uk/content/dam/prh/books/111/1110001/9781784870140.jpg.transform/PRHDesktopWide_small/image.jpg');;

insert into book (title, author, category_id, description, image_url)
values ('I Capture The Castle',
        'Dodie Smith',
        20,
        'Cassandra Mortmain’s upbringing in a crumbling castle with her eccentric family may not be everyone’s experience, but we can guarantee her coming-of-age story with all its enchanting and disenchanting moments will resonate for many.',
        'https://www.penguin.co.uk/content/dam/prh/books/296/296874/9780141371504.jpg.transform/PRHDesktopWide_small/image.jpg');;

insert into book (title, author, category_id, description, image_url)
values ('Jane Eyre',
        'Charlotte Bronte',
        3,
        'One of literature’s steeliest heroines, in her short life Jane Eyre has overcome a traumatic childhood only to be challenged by secrets, strange noises and mysterious fires in her new home of Thornfield Hall. All while falling in love with her employer, Mr Rochester. A Gothic masterpiece which was groundbreaking in its intimate use of the first-person narrative.',
        'https://www.penguin.co.uk/content/dam/prh/books/342/34231/9780141040387.jpg.transform/PRHDesktopWide_small/image.jpg');;

insert into book (title, author, category_id, description, image_url)
values ('Crime and Punishment',
        'Fyodor Dostoevsky',
        7,
        'This novel is a masterful and completely captivating depiction of a man experiencing a profound mental unravelling. No amount of ethical bargaining on Raskolnikov’s part can free him from the parasitic guilt nested in his soul. A brilliant read if you loved Breaking Bad.',
        'https://www.penguin.co.uk/content/dam/prh/books/354/35469/9780140449136.jpg.transform/PRHDesktopWide_small/image.jpg');;

insert into book (title, author, category_id, description, image_url)
values ('The Call of the Wild',
        'Jack London',
        14,
        'Jack London was a gold prospector in the Canadian wilderness and used his experiences to write about a dog named Buck who becomes a leader of the wild. With themes exploring nature and the struggle for existence in the frozen Alaskan landscape.',
        'https://www.penguin.co.uk/content/dam/prh/books/595/59518/9780141321059.jpg.transform/PRHDesktopWide_small/image.jpg');
