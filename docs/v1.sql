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

