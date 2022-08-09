create database Estudent;

use Estudent;


create table Estudents(
	IdStudent int primary key identity(1,1),
	Nombre varchar(50) not null,
	Apellido varchar(50) not null
);

insert into Estudents(Nombre, Apellido) Values('Juanito','Nieves');

select * from Estudents
