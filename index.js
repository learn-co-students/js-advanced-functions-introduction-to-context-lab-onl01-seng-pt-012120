// Your code here
 function createEmployeeRecord(worker){
     let newWorker = []
     newWorker.firstName = worker[0]
     newWorker.familyName = worker[1]
     newWorker.title = worker[2]
     newWorker.payPerHour = worker[3]
     newWorker.timeInEvents = []
     newWorker.timeOutEvents = []
     return newWorker

 }

 function createEmployeeRecords(workers){
     let workerList = []
     for (const array of workers){
         let newWorker = createEmployeeRecord(array)
         workerList.push(newWorker)
     }
     return workerList
 }

 function createTimeInEvent(employee, timeIn){

     let splitTime = timeIn.split(" ")
     employee.timeInEvents.push({
         type: "TimeIn",
         date: splitTime[0],
         hour: parseInt(splitTime[1])
     }

     )
     return employee
 }

 function createTimeOutEvent(employee, timeOut){
    let splitTime = timeOut.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: splitTime[0],
        hour: parseInt(splitTime[1])
    }

    )
    return employee
}

function hoursWorkedOnDate(employee, date){
    let inEvent = employee.timeInEvents.find(function(punch){
        return punch.date === date
    })
    let outEvent = employee.timeOutEvents.find(function(punch){
        return punch.date === date
    })
    let hoursWorked = (outEvent.hour - inEvent.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate( employee,date){
    let hours = hoursWorkedOnDate(employee,date)
    return hours * employee.payPerHour
}

function allWagesFor(employee){

    let punchDates = []
    for (const time of employee.timeInEvents){
        punchDates.push(time.date)
    }

    let totalHours = []
    
    punchDates.forEach(function(date){
        totalHours.push(wagesEarnedOnDate(employee, date))
    })


    return totalHours.reduce(function(total, i){
        return total + i})
    }

function calculatePayroll(employees){
    let employeeWages = employees.map(function(employee){
        return allWagesFor(employee)
    })

    return employeeWages.reduce(function(total, i){
        return total +i
    })
}


function findEmployeeByFirstName(employees, name){
    return employees.find(function(e){ return e.firstName === name})

}
