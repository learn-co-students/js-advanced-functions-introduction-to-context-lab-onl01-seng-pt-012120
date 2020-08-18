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

const hoursWorkedOnDate = (emp,date) => {
    let hourStart = emp.timeInEvents.find(event=> {
        if(event.date === date){
            return event;
        };
    });
    let hourFinish = emp.timeOutEvents.find(event=>{
        if(event.date === date){
            return event;
        }
    });
    debugger;
    return (hourFinish.hour/100-hourStart.hour/100);
};

const wagesEarnedOnDate = (emp,date) => {
    return emp.payPerHour * hoursWorkedOnDate(emp,date);
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const allWagesFor = (emp) => {
    let daysWorked = emp.timeInEvents.map(event=> {
        return event.date
    });
    let wageArr = daysWorked.map(date => wagesEarnedOnDate(emp, date)).reduce(reducer);
    return wageArr;
};

const findEmployeeByFirstName = (srcArray,firstName) => {
    return srcArray.find(emp=> emp.firstName === firstName);
};

const calculatePayroll = (empA) =>{
    let allWages = empA.map(emp=>{
        allWagesFor(emp)
    });
    return allWages.reduce(reducer)
};