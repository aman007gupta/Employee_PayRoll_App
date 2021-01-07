let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList = getEmployeePayrollFromStorage();
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
});

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
        innerHtml = `${innerHtml}
                <tr>
                    <td class="profile"  src="${employeePayrollData._profilePic} alt=""">
                    </td>
                    <td>${employeePayrollData._name}</td>
                    <td>${employeePayrollData._gender}</td>
                    <td>${getDeptHtml(employeePayrollData._department)}</td>
                    <td>${employeePayrollData._salary}</td>
                    <td>${employeePayrollData._startDate}</td>
                    <td>
                        <img src="../assets/delete-black-18dp.svg" alt="delete" name="${employeePayrollData._id}" onclick="remove(this)">
                        <img src="../assets/create-black-18dp.svg" alt="edit" name="${employeePayrollData._id}" onclick="update(this)">
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
            _id: new Date().getTime(),
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
            _id: new Date().getTime(),
            _profilePic: '../assets/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}