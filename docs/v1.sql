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


