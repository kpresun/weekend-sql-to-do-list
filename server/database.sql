CREATE TABLE fintodo (
	"id" serial primary key,
	"name" varchar(80),
	"description" varchar(250),
	"status" boolean not null
);

DROP TABLE fintodo;

INSERT INTO fintodo ("name", "description", "status")
			VALUES ('BBQ', 'j4 party', FALSE );