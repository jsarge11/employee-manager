module.exports = {
 registerEmployee: (req, res) => {
  const db = req.app.get('db');

  let {registration_key, first_name, last_name, work_phone, personal_phone, work_email, personal_email, address, city, state, zip, googleid, job_title, job_description, is_salary, is_manager, is_hr, salary, reports_to, company_id} = req.body.employee;

  db.approve_employee(registration_key).then(error=>connsole.log(error));
  let social_id = googleid ? googleid : registration_key;
  db.create_employee(first_name, last_name, work_phone, personal_phone, work_email, personal_email, address, city, state, zip, social_id, job_title, job_description, is_salary, is_manager, is_hr, salary, reports_to, company_id)
  .then(response => {
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
  },

  getCompany: (req, res) => {
    const db = req.app.get('db');
    let id = '42';
    db.get_company_name(id).then(name => {
      res.status(200).send(name);
    })
  },
  
  getID: (req, res) => {
    const db = req.app.get('db');
    db.get_ceo_id(req.query.companyid).then(id => {
      res.status(200).send(id);
    })
  }
}