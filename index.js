function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(records) {
    return records.map(x => createEmployeeRecord(x))
};

function createTimeInEvent(array, dateTime) {
    let dateTimeArray = dateTime.split(' ')
    array.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    })
    return array
};

function createTimeOutEvent(array, dateTime) {
    let dateTimeArray = dateTime.split(' ')
    array.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    })
    return array
};

function hoursWorkedOnDate(record, dateTime) {
    let timeIn = record.timeInEvents.filter(x => x.date === dateTime)
    let timeOut = record.timeOutEvents.filter(x => x.date === dateTime)
    //console.log(timeIn[0].hour)
    return (timeOut[0].hour/100) - (timeIn[0].hour/100)
};

function wagesEarnedOnDate(record, dateTime) {
    return hoursWorkedOnDate(record, dateTime) * record.payPerHour
};

function allWagesFor(record) {
    let dates = record.timeInEvents.map(x => x.date)
    return dates.reduce(function(allValues, value) {
        return allValues + wagesEarnedOnDate(record, value)
    }, 0)
};

function calculatePayroll(records) {
    return records.reduce(function(allValues, value) {
        return allValues + allWagesFor(value)
    }, 0)
};

function findEmployeeByFirstName(records, name) {
    let employee = records.find(x => x.firstName === name)
    return employee
};