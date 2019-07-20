\c ttp_fs 

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS transactions;

CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    cash_balance integer DEFAULT 5000 NOT NULL
);

CREATE TABLE transactions (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES users,
    date_time timestamp without time zone DEFAULT NOW() NOT NULL,
    ticker_symbol text NOT NULL,
    shares integer NOT NULL,
    price integer NOT NULL,
    total_paid integer NOT NULL,
    account_balance integer NOT NULL
);