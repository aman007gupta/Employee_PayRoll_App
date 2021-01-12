let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    // employeePayrollList = getEmployeePayrollFromStorage();
    // createInnerHtml();
    if (site_properties.use_local_storage.match("true")) {
        getEmployeePayrollDataFromStorage();
    } else getEmployeePayrollDataFromServer();
});

const getEmployeePayrollDataFromStorage = () => {
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp')
}

const getEmployeePayrollDataFromServer = () => {
    makePromiseCall("GET", site_properties.server_url, true)
        .then(responseText => {
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponse();
        })
}

const getEmployeePayrollFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    if (employeePayrollList.length == 0)
        return;
    const headerHtml = `<th></th><th>Name</th><th>Gender</th><th>Department</th>` +
        `<th>Salary</th><th>Start Date</th><th>Actions</th>`;
    let innerHtml = `${headerHtml}`;
    // let employeePayrollList = createEmployeePayrollJSON();                    
    for (const employeePayrollData of employeePayrollList) {
        employeePayrollData._id = employeePayrollList.indexOf(contact);
        innerHtml = `${innerHtml}
                <tr>
                    <td class="profile"  src="${employeePayrollData._profilePic} alt=""">
                    </td>
                    <td>${employeePayrollData._name}</td>
                    <td>${employeePayrollData._gender}</td>
                    <td>${getDeptHtml(employeePayrollData._department)}</td>
                    <td>${employeePayrollData._salary}</td>
                    <td>${stringifyDate(employeePayrollData._startDate)}</td>
                    <td>
                        <img src="../assets/delete-black-18dp.svg" alt="delete" id="${employeePayrollData.id}" onclick="remove(this)">
                        <img src="../assets/create-black-18dp.svg" alt="edit" id="${employeePayrollData.id}" onclick="update(this)">
                    </td>
                </tr>`;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class='dept-label'>${dept}<div>`;
    }
    return deptHtml;
}

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData.id == node.id);
    if (!employeePayrollData) return;
    const index = employeePayrollList
        .map(empData => empData.id)
        .indexOf(employeePayrollData.id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
}

const update = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData.id == node.id);
    if (!employeePayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayrollData));
    location.replace(site_properties.add_emp_payroll_page);
}
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Aman Gupta',
            _gender: 'Male',
            _department: [
                'Engineering',
                'Others'
            ],
            _salary: '600000',
            _startDate: '10 Nov 2020',
            _note: '',
            id: new Date().getTime(),
            _profilePic: '../assets/Ellipse -2.png'
        },
        {
            _name: 'Sumit Gupta',
            _gender: 'Male',
            _department: [
                'HR',
                'Others'
            ],
            _salary: '500000',
            _startDate: '10 Nov 2020',
            _note: '',
            id: new Date().getTime(),
            _profilePic: '../assets/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}