// Your code here
const employee = []
function createEmployeeRecord(record){
    employee.push({firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []});
    return employee[(employee.length - 1)];
}

function createEmployeeRecords(arr){
  const employees = arr.map(emp => createEmployeeRecord(emp));
  return employees;
}

function createTimeInEvent(record,time){
  let clockInDate = time.split(" ")[0];
  let clockInHour = parseInt(time.split(" ")[1],10);
  record.timeInEvents.push({type: "TimeIn", date: clockInDate,
  hour: clockInHour});
  return record;
}

function createTimeOutEvent(record,time){
  let clockOutDate = time.split(" ")[0];
  let clockOutHour = parseInt(time.split(" ")[1],10);
  record.timeOutEvents.push({type: "TimeOut", date: clockOutDate,
  hour: clockOutHour});
  return record;
}

function hoursWorkedOnDate(record,date){
  let clockIn = record.timeInEvents.find(e => e.date === date);
  let clockOut = record.timeOutEvents.find(e => e.date === date);
  return (clockOut.hour - clockIn.hour)/100
}

function wagesEarnedOnDate(record,date){
  return hoursWorkedOnDate(record,date) * record.payPerHour
}

function allWagesFor(record){
  return record.timeInEvents.reduce(function(memo,i){
    return memo + wagesEarnedOnDate(record,i.date);
  },0);
}

function calculatePayroll(arr){
  return arr.reduce(function(memo,i){
    return memo + allWagesFor(i)
  },0)
}

function findEmployeeByFirstName(arr,emp){
  return arr.find(e => e.firstName === emp)
}