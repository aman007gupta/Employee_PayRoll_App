window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = `<th></th><th>Name</th><th>Gender</th><th>Department</th>` +
                        `<th>Salary</th><th>Start Date</th><th>Actions</th>`;
    const innerHtml = `${headerHtml}
                <tr>
                    <td class="profile" alt="" src="../assets/Ellipse -2.png">
                    </td>
                    <td>Aman Gupta</td>
                    <td>Male</td>
                    <td><div class="dept-label">Engineer</div>
                        <div class="dept-label">Others</div></td>
                    <td>500000</td>
                    <td>10 Nov 2020</td>
                    <td>
                        <img src="../assets/delete-black-18dp.svg" alt="delete" id="1" onclick="remove(this)">
                        <img src="../assets/create-black-18dp.svg" alt="edit" id="1" onclick="update(this)">
                    </td>
                </tr>`;
    document.querySelector('#display').innerHTML = innerHtml;
}