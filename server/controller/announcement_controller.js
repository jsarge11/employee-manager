module.exports = {
 get: (req, res) => {
  const db = req.app.get('db');

  db.get_announcements(req.query.id).then (announces => {
   res.status(200).send(announces);
  }).catch(error=>console.log(error))
 },
 createPost: (req, res) => {
  const db = req.app.get('db');
  let {title, body, name, job_title, date, company_id, id} = req.body;
  
  db.create_announcements([title, body, name, job_title, date, company_id, id]).then( announcements => {
   res.status(200).send(announcements);
  })
 }
}