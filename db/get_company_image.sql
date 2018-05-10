select img from employees e
join companies c on e.company_id = c.company_id
where employee_id = $1