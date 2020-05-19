select * from sequelizemeta;

-- User Admin
insert users (login, email, `password`, `name`, is_admin, created_at, updated_at) 
value ('admin', 'admin@gmail.com', '123', 'administrador', 1, now(), now());

select * from users;

-- User Investor
insert users (login, email, `password`, `name`, created_at, updated_at) 
value ('investor', 'investor@gmail.com', '123', 'investidor', now(), now());

insert investors (id_user) value (2);

select * from investors;

-- User Consultant
insert users (login, email, `password`, `name`, created_at, updated_at) 
value ('consultant', 'consultant@gmail.com', '123', 'consultant', now(), now());

insert consultants (id_user) value (3);

select * from consultants;

-- User Administrator

insert users (login, email, `password`, `name`, created_at, updated_at) 
value ('administrator', 'administrator@gmail.com', '123', 'administrator', now(), now());

insert administrators (id_user) value (4);

select * from administrators;

-- Consultant has Investor

select * from consultant_investor