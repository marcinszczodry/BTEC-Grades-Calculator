// temp credentials
const loginData = {
    username: "user",
    password: "pass123"
};

/* Global variables, that store the website structure, used for any view */
const pageTitle = document.querySelector('.page-title');
const pageContent = document.querySelector('main');
const pageFooter = document.querySelector('footer');

/* Subroutine: Reset current view, to default layout */
const reset_view = () => {
    pageTitle.innerHTML = "";
    pageContent.innerHTML = "";
    pageFooter.innerHTML = '<button id="accessibility"><svg width="31px" height="23px" viewBox="0 0 31 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <desc>Created with Sketch.</desc> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="VET-Copy" transform="translate(-1195.000000, -1188.000000)" fill="#000000" fill-rule="nonzero"> <g id="Group-15" transform="translate(924.000000, 664.000000)"> <g id="noun_1015820_cc-copy" transform="translate(271.000000, 524.000000)"> <path d="M16.953125,11.5 L20.34375,11.5 C20.344288,12.8058726 19.8149494,14.0563606 18.8763132,14.9666129 C17.937677,15.8768652 16.6696743,16.3693679 15.3611458,16.3319328 C12.8030778,16.2343465 10.7523198,14.1871876 10.65625,11.6352941 C10.6196122,10.3305082 11.113714,9.06644065 12.0260947,8.13080158 C12.9384753,7.19516251 14.1915101,6.66755545 15.5,6.66806723 L15.5,10.0504202 C15.5,10.4348726 15.6530967,10.8035789 15.9256105,11.0754279 C16.1981243,11.3472768 16.5677323,11.5 16.953125,11.5 Z M30.8094792,10.9427171 L31,11.5 C28.7008333,19.1408964 22.1004167,23 15.5,23 C9.0965625,23 2.693125,19.3760504 0.196979167,12.047619 L0,11.5 C2.29916667,3.85910364 8.89958333,0 15.5,0 C21.9098958,0 28.3165625,3.62394958 30.8094792,10.9427171 Z M26.8957292,11.522549 C24.6611458,5.89173669 19.6042708,3.86554622 15.5,3.86554622 C11.3376042,3.86554622 6.30010417,5.89173669 4.09458333,11.477451 C6.33885417,17.1082633 11.3957292,19.1344538 15.5,19.1344538 C19.6527083,19.1344538 24.6902083,17.1082633 26.8957292,11.522549 Z" id="Shape"></path> </g> </g> </g> </g> </svg></button>';
}

// Subroutine: Count number of each type of criteria in both all units and all assignments that are in them
const count_criterias = () => {
    let no_criterias_in_assignment, no_criterias_in_unit, maximum_grade;

    for (u = 0; u < units.length; u++) {
        // console.log(units[u]);
        no_criterias_in_unit = { p: 0, m: 0, d: 0 };
        for (a = 0; a < units[u].assignments.length; a++) {
            // console.log(units[u].assignments[a]);
            no_criterias_in_assignment = { p: 0, m: 0, d: 0 };
            for (c = 0; c < units[u].assignments[a].length; c++) {
                // console.log(units[u].assignments[a][c]);
                if (units[u].assignments[a][c].criteria.includes('P')) { no_criterias_in_assignment.p += 1; no_criterias_in_unit.p += 1; maximum_grade = "Pass" }
                if (units[u].assignments[a][c].criteria.includes('M')) { no_criterias_in_assignment.m += 1; no_criterias_in_unit.m += 1; maximum_grade = "Merit" }
                if (units[u].assignments[a][c].criteria.includes('D')) { no_criterias_in_assignment.d += 1; no_criterias_in_unit.d += 1; maximum_grade = "Distinction" }
            }

            units[u].assignments[a].max_grade = maximum_grade;
            units[u].assignments[a].no_criterias = no_criterias_in_assignment;
            units[u].no_criterias = no_criterias_in_unit;
        }
    }
}

// Function: Check if unit is done (true - unit is finished / false - unit is not finished)
const find_unit_status = (unit) => {
    let status = "Pending";
    unit.assignments.forEach(assignment => {
        assignment.forEach(criteria => {
            if (criteria.status == null && status == "Pending") {
                status = "Pending";
            } else if (criteria.status == null) {
                status = "Current";
                return status;
            } else {
                status = "Completed";
            }
        });
    });
    return status;
}

// Function: Check if assignment is done (true - assignment is finished / false - assignment is not finished)
const is_assignment_done = (assignment) => {
    let is_done = true;
    assignment.forEach(criteria => {
        if (criteria.status == null) {
            is_done = false;
            return is_done;
        }
    });
    return is_done;
}

// Function: Convert grade that is text onto a number (1-Pass, 2-Merit, 3-Distinction)
const calculate_grade_priority = (grade) => {
    let priority = 0;
    if (grade == "Distinction") {
        priority = 3;
    } else if (grade == "Merit") {
        priority = 2;
    } else if (grade == "Pass") {
        priority = 1;
    }
    return priority;
}

// Function: Calculate assignment grade
// * Requires: count_criterias
const calculate_assignment_grade = (assignment) => {
    let grade;
    let no_assignment_grades = { p: 0, m: 0, d: 0 };
    if (is_assignment_done(assignment)) {
        assignment.forEach(criteria => {
            if (criteria.criteria.includes('P') && criteria.status == true) { no_assignment_grades.p += 1 };
            if (criteria.criteria.includes('M') && criteria.status == true) { no_assignment_grades.m += 1 };
            if (criteria.criteria.includes('D') && criteria.status == true) { no_assignment_grades.d += 1 };
        });

        if (no_assignment_grades.p == assignment.no_criterias.p) {
            grade = "Pass";
            if (no_assignment_grades.m == assignment.no_criterias.m && assignment.no_criterias.m > 0) {
                grade = "Merit";
                if (no_assignment_grades.d == assignment.no_criterias.d && assignment.no_criterias.d > 0) {
                    grade = "Distinction";
                }
            }
            if (no_assignment_grades.d == assignment.no_criterias.d && assignment.no_criterias.d > 0 && assignment.no_criterias.m == 0) {
                grade = "Distinction";
            }
        } else {
            grade = "Fail";
        }

    } else {
        grade = "Pending";
    }

    return grade;
}

// Function: Calculate unit grade
// * Requires: count_criterias
const calculate_unit_grade = (unit) => {
    let grade, grades_fail_counter;
    const assignments = unit.assignments;
    grades_fail_counter = { p: 0, m: 0, d: 0 };
    if (find_unit_status(unit) != "Pending") {
        for (a = 0; a < assignments.length; a++) {
            if (calculate_assignment_grade(assignments[a]) != "Pending") {
                if (calculate_assignment_grade(assignments[a]) == "Fail") {
                    grades_fail_counter.p += 1;
                } else if (assignments[a].max_grade == "Pass" && assignments[a].max_grade != calculate_assignment_grade(assignments[a])) {
                    grades_fail_counter.p += 1;
                } else if (assignments[a].max_grade == "Merit" && assignments[a].max_grade != calculate_assignment_grade(assignments[a])) {
                    grades_fail_counter.m += 1;
                } else if (assignments[a].max_grade == "Distinction" && assignments[a].max_grade != calculate_assignment_grade(assignments[a])) {
                    grades_fail_counter.m += 1;
                }
            }

            //console.log("Unit " + unit.id + ", Assignment " + a + ": @ MAX-GRADE: " + assignments[a].max_grade + "  @ ACHIEVED GRADE: " + calculate_assignment_grade(assignments[a]) + "  @ FAILS: p-" + grades_fail_counter.p + " m-" + grades_fail_counter.m + " d-" + grades_fail_counter.d);
        }
        if (grades_fail_counter.p > 0) {
            grade = "Fail";
        } else if (grades_fail_counter.m > 0) {
            grade = "Merit";
        } else {
            grade = "Distinction"
        }
    } else {
        grade = "*Pending";
    }


    return grade;
}

// Function: Find unit, based on its number
const find_unit = (unitNumber) => {
    let result;
    units.forEach(unit => {
        if (unit.id == Number(unitNumber)) {
            result = unit;
        }
    });
    return result;
};

/* Screen: Login */
const Login = () => {
    const form = document.createElement('form');
    const loginInp = document.createElement('input');
    loginInp.type = "text";
    loginInp.placeholder = "username";
    loginInp.id = "user";
    const passInp = document.createElement('input');
    passInp.type = "password";
    passInp.placeholder = "password";
    passInp.id = "pass";

    const logBtn = document.createElement('input');
    logBtn.type = "submit";
    logBtn.innerText = "LOGIN";
    logBtn.id = "loginBtn";

    const info = document.createElement('p');
    info.innerHTML = '<p style="text-align: center; font-weight: normal; width:200px;margin-top: 40px; opacity: 0.5;">For verification puposes, please use following login details:<br><br>username: <b>user</b><br>password: <b>pass123</b>';

    form.appendChild(loginInp);
    form.appendChild(passInp);
    form.appendChild(logBtn);
    form.appendChild(info);

    pageContent.appendChild(form);

    const inputUsername = document.querySelector('#user');
    const inputPassword = document.querySelector('#pass');
    const loginButton = document.querySelector('#loginBtn');

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (inputUsername.value == loginData.username && inputPassword.value == loginData.password) {
            reset_view();
            Summary();
        } else {
            if (inputUsername.value != loginData.username) {
                inputUsername.placeholder = "WRONG USERNAME";
                inputUsername.value = "";
            }
            if (inputPassword.value != loginData.password) {
                inputPassword.placeholder = "WRONG PASSWORD";
                inputPassword.value = "";
            }
        }
    });

    // Change size of certain elements
    const accessibility_btn = document.querySelector('#accessibility');
    accessibility_btn.addEventListener('click', function () {
        document.querySelector('main').classList.toggle("enlarged");
    });

};

/* Screen: Summary */
const Summary = () => {

    // Count criterias
    count_criterias();

    // Page title
    pageTitle.innerText = "Summary";

    // Create table
    const table = document.createElement('table');
    const tableContainer = document.createElement('tbody');
    let newUnit, newUnitDetails, newUnitStatus, newUnitId, newUnitName, newUnitGrade;

    table.id = "units";
    table.appendChild(tableContainer);

    // Create heading row
    const headingRow = document.createElement('tr');
    const headingCol1 = document.createElement('th');
    const headingCol2 = document.createElement('th');

    headingRow.className = "heading";
    headingCol1.innerText = "Unit & Grade";
    headingCol2.innerText = "Status";

    headingRow.appendChild(headingCol1);
    headingRow.appendChild(headingCol2);

    tableContainer.appendChild(headingRow);
    pageContent.appendChild(table);

    // logout btn
    const str = '<svg width="22px" height="26px" viewBox="0 0 22 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <desc>Created with Sketch.</desc> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="VET-Copy" transform="translate(-966.000000, -1167.000000)" fill="#FFFFFF" fill-rule="nonzero" stroke="#FFFFFF"> <g id="Group-15" transform="translate(924.000000, 664.000000)"> <g id="Group-7"> <g id="noun_1019090_cc" transform="translate(43.000000, 504.000000)"> <g id="Group"> <polygon id="Shape" points="8.925 20.525 1.225 22.475 1.225 1.525 8.925 3.475 8.925 8.725 10.025 8.725 10.025 2.6 0.1 0.125 0.1 23.875 10.025 21.4 10.025 15.275 8.925 15.275"></polygon> <polygon id="Shape" points="14.9 7.025 14.1 7.8 17.75 11.45 5 11.45 5 12.55 17.8 12.55 14.1 16.25 14.9 17.025 19.9 12.025"></polygon> </g> </g> </g> </g> </g> </g> </svg> LOG OUT';
    const lgoBtn = document.createElement('button');
    lgoBtn.id = "logout";
    lgoBtn.innerHTML = str;
    pageFooter.appendChild(lgoBtn);


    // loop through units, and for each generate html structure (table row)
    units.forEach(unit => {

        // Create HTML elements in the document
        newUnit = document.createElement('tr');
        newUnitDetails = document.createElement('td');
        newUnitStatus = document.createElement('td');
        newUnitId = document.createElement('div');
        newUnitName = document.createElement('div');
        newUnitGrade = document.createElement('div');

        // Append HTML elements to the table
        table.appendChild(newUnit);
        newUnit.appendChild(newUnitDetails);
        newUnit.appendChild(newUnitStatus).className = "status";

        // Append unit details together with proper classes
        newUnitDetails.appendChild(newUnitId).className = "id";
        newUnitDetails.querySelector('.id').innerText = unit.id;
        newUnitDetails.appendChild(newUnitName).className = "name";
        newUnitDetails.querySelector('.name').innerText = unit.name;
        newUnitDetails.appendChild(newUnitGrade).className = "grade";
        newUnitDetails.querySelector('.grade').innerText = calculate_unit_grade(unit);

        // Append unit status
        let status = find_unit_status(unit);
        newUnitStatus.innerText = status;
        newUnit.classList = status.toLowerCase();

    });

    lgoBtn.addEventListener('click', function () {
        reset_view();
        Login();
    });

    for (i = 0; i < units.length; i++) {
        table.children[i + 1].addEventListener('click', function () {
            Details(this.children[0].children[0].innerText);
        });
    }

    // Change size of certain elements
    const accessibility_btn = document.querySelector('#accessibility');
    accessibility_btn.addEventListener('click', function () {
        document.querySelector('main').classList.toggle("enlarged");
    });


};

/* Screen: Unit details */
const Details = (unitNumber) => {

    // unit details
    const unitDetails = find_unit(unitNumber);

    // switch logout btn to return btn
    const returnBtn = document.querySelector('#logout');
    returnBtn.id = "return";
    returnBtn.innerHTML = "RETURN";

    // delete second column
    const assTable = document.querySelector('#units');
    assTable.children[0].children[0].removeChild(assTable.children[0].children[0].children[1]);
    const heade = assTable.children[0];
    assTable.innerHTML = "";
    assTable.appendChild(heade);

    // add unit number & title
    heade.children[0].innerHTML = "<th>Unit " + unitDetails.id + " - " + unitDetails.name + "</th>"

    // generate assignments' data
    let assignmentCounter = 0;
    let assignmentRow;
    let assignmentCount;
    let assignmentCriterias;
    let assignmentCriteria;
    let critContainer;

    const assignments = unitDetails.assignments;
    for (let a = 0; a < assignments.length; a++) {
        assignmentCounter++;

        assignmentRow = document.createElement('ul');
        assignmentCount = document.createElement('li');
        assignmentCriterias = document.createElement('ul');
        critContainer = document.createElement('div');

        // draw assignment number
        assignmentCount.innerText = "Assignment " + assignmentCounter;
        assignmentRow.appendChild(assignmentCount);

        // increment through each criteria and listen for click
        for (let c = 0; c < assignments[a].length; c++) {
            let criteria = assignments[a][c];

            assignmentCriteria = document.createElement('li');
            assignmentCriteria.innerText = criteria.criteria;

            // achieved class
            if (criteria.status == true) {
                assignmentCriteria.className = "achieved";
            }
            if (criteria.status == false) {
                assignmentCriteria.className = "failed";
            }

            assignmentCriterias.appendChild(assignmentCriteria);

            assignmentCriteria.addEventListener('click', function () {
                if (this.className == "achieved") {
                    this.className = "failed";
                    unitDetails.assignments[a][c].status = false;
                }
                else if (this.className == "failed") {
                    this.className = "";
                    unitDetails.assignments[a][c].status = null;
                }
                else if (this.className == "") {
                    this.className = "achieved";
                    unitDetails.assignments[a][c].status = true;
                }
                assGrade.innerText = " = " + calculate_assignment_grade(assignments[a]);
            });

        }

        critContainer.appendChild(assignmentCriterias);
        assignmentRow.appendChild(critContainer);
        assTable.appendChild(assignmentRow);

        // draw grade for each assignment
        const assGrade = document.createElement('span');
        assGrade.className = "assGrade";
        assGrade.innerText = " = " + calculate_assignment_grade(assignments[a]);
        critContainer.appendChild(assGrade);
    }

    returnBtn.addEventListener('click', function () {
        reset_view();
        Summary();
    });
}

// Main function, ran after page load, displays the menu screen
Login();