show databases;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

use myblog;

show tables;

insert into users(username, `password`, realname) values('kaina','0401', 'ckn');
insert into users(username, `password`, realname) values('zhenzhen','0906', 'hzz');

insert into blogs(title, content,  createtime, author) values('标题1','内容1', '1601178804924','zhenzhen');
insert into blogs(title, content,  createtime, author) values('标题2','内容2', '1601178804924','kaina');
insert into blogs(title, content,  createtime, author) values('标题3','内容3', '1601178804924','zhenzhen');

select * from  users;

select id from  users;
SET SQL_SAFE_UPDATES=0;
update users set realname='ckn' where realname='kaina1';
delete from users where username='kaina';

