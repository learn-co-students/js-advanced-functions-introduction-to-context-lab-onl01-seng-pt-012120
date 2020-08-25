function createEmployeeRecord(a) {
    return {firstName: a[0], familyName: a[1], title: a[2], payPerHour: a[3], timeInEvents: [], timeOutEvents: []}
}

function createEmployeeRecords(a) {
    return a.map(b => {return createEmployeeRecord(b)})
}

function createTimeInEvent(e, t) {
    let n = t.split(" ");
    e.timeInEvents = [{type: "TimeIn", date: n[0], hour: parseInt(n[1])}, ...e.timeInEvents];
    return e
}

function createTimeOutEvent(e, t) {
    let n = t.split(" ");
    e.timeOutEvents = [{type: "TimeOut", date: n[0], hour: parseInt(n[1])}, ...e.timeOutEvents];
    return e
}

function hoursWorkedOnDate(e, d) {
    let a = e.timeOutEvents.find(x => {return (x.date === d)});
    let b = e.timeInEvents.filter(x => {return (x.date === d)});
    let n = 0;
    let c;
    for (const z of b) {let h = z.hour; if (h > n) {n = h; c = z}}
    return ((a.hour - c.hour) / 100)
}

function wagesEarnedOnDate(e, d) {
    return e.payPerHour * hoursWorkedOnDate(e, d)
}

function allWagesFor(e) {
    let a = e.timeOutEvents.map(b => {return b.date});
    let n = 0;
    for (const i of a) {n = n + hoursWorkedOnDate(e, i)};
    return n * e.payPerHour
}

function calculatePayroll(e) {
    return e.reduce((m, i) => m + allWagesFor(i), 0)
}

function findEmployeeByFirstName(a, n) {
    return a.find(e => {return (e.firstName === n)})
}