function createEmployeeRecord(record) {
  return Object.assign({},
    {
      firstName: record[0],
      familyName: record[1],
      title: record[2],
      payPerHour: record[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  )
}

function createEmployeeRecords(arr) {
  // accepts an array of arrays
  return arr.map(createEmployeeRecord)
  // returns an array of employee objects
}

let twoRows = [
  ["moe", "sizlak", "barkeep", 2],
  ["bartholomew", "simpson", "scamp", 3]
]

function createTimeInEvent(employeeRecord, timestamp) {
  // accepts employee object and timestamp as arguments
  // adds timeIn event to employee object
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timestamp.split(" ")[1], 10),
    date: timestamp.split(" ")[0]
  })
  // returns the updated record
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, timestamp) {
  // accepts employee object and timestamp as arguments
  // adds timeOut event to employee object
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timestamp.split(" ")[1], 10),
    date: timestamp.split(" ")[0]
  })
  // returns the updated record
  return employeeRecord
}

function hoursWorkedOnDate(record, date) {
   // find timeRecord based off date and employee
   // subtract time-out from time-in to return hours worked
   // as integer
   let inTime = record.timeInEvents.find(e => {return e.date === date}).hour
   let outTime = record.timeOutEvents.find(e => {return e.date === date}).hour
   
   return (outTime - inTime) * 0.01
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
  // array with map and run it through wagesEarnedOnDate
  // date array should map to wagesEarnedOnDate array
  // which should reduce to allWagesFor
  const dates = record.timeInEvents.map(function(e) {return e.date})
  const dailyWages = dates.map(w => wagesEarnedOnDate(record, w))
  // reduce that array to one amount
  return dailyWages.reduce(function(total, el) {return total + el})
}

function calculatePayroll(employees) {
  // ARGUMENTS:
  // receives an arry of employees

  // PROCESSING:
  // Create array of wages to be reduced
  const wagesArr = employees.map(allWagesFor)

  // RETURNS:
  // single amount of total wages
  return wagesArr.reduce((total, w) => total + w)
}

function findEmployeeByFirstName(emps, name) {
  return emps.find(e => e.firstName === name)
}

let src = [
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150]
]
let emps = createEmployeeRecords(src)
findEmployeeByFirstName(emps, "Loki")