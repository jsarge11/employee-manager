select employee_id from register_requests r
join employees e on e.googleid = r.registration_key
where e.work_email = $1;