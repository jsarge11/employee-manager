const bcrypt = require('bcryptjs')

module.exports = {
getUser: (req, res) => {
    const db = req.app.get('db');
    if (req.user) {   
        let { employee_id } = req.user[0];
        db.get_company_image(employee_id).then( img => { 
        let newObj = {
            user: req.user,
            img: img
        }
        res.status(200).send(newObj);
        })
    }
    else {
        if (req.body.user) {
            if (req.body.user[0]) {
                let { employee_id } = req.body.user[0];
                db.get_employee_by_id(employee_id).then(newUser => {
                    res.status(200).send(newUser);
                })
            }
        }
        else {
            res.status(404).send();
        }
       }
    },
 getCompany: (req, res) => {
  const db = req.app.get('db');
  let companyID = req.body.companyID.toUpperCase();
  db.get_company([companyID]).then ( company => {
   if (company[0]) {
    res.status(200).send (company);
   }
   else {
    res.status(404).send("Company does not exist.");
   }
  }).catch((error)=>console.log(error))
 },
 getNotifications: (req, res) => {
  const db = req.app.get('db');
  db.get_requests().then ( requests => {
        res.status(200).send( requests );
  }).catch((error) => console.log(error))
 }, 
 update: (req, res) => {
  const db = req.app.get('db');
  if (req.body.db_object.arrType) {
      console.log(req.body.db_object);

      let {employee_id, arrType, arr} = req.body.db_object;
      for (let i = 0; i < arrType.length; i++) {
           db.update_user(arrType[i],arr[i],employee_id);
           res.status(200).send();
      }
  }
  else {
      let {employee_id, type, value} = req.body.db_object;
      db.update_user(type,value,employee_id);
      res.status(200).send("all is well");
  }

  
 },
 createLogin: (req, res) => {
    let { email, hash } = req.body.employee;
    const db = req.app.get('db');
    db.get_employee_id([email]).then( id => {
        console.log(typeof id, id)
        db.create_employee_no_social(email, hash, +id[0].employee_id).then(()=> {
            res.status(200).send();
        });
    })
 },
 login: (req, res) => {
    let { email } = req.body;
    const db = req.app.get('db');
    db.get_from_no_social().then( users => {
        let newMap = users.map(item => {
            if (item.email === email) {
                res.status(200).send(item);
                return item;
            }
        })
        if (!newMap[0]) {
            res.status(401).send("Sorry, we can't find that email in our system.");
        }
    }).catch((error=>res.status(500).send("error")))
 }
}