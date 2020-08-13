// Your code here
function createEmployeeRecord(array){
  let employee = {};
  employee.firstName = array[0];
  employee.familyName = array[1];
  employee.title = array[2];
  employee.payPerHour = array[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];
  return employee
}

function createEmployeeRecords(array){
  const map = array.map(employee => createEmployeeRecord(employee));
  return map
}

function createTimeInEvent(employee,dateStamp){
  let [date, hour] = dateStamp.split(' ')
  employee.timeInEvents.push({type: 'TimeIn', hour: parseInt(hour, 10), date})
  return employee
}

function createTimeOutEvent(employee,dateStamp){
  let [date, hour] = dateStamp.split(' ')
  employee.timeOutEvents.push({type: 'TimeOut', hour: parseInt(hour, 10), date})
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let startTime = employee.timeInEvents.find(element => element.date === date)
  let endTime = employee.timeOutEvents.find(element => element.date === date)
  let totalHours = (endTime.hour - startTime.hour) / 100;
  return totalHours
}

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour
}

function allWagesFor(employee) {
  let wages = employee.timeInEvents.map(element => element.date)
    .map(date => wagesEarnedOnDate(employee, date))
    .reduce((total, element) => total + element, 0)
  return wages
}

function findEmployeeByFirstName(srcArray, firstName) {
 let employee = srcArray.find(element => element.firstName === firstName)
 return employee
}

function calculatePayroll(employee) {
  let employeeWages = employee.map(element => allWagesFor(element))
    .reduce((total, element) => total + element, 0)
  return employeeWages
}