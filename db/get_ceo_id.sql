select employee_id from employees
where job_title = 'CEO'
AND company_id = $1;