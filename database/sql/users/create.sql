INSERT INTO public.users
    (firstname, lastname, email, password, last_login, date_created, type_id)
VALUES
    ($1, $2, $3, $4, $5, $6, $7) RETURNING *;