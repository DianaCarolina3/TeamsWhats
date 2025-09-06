CREATE DATABASE teamswhats;

\c teamswhats;

-- genera UUID random en postgresql (gen_random_uuid())
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
                                     id UUID PRIMARY KEY,
                                     name VARCHAR(100) NOT NULL,
                                     username VARCHAR(100) NOT NULL UNIQUE,
                                     created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS auth (
                                    id UUID PRIMARY KEY,
                                    username VARCHAR(255) NOT NULL UNIQUE,
                                    password VARCHAR(255) NOT NULL,
                                    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_follow (
                                           id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                                           user_from UUID NOT NULL,
                                           user_to UUID NOT NULL,
                                           created_at TIMESTAMP DEFAULT NOW(),

    -- relación con tabla de users
    --- si se borra un user, se borra el follow de todos los usuarios que lo siguen
                                           CONSTRAINT fk_user_from FOREIGN KEY (user_from) REFERENCES users(id) ON DELETE CASCADE,
                                           CONSTRAINT fk_user_to FOREIGN KEY (user_to) REFERENCES users(id) ON DELETE CASCADE,

    -- reglas de integridad
    --- un user no puede seguir dos veces a otro
    --- un user no puede seguirse a si mismo. (si son diferentes se cumple)
                                           CONSTRAINT unique_follow UNIQUE (user_from, user_to),
                                           CONSTRAINT no_self_follow CHECK (user_from != user_to)
);

CREATE TABLE IF NOT EXISTS post (
                                    id UUID PRIMARY KEY,
                                    user_id UUID NOT NULL,
                                    date TIMESTAMP NOT NULL,
                                    text TEXT,
                                    image TEXT,
                                    created_at TIMESTAMP DEFAULT NOW(),

    -- relación con tabla de users
                                    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_like (
                                         id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                                         like_from UUID NOT NULL,
                                         like_to_post UUID NOT NULL,
                                         created_at TIMESTAMP DEFAULT NOW(),

    -- relación con tabla de users
                                         CONSTRAINT fk_like_from FOREIGN KEY (like_from) REFERENCES users (id) ON DELETE CASCADE,
                                         CONSTRAINT fk_like_to_post FOREIGN KEY (like_to_post) REFERENCES post (id) ON DELETE CASCADE,

    -- reglas de integridad
    --- evitar duplicados
                                         CONSTRAINT unique_like UNIQUE (like_from, like_to_post)
);

CREATE TABLE IF NOT EXISTS chat (
                                    id UUID PRIMARY KEY,
                                    users_one UUID NOT NULL,
                                    users_two UUID NOT NULL,
                                    created_at TIMESTAMP DEFAULT NOW(),

    -- relación con tabla de users
                                    CONSTRAINT fk_users_one FOREIGN KEY (users_one) REFERENCES users(id) ON DELETE CASCADE,
                                    CONSTRAINT fk_users_two FOREIGN KEY (users_two) REFERENCES users(id) ON DELETE CASCADE,

    -- reglas de integridad
    --- no se repite el mismo chat dos veces
    --- no se puede chater consigo mismo
                                    CONSTRAINT unique_chat_pair UNIQUE (users_one, users_two),
                                    CONSTRAINT no_self_chat CHECK (users_one <> users_two)
);

CREATE TABLE IF NOT EXISTS message (
                                       id_message UUID PRIMARY KEY,
                                       chat_id UUID NOT NULL,
                                       sender_id UUID NOT NULL,
                                       sender_name TEXT NOT NULL,
                                       message TEXT,
                                       file_url TEXT,
                                       sent_at TIMESTAMP NOT NULL DEFAULT NOW(),

    -- relaciones con tabla de chat y users
                                       CONSTRAINT fk_chat FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE,
                                       CONSTRAINT fk_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,

    -- reglas de integridad
    --- un message o file_url no puede ser vacio
                                       CONSTRAINT message_not_empty CHECK (message IS NOT NULL OR file_url IS NOT NULL)
);
