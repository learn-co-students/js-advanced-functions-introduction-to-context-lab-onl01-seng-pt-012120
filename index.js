// Your code here
let createEmployeeRecord = (info) => {
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}



let createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map((row) => {
        return createEmployeeRecord(row)
    })
}



let createTimeInEvent = (employeeObject, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeObject
}




let createTimeOutEvent = (employeeObject, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')
    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeObject
}

let hoursWorkedOnDate = (employeeObject, dateWorked) => {
    let inEvent = employeeObject.timeInEvents.find((e) => {
        return e.date === dateWorked
    })

    let outEvent = employeeObject.timeOutEvents.find((e) => {
        return e.date === dateWorked
    })
    return (outEvent.hour - inEvent.hour) /100
}


let wagesEarnedOnDate = (employeeObject, dateWorked) => {
    let wage = hoursWorkedOnDate(employeeObject, dateWorked) * employeeObject.payPerHour
    return parseFloat(wage.toString())
}




let allWagesFor = (employeeObject) => {
    let eligibleDates = employeeObject.timeInEvents.map((e) => {
        return e.date
    })
    let payable = eligibleDates.reduce((total, d) => {
        return total + wagesEarnedOnDate(employeeObject, d)
    }, 0)
    return payable
}




let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find((arr) => {
        return arr.firstName === firstName
    })
}




let calculatePayroll = (employeeObjects) => {
    return employeeObjects.reduce((total, r) => {
        return total + allWagesFor(r)
    }, 0)
}




