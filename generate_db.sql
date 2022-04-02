create database if not exists bookshed;

create table user
(
    username      varchar(50)            not null primary key,
    email         varchar(50)            not null,
    role          enum ('ADMIN', 'USER') not null,
    password_hash tinytext               not null,
    created_at    datetime               not null
);
