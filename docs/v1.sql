create table role(
	key text primary key,
	name text
);
INSERT INTO public."role" ("key","name") VALUES
	 ('SUPERADMIN','SuperAdmin'),
	 ('ADMIN','Admin'),
	 ('SUBSCRIBER','Subscriber');

create table customer(
  name text not null,
  website text,
  address text
);
alter table customer add column id SERIAL ;
alter table customer add CONSTRAINT pk_id primary key (id);

create table users(
id SERIAL primary key,
firstname varchar(127) not null,
middlename varchar(127),
email varchar(63),
phone varchar(15),
role varchar(15),
address text,
created_on timestamp not null,
modified_on timestamp default now()
);

alter table customer add column user_id int ;
alter table customer add constraint fk_user FOREIGN KEY (user_id) REFERENCES users(id);

