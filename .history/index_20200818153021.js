// Your code here
const createEmployeeRecord = (emp)=>{
    return {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = (arrEmp) => {
    return arrEmp.map(emp => {return createEmployeeRecord(emp)})
};

const createTimeInEvent = (emp,tStamp) => {
    let date = tStamp.split(' ')[0];
    let time = tStamp.split(' ')[1];
  
    let event = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    };
    emp.timeInEvents.push(event);
    return emp;
};

const createTimeOutEvent = (emp, tStamp) => {
    let date = tStamp.split(' ')[0];
    let time = tStamp.split(' ')[1];

    let event = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    };
    emp.timeOutEvents.push(event);
    return emp;
};