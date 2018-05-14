create table if not exists employees (
    employee_id serial primary key,
    first_name varchar(40) not null,
    last_name varchar(40) not null,
    work_phone varchar(10) unique not null,
    personal_phone varchar(10) unique,
    work_email varchar(256) unique not null,
    personal_email varchar(256) unique,
    address varchar(100) not null,
    city varchar(100) not null,
    state varchar(2) not null,
    zip varchar(10) not null,
    googleid char(21),
    job_title varchar(80) not null,
    job_description varchar(256) not null,
    is_salary boolean not null,
    is_manager boolean not null,
    is_hr boolean not null,
    salary integer,
    reports_to integer
);

create table if not exists companies (
    company_id varchar unique primary key,
    company_name varchar(256) not null,
    address varchar(100) not null,
    city varchar(100) not null,
    state varchar(2) not null,
    zip varchar(10) not null,
    industry varchar (25),
    employees integer,
    admin_id integer references employees (employee_id),
    hr_id integer references employees (employee_id)
);
create table if not exists register_requests (
    id serial primary key,
    registration_key text,
    first_name varchar(40) not null,
    last_name varchar(40) not null,
    work_phone varchar(10) unique not null,
    personal_phone varchar(10) unique,
    work_email varchar(256) unique not null,
    personal_email varchar(256) unique,
    address varchar(100) not null,
    city varchar(100) not null,
    state varchar(2) not null,
    zip varchar(10) not null,
    googleid char(21)
);

create table if not exists hours (
    employee_id integer references employees(employee_id),
    weekly integer,
    monthly integer,
    yearly integer
);

create table employee_no_social(
    id serial primary key,
    email text,
    password text,
    employee_id references employees (employee_id)
);

create table company_announcements (
    announcement_id serial primary key,
    title varchar(20),
    body varchar(500),
    date varchar(20),
    company_id varchar references companies (company_id),
    posted_by integer references employees (employee_id)
);