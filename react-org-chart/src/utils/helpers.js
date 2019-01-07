module.exports = {
  getTextForTitle,
  getTextForDepartment,
  getCursorForNode,
  getTextForEmail
};

function getTextForTitle(datum) {
  if (!datum.person || !datum.person.totalReports) {
    return '';
  }

  const { person: { totalReports } } = datum;

  return `Manages: ${totalReports}`;
}

const departmentAbbrMap = {
  Marketing: 'mktg',
  Operations: 'ops',
  Growth: 'gwth',
  Branding: 'brand',
  Assurance: 'fin',
  Data: 'data',
  Design: 'design',
  Communications: 'comms',
  Product: 'prod',
  People: 'people',
  Sales: 'sales'
};

function getTextForDepartment(datum) {
  if (!datum.person.department) {
    return '';
  }

  const { department } = datum.person;

  if (departmentAbbrMap[department]) {
    return departmentAbbrMap[department].toUpperCase();
  }
  if (department.length < 5) {
    return "ext: " + datum.person.department.substring(0, 10).toUpperCase();
  }
  else {
    return "phone: " + datum.person.department.substring(0, 10).toUpperCase();
  }
  
}

function getTextForEmail(datum) {
  if (!datum.person.link) {
    return ''
  }

  const { link } = datum.person
  return link;
}

function getCursorForNode(datum) {
  return datum.children || datum._children || datum.hasChild ? 'pointer' : 'default';
}