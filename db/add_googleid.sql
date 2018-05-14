update employees
set googleid = $1
where googleid = $2;
select * from employees where googleid = $1;