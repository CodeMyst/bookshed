create database if not exists bookshed;


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


insert into book_category (name) values ('Fantasy');
insert into book_category (name) values ('Adventure');
insert into book_category (name) values ('Romance');
insert into book_category (name) values ('Contemporary');
insert into book_category (name) values ('Dystopian');
insert into book_category (name) values ('Mystery');
insert into book_category (name) values ('Horror');
insert into book_category (name) values ('Thriller');
insert into book_category (name) values ('Paranormal');
insert into book_category (name) values ('Historical fiction');
insert into book_category (name) values ('Science Fiction');
insert into book_category (name) values ('Children’s');
insert into book_category (name) values ('Memoir');
insert into book_category (name) values ('Cooking');
insert into book_category (name) values ('Art');
insert into book_category (name) values ('Self-help / Personal');
insert into book_category (name) values ('Development');
insert into book_category (name) values ('Motivational');
insert into book_category (name) values ('Health');
insert into book_category (name) values ('History');
insert into book_category (name) values ('Travel');
insert into book_category (name) values ('Guide / How-to');
insert into book_category (name) values ('Families & Relationships');
insert into book_category (name) values ('Humor');
