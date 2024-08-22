var empData = [
    { empCode: 101, DeptName: 'Accounts', Rate: 'Accounts' },
    { empCode: 102, DeptName: 'Operations', Rate: 'Operations' },
    { empCode: 103, DeptName: 'HR', Rate: 'HR' }
];

var loadData = function () {
    var cb = $("#dept");
    $(empData).each(function () {
        var option = $("<option></option>");
        option.attr("value", this.Rate);
        option.text(this.DeptName);
        cb.append(option);
    });
};

var loadRate = function () {
    $("#bpay").val();
};

var updateFooter = function () {
    $("#icount").text($("#empTable>tbody>tr").length - 1);
};

var addItem = function () {
    let empName = $("#empName");
    let dept = $("#dept");
    let desig = $("#desig");
    let dateOfJoining = $("#dateOfJoining");
    let bpay = $("#bpay");
    var tableBody = $("#empTable>tbody");
    var row = $("<tr></tr>");
    var col1 = $("<td></td>");
    col1.text(tableBody.children("tr").length);
    var col2 = $("<td></td>");
    col2.text(empName.val());
    var col3 = $("<td></td>");
    col3.text($($("#dept").children("option")[$("#dept").prop("selectedIndex")]).text());
    var col4 = $("<td></td>");
    col4.text(desig.val());
    var col5 = $("<td></td>");
    col5.text(dateOfJoining.val());
    var col6 = $("<td></td>");
    col6.text(bpay.val());
    var removeBtn = $("<button></button>");
    removeBtn.text("remove");
    removeBtn.attr("type", "button");
    removeBtn.click(function () {
        row.remove();
        updateFooter();
    });
    var col7 = $("<td></td>");
    col7.append(removeBtn);
    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col5);
    row.append(col6);
    row.append(col7);
    row.appendTo(tableBody);
    updateFooter();
    empName.val("");
    dept.val("");
    desig.val("");
    dateOfJoining.val("");
    bpay.val("");
    validateForm();
};

var validateForm = function () {
    let empName = $("#empName").val();
    let dept = $("#dept").val();
    let desig = $("#desig").val();
    let dateOfJoining = $("#dateOfJoining").val();
    let bpay = $("#bpay").val();

    if (empName && dept && desig && dateOfJoining && bpay) {
        $("#btnAdd").prop("disabled", false);
    } else {
        $("#btnAdd").prop("disabled", true);
    }
};

$(function () {

    $('#dept').change(function() {
        var selectedDept = $(this).val();
        var experienceDate = $('#dateOfJoining').val();
        if (selectedDept && experienceDate) {
            // Calculate experience in years
            var currentDate = new Date();
            var experienceDateObj = new Date(experienceDate);
            var experienceInYears = (currentDate - experienceDateObj) / (1000 * 60 * 60 * 24 * 365);
            experienceInYears = Math.floor(experienceInYears);
            var basicPay = 0;
            switch (selectedDept) {
                case 'Accounts':
                    if (experienceInYears < 2) {
                        basicPay = 15000;
                    } else if (experienceInYears >= 2 && experienceInYears <= 10) {
                        basicPay = 25000;
                    } else {
                        basicPay = 35000;
                    }
                    break;
                case 'Operations':
                    if (experienceInYears < 2) {
                        basicPay = 20000;
                    } else if (experienceInYears >= 2 && experienceInYears <= 10) {
                        basicPay = 30000;
                    } else {
                        basicPay = 40000;
                    }
                    break;
                case 'HR':
                    if (experienceInYears < 2) {
                        basicPay = 10000;
                    } else if (experienceInYears >= 2 && experienceInYears <= 10) {
                        basicPay = 20000;
                    } else {
                        basicPay = 30000;
                    }
                    break;
                default:
                    basicPay = 0;
            }
            $('#bpay').val(basicPay);
        } else {
            $('#bpay').val('');
        }

    });

    loadData();

    $('#dept, #empName, #desig, #dateOfJoining').on('input change', function () {
        validateForm();
    });

    $('#dateOfJoining').change(function () {
        var selectedDate = $(this).val();
        var currentDate = new Date();

        if (selectedDate) {
            var selectedDateObj = new Date(selectedDate);

            if (selectedDateObj > currentDate) {
                alert('Please select a past or current date.');
                $(this).val(''); // Clear the selected date
            }
        }
    });

    $("#btnAdd").click(addItem);
});
