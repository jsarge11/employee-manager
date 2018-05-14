insert into company_announcements(title, body, name, job_title, date, company_id, posted_by) 
values($1, $2, $3, $4, $5, $6, $7);
select * from company_announcements;