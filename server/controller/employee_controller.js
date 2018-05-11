module.exports = {
 registerEmployee: (req, res) => {
  const db = req.app.get('db');

  let {employee_id, first_name, last_name, work_phone, personal_phone, work_email, personal_email, address, city, state, zip, googleid, job_title, job_description, is_salary, is_manager, is_hr, salary, reports_to} = req.body.employee;

  db.create_employee(employee_id, first_name, last_name, work_phone, personal_phone, work_email, personal_email, address, city, state, zip, googleid, job_title, job_description, is_salary, is_manager, is_hr, salary, reports_to)
  .then(response => {
   db.deny_request(employee_id).then( requests => {
     //deleting from register requests, although still creating employee - poorly named function
   })
   res.status(200).send( response )
  }).catch(error=>(console.log(error)))
 },

 getEmployees: (req, res) => {
  const db = req.app.get('db');
  let company_name;
  db.get_company_name(req.query.id).then (name => {
    db.get_employees(req.query.id).then (employees => {
     let obj = name;
     res.status(200).send( {employees, obj} ); 
    }).catch(error=>console.log(error)) 
   }).catch(error=>console.log(error))
  }
}