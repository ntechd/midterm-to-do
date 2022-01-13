-- Users table seeds here (Example)
-- Insert some data in users table
INSERT INTO users (email,password)
 VALUES ('patelneema93@gmail.com','12345'),
 ('patelheeya@gmail.com','12345'),
 ('megha@gmail.com','12345'),
 ('christian@gmail.com','12345');
-- Insert some data in categories table
INSERT INTO categories (name)
VALUES ('to_eat'),
('to_read'),
('to_watch'),
('to_buy');
-- Insert some data in tasks table
INSERT INTO tasks (name,date_time,category_id,user_id)
VALUES('buy apple','2021-11-30',1,1),
('kids story','2021-12-01',2,2),
('A Boy Called Cristmas','2021-12-02',1,3),
('Table','2021-12-03',3,4);