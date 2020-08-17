let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(row) {
        return createEmployeeRecord(row)
    }) 
}

let createTimeInEvent = function(employee, stamp) {
    let [date, hour] = stamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, stamp) {
    let [date, hour] = stamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, formDate) {
    let clockedIn = employee.timeInEvents.find(function(e){
        return e.date === formDate
    })

    let clockedOut = employee.timeOutEvents.find(function(e){
        return e.date === formDate
    })

    return (clockedOut.hour - clockedIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, formDate) {
    let totalPay = hoursWorkedOnDate(employee, formDate) * employee.payPerHour
    return parseFloat(totalPay.toString())
}

let allWagesFor = function(employee) {
    let allDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let earnings = allDates.reduce(function(record, day) {
        return record + wagesEarnedOnDate(employee, day)
    }, 0)

    return earnings
}

let calculatePayroll = function(employeeArr) {
    let allEmployees = employeeArr.reduce(function(employees, day) {
        return employees + allWagesFor(day)
    },0)

    return allEmployees
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })
}