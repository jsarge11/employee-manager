select * from employees
where work_email = $1 OR
personal_email = $2 OR
work_phone = $3 OR
personal_phone = $4;