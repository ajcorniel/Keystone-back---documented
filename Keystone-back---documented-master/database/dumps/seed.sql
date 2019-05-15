INSERT INTO public.type_users(type_id, description, role)
VALUES (3,'Super user has everything under control', 'superuser');

INSERT INTO public.type_users(type_id, description, role) 
VALUES (2,'A normal admin', 'admin');

INSERT INTO public.type_users(type_id, description, role)
VALUES (1,'A custom user', 'custom');

INSERT INTO public.users 
(firstname, lastname, password, email, type_id, date_created, last_login) values 
('Eduardo', 'Gonzalez', '$2b$10$QADv6U0Q04BHxIQwQp3b/OFTsTeDLClc.JykFLnzDp4WTPVCg8TSO' , 'eg@email.com', 3, NOW(), NOW());
