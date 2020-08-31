// Your code here
function createEmployeeRecord(employeeInfo) {
    employeeInfo.push([], []);
    let char = ['firstName', 'familyName', 'title', 'payPerHour', 'timeInEvents', 'timeOutEvents'],
        record = {};
    char.forEach((element, i)=> {
        record[element] = employeeInfo[i]
    });

    return record;
};

function createEmployeeRecords(emplRecords) {
    return emplRecords.map(createEmployeeRecord);
};

function createTimeInEvent(emplObj, dateStamp) {
    let obj = {}, val = ["TimeIn"], keys = ["type", "date", "hour"];
    val.push(...dateStamp.split(' '))
    keys.forEach((key, i) => {
        obj[key] = val[i]
    });
    obj.hour = parseInt(obj.hour, 10);
    emplObj.timeInEvents.push(obj);
    return emplObj;
};

function createTimeOutEvent(emplObj, dateStamp) {
    let obj = {}, val = ["TimeOut"], keys = ["type", "date", "hour"];
    val.push(...dateStamp.split(' '))
    keys.forEach((key, i) => {
        obj[key] = val[i]
    });
    obj.hour = parseInt(obj.hour, 10);
    emplObj.timeOutEvents.push(obj);
    return emplObj;
};

function hoursWorkedOnDate(emplObj, dateStamp) {
    let timein = emplObj.timeInEvents.find(function(obj) {
        return obj.date === dateStamp;
    }).hour;

    let timeout = emplObj.timeOutEvents.find(function(obj) {
        return obj.date === dateStamp
    }).hour;

    return (timeout - timein)/100;
};

function wagesEarnedOnDate(emplObj, dateStamp) {
    let totalHours = hoursWorkedOnDate(emplObj, dateStamp),
        rate = emplObj.payPerHour;

    return totalHours * rate;
};

function allWagesFor(emplObj) {
    let dates = emplObj.timeInEvents.map(function(event) {
        return event.date;
    });
    return dates.reduce((total, date) => total + wagesEarnedOnDate(emplObj,date), 0)
};

function findEmployeeByFirstName(emplRecords, firstName) {
    return emplRecords.find(obj =>{
        return obj.firstName === firstName;
    });
};

function calculatePayroll(emplRecords) {
   return emplRecords.reduce((total, empl) => total + allWagesFor(empl), 0);
}