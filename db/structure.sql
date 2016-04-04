--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: developer_activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE developer_activities (
    id integer NOT NULL,
    payload hstore NOT NULL,
    developer_id integer NOT NULL,
    event_occurred_at timestamp with time zone NOT NULL,
    event_id bigint NOT NULL,
    event_type text NOT NULL,
    repo_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: developer_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE developer_activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: developer_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE developer_activities_id_seq OWNED BY developer_activities.id;


--
-- Name: developers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE developers (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: event_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE event_types (
    name text NOT NULL
);


--
-- Name: github_fetchers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE github_fetchers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: github_fetchers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE github_fetchers (
    id integer DEFAULT nextval('github_fetchers_id_seq'::regclass) NOT NULL,
    last_fetched_at timestamp with time zone,
    requests integer DEFAULT 0 NOT NULL,
    organization text NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY developer_activities ALTER COLUMN id SET DEFAULT nextval('developer_activities_id_seq'::regclass);


--
-- Name: developer_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY developer_activities
    ADD CONSTRAINT developer_activities_pkey PRIMARY KEY (id);


--
-- Name: developers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY developers
    ADD CONSTRAINT developers_pkey PRIMARY KEY (id);


--
-- Name: event_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY event_types
    ADD CONSTRAINT event_types_pkey PRIMARY KEY (name);


--
-- Name: github_fetchers_organization_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY github_fetchers
    ADD CONSTRAINT github_fetchers_organization_uniq UNIQUE (organization);


--
-- Name: github_fetchers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY github_fetchers
    ADD CONSTRAINT github_fetchers_pkey PRIMARY KEY (id);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- Name: developer_activities_developer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY developer_activities
    ADD CONSTRAINT developer_activities_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES developers(id);


--
-- Name: developer_activities_event_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY developer_activities
    ADD CONSTRAINT developer_activities_event_type_fkey FOREIGN KEY (event_type) REFERENCES event_types(name);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO schema_migrations (version) VALUES ('20160216174711');

INSERT INTO schema_migrations (version) VALUES ('20160223194044');

INSERT INTO schema_migrations (version) VALUES ('20160401143232');

INSERT INTO schema_migrations (version) VALUES ('20160401165055');

