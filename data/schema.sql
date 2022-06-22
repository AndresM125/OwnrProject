CREATE TABLE animal_categories (
    id SERIAL PRIMARY KEY,
    category character varying(255)
);

CREATE TABLE animal_photos (
    id SERIAL PRIMARY KEY,
    category_id SERIAL REFERENCES animal_categories(id) ON DELETE CASCADE,
    photo_url text
);

CREATE TABLE admin_users (
    email character varying(255) PRIMARY KEY,
    password_hash character(60),
    first_name character varying(255),
    last_name character varying(255)
);