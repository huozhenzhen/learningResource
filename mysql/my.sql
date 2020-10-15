show databases;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

use myblog;

show tables;

insert into users(username, `password`, realname, avatar, introduction, roles) values('kaina','0401', 'ckn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 'I am a super administrator', "['admin']");
insert into users(username, `password`, realname, avatar, introduction, roles) values('zhenzhen','0906', 'hzz' , 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif','I am a super editor',"['editor']");

insert into blogs(title, content,  createtime, author) values('标题1','内容1', '1601178804924','zhenzhen');
insert into blogs(title, content,  createtime, author) values('标题2','内容2', '1601178804924','kaina');
insert into blogs(title, content,  createtime, author) values('标题3','内容3', '1601178804924','zhenzhen');

select * from  users;

select id from  users;
SET SQL_SAFE_UPDATES=0;
update users set realname='ckn' where realname='kaina1';
delete from users where username='kaina';

