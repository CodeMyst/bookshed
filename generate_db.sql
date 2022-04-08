create database if not exists bookshed;

create table user
(
    username      varchar(50)            not null primary key,
    email         varchar(50)            not null,
    role          enum ('ADMIN', 'USER') not null,
    password_hash tinytext               not null,
    created_at    datetime               not null
);

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

create table book_category
(
    id   int         not null primary key auto_increment,
    name varchar(50) not null
);
