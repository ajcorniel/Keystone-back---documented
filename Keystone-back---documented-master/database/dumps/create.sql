CREATE TABLE type_users(
	type_id INTEGER NOT NULL,
	description VARCHAR NOT NULL,
	role VARCHAR NOT NULL,
	CONSTRAINT type_users_pk PRIMARY KEY (type_id)
);

CREATE SEQUENCE users_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647
START WITH 1 CACHE 1 NO CYCLE OWNED BY NONE;

ALTER SEQUENCE users_id_seq OWNER TO postgres;

CREATE TABLE users(
	firstname character varying(255),
	lastname character varying(255),
	date_created timestamp,
	user_id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	email character varying(255) UNIQUE,
	password character varying(255),
	type_id INTEGER DEFAULT 1,
	last_login TIMESTAMP,
	CONSTRAINT users_pkey PRIMARY KEY(user_id)
);

ALTER TABLE users ADD CONSTRAINT type_users_users_fk
FOREIGN KEY (type_id)
REFERENCES type_users (type_id)
ON DELETE CASCADE ON UPDATE CASCADE;

CREATE SEQUENCE password_reset_seq INCREMENT BY 1 MINVALUE 1
MAXVALUE 2147483647 START WITH 1 CACHE 1 NO CYCLE
OWNED BY NONE;

ALTER SEQUENCE password_reset_seq OWNER TO postgres;

CREATE TABLE password_reset(
	id integer NOT NULL DEFAULT nextval('password_reset_seq' ::regclass),
	code character varying (255) NOT NULL,
	created_at timestamp NOT NULL,
	valid_until timestamp NOT NULL,
	user_id integer NOT NULL,
	CONSTRAINT password_reset_pkey PRIMARY KEY(id)
);

ALTER TABLE password_reset ADD CONSTRAINT user_fk FOREIGN KEY (user_id)
REFERENCES users (user_id) MATCH FULL
ON DELETE CASCADE 
ON UPDATE CASCADE;

CREATE TABLE estates
(
	estate_id INTEGER NOT NULL,
	title VARCHAR NOT NULL,
	bathrooms VARCHAR NOT NULL,
	metters INTEGER NOT NULL,
	description VARCHAR NOT NULL,
	photos VARCHAR NOT NULL,
	price VARCHAR NOT NULL,
	options VARCHAR NOT NULL,
	date_created TIMESTAMP NOT NULL,
	type VARCHAR NOT NULL,
	user_id INTEGER NOT NULL,
	CONSTRAINT estates_pk PRIMARY KEY (estate_id)
);

ALTER TABLE estates ADD CONSTRAINT users_estates_fk
FOREIGN KEY (user_id)
REFERENCES users (user_id)
ON DELETE CASCADE ON UPDATE CASCADE
NOT DEFERRABLE;
