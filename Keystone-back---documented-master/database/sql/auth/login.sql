SELECT *
FROM public.users
WHERE email = $1 AND password = $2;