let totalMonthly = 0;
let employeeArray = [];

//create Employee class
class Employee {
    constructor(firstName, lastName, id, title, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.title = title;
        this.salary = salary;
    }
}

$(document).ready(onReady);

function onReady() {
    $('#submitButton').on('click', appendEmployee);
    $('.remove').hide();
    $('tbody').on('click','.remove', removeEmployee);
    $('#removeByID').on('click',removeByID);
}

function appendEmployee() {
    //make sure an employee id has been entered
    if($('#inputID').val()===''){
        alert('You must enter an employee ID');
        return false;
    }

    //create employee object
    let newEmployee = new Employee($('#firstName').val(), $('#lastName').val(),
        $('#inputID').val(), $('#inputTitle').val(), $('#inputSalary').val()
    );
    //push employee into array
    employeeArray.push(newEmployee);
    //add employees to table
    addEmployeesToTable();

    //calculate monthly salary
    calculateMonthly();
    //clear input fields
    clearInputFields();
    //show text boxes and button to remove employee
    $('.remove').show();
}

function addEmployeesToTable() {
    //empty table
    $('tbody').empty();
    for (i = 0; i < employeeArray.length; i++) {
        $('tbody').append(
            `<tr>
                <td>`
            + employeeArray[i].firstName +
            `</td>
                <td>`
            + employeeArray[i].lastName +
            `</td>
                <td class="id">`
            + employeeArray[i].id +
            `</td>
                <td>`
            + employeeArray[i].title +
            `</td>
                <td class="salary">`
            + employeeArray[i].salary +
            `</td>
                <td class="removeButton">
            <button class="removeButton">Remove Employee</button>
            </td>
            </tr>`)
    }
}

function calculateMonthly() {
    totalMonthly = 0;
    for(employee of employeeArray){
        totalMonthly += Number( (employee.salary/12).toFixed(2) );
    }
    $('#totalMonthly').empty();
    $('#totalMonthly').append('Total Monthly: $' + totalMonthly);
    //check that total monthly is less than $20,000
    if (totalMonthly > 20000) {
        $('#totalMonthly').css('background-color', 'red');
    }
    else{
        $('#totalMonthly').css('background-color', 'white'); 
    }
}

function clearInputFields() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#inputID').val('');
    $('#inputTitle').val('');
    $('#inputSalary').val('');
    $('#inputIDRemove').val('');
}

function removeEmployee(){
    //find id and salary
    let tempID = $(this).parent().siblings(".id").html();
    let tempSalary = $(this).parent().siblings(".salary").html();
    //delete row 
    $(this).parents()[1].remove();
    
    //search for employee in array
    let index = -1;
    for (i = 0; i < employeeArray.length; i++) {
        if (employeeArray[i].id === tempID) {
            index = i;
        }
    }
    //remove employee from array
    employeeArray.splice(index, 1);
    //update total monthly
    calculateMonthly();
    //hide remove buttons if table is empty
    if(employeeArray.length === 0){
        $('.remove').hide()
    }
}


function removeByID() {
    //get ID
    let tempID = $('#inputIDRemove').val(); 
    //search for employee in array
    let index = -1;
    for (i = 0; i < employeeArray.length; i++) {
        if (employeeArray[i].id === tempID) {
            index = i;
        }
    }
    if (index === -1) {
        alert('ID not found');
        clearInputFields();
    }
    else {
        //remove employee from array
        employeeArray.splice(index, 1);
        //add employees to table
        addEmployeesToTable();
        //calculate monthly salary
        calculateMonthly();
        //clear input fields
        clearInputFields();
    }
    //hide remove buttons if table is empty
    if(employeeArray.length === 0){
        $('.remove').hide()
    }
}