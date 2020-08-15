const createEmployeeRecord = (arr) => {
    const emp = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return emp
}

const createEmployeeRecords = (arr) => {
    return arr.map(createEmployeeRecord) //Returns an array of objects
}

const createTimeInEvent = (empRec, dateTime) => {
    const dateTimeArr = dateTime.split(" ");
    const newEvent = {
        type: "TimeIn",
        date: dateTimeArr[0],
        hour: parseInt(dateTimeArr[1], 10)
    };
    empRec.timeInEvents.push(newEvent);
    return empRec
}

const createTimeOutEvent = (empRec, dateTime) => {
    const dateTimeArr = dateTime.split(" ");
    const newEvent = {
        type: "TimeOut",
        date: dateTimeArr[0],
        hour: parseInt(dateTimeArr[1], 10)
    };
    empRec.timeOutEvents.push(newEvent);
    return empRec
}

const hoursWorkedOnDate = (empRec, date) => {
    const timeInEvent = empRec.timeInEvents.find(event => event.date === date);
    const timeOutEvent = empRec.timeOutEvents.find(event => event.date === date);
    return ((timeOutEvent.hour - timeInEvent.hour) / 100)
}

const wagesEarnedOnDate = (empRec, date) => {
    return (empRec.payPerHour * (hoursWorkedOnDate(empRec, date)))
}

const allWagesFor = (empRec) => {
    const wagesArr = empRec.timeInEvents.map(event => wagesEarnedOnDate(empRec, event.date));
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