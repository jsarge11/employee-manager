insert into companies (company_id, company_name, address, city, state, zip, industry, employees, admin_id, hr_id, img)
values ($1,$2,$3,$3,$4,$5,$6,$7,$8,$9,$10,$11)

insert into register_requests (registration_key, first_name, last_name, work_phone, personal_phone, work_email, personal_email, address, city, state, zip, googleid)
values ($1,$2,$3,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)

insert into employees(
 employee_id, 
 first_name, 
 last_name, 
 work_phone, 
 personal_phone, 
 work_email, 
 personal_email, 
 address, 
 city, 
 state, 
 zip, 
 googleid, 
 job_title, 
 job_description, 
 is_salary, 
 is_manager, 
 is_hr, 
 salary,
 reports_to)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)

insert into employee_no_social(email, password, employee_id)
values($1,$2,$3)