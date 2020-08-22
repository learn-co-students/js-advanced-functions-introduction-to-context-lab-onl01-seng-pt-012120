// Your code here

// has a function called createEmployeeRecord
// populates a firstName field from the 0th element
// populates a familyName field from the 1th element
// populates a title field from the 2th element
// populates a payPerHour field from the 3th element
// initializes a field, timeInEvents, to hold an empty Array
// initializes a field, timeOutEvents, to hold an empty Array
const createEmployeeRecord = (arr) => {
    const emp = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return emp
}

// has a function called createEmployeeRecords
// creates two records
// correctly assigns the first names
// creates more than 2 records
const createEmployeeRecords = (arr) => {
    return arr.map(createEmployeeRecord)
}

// ✓ has a function called createTimeInEvent
// ✓ creates the correct type
// ✓ extracts the correct date
// ✓ extracts the correct hour
const createTimeInEvent = (emprec, date) => {
    let dateTimeArr = date.split(" ");
    const newEvent = {
        type: "TimeIn",
        date: dateTimeArr[0],
        hour: parseInt(dateTimeArr[1],10)

    };
    emprec.timeInEvents.push(newEvent);
    return emprec
}

// has a function called createTimeOutEvent
// creates the correct type
// extracts the correct date
// extracts the correct hour
const createTimeOutEvent = (emprec, date) => {
    const dateTimeArr = date.split(" ");
    const newEvent = {
        type: "TimeOut",
        date: dateTimeArr[0],
        hour: parseInt(dateTimeArr[1], 10)
    };
    emprec.timeOutEvents.push(newEvent);
    return emprec
}

// hoursWorkedOnDate calculates the hours worked when given an employee record and a date
// calculates that the employee worked 2 hours
const hoursWorkedOnDate = (emprec, date) => {
    const timeInEvent = emprec.timeInEvents.find(event => event.date === date);
    const timeOutEvent = emprec.timeOutEvents.find(event => event.date === date);
    return ((timeOutEvent.hour - timeInEvent.hour) / 100)

}

// wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// calculates that the employee earned 54 dollars
const wagesEarnedOnDate = (emprec, date) => {
    return (emprec.payPerHour * (hoursWorkedOnDate(emprec, date)))
}

// allWagesFor aggregates all the dates' wages and adds them together
const allWagesFor = (emprec, date) => {
    const wagesArr = emprec.timeInEvents.map(event => wagesEarnedOnDate(emprec, event.date));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return wagesArr.reduce(reducer)
}

const calculatePayroll = (empArr) => {
    const wagesArr = empArr.map(record => allWagesFor(record));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return wagesArr.reduce(reducer)
}

const findEmployeeByFirstName = (emps, name) => {
    return emps.find(record => record.firstName === name)
}