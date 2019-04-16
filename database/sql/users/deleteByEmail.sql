DELETE FROM public.users WHERE EXISTS (SELECT 1
FROM public.users
WHERE email = $1);