-- Database: reduct

-- DROP DATABASE reduct;

CREATE DATABASE reduct
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE reduct TO postgres;

GRANT TEMPORARY, CONNECT ON DATABASE reduct TO PUBLIC;

-- Table: public.links

-- DROP TABLE public.links;

CREATE TABLE IF NOT EXISTS public.links
(
    id text COLLATE pg_catalog."default" NOT NULL,
    iduser text COLLATE pg_catalog."default" NOT NULL,
    linkoriginal text COLLATE pg_catalog."default" NOT NULL,
    linkreduzido text COLLATE pg_catalog."default" NOT NULL,
    data date NOT NULL,
    ranking numeric(255,0) NOT NULL,
    idpl text COLLATE pg_catalog."default",
    CONSTRAINT links_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.links
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    nome text COLLATE pg_catalog."default" NOT NULL,
    "user" text COLLATE pg_catalog."default" NOT NULL,
    senha text COLLATE pg_catalog."default" NOT NULL,
    idp text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;


INSERT INTO links (id, iduser, linkoriginal, linkreduzido, data, ranking, idpl)
VALUES ('123', '432', 'http://linkoriginal.com', 'http://linkreduzido.com', '12/12/2021', '3', '4556')