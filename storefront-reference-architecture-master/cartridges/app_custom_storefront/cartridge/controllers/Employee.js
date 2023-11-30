'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Logger = require('dw/system/Logger');

server.get('EmpDetails', function (req, res, next) {
    res.render('testDetails/emp');
    next();
});

server.post('SaveDetails', server.middleware.https,
    function (req, res, next) {
        var empId = req.form.Emp_id;
        var fname = req.form.emp_firstName;
        var lname = req.form.emp_lastName;
        var company = req.form.company;
        var emp;

        try {
           

            var existingEmployee = CustomObjectMgr.getCustomObject("Emp_Details", empId);

            if (!existingEmployee) {
                Transaction.wrap(function () {
                    var Employee = CustomObjectMgr.createCustomObject('Emp_Details', empId);
                    Employee.custom.Emp_id = empId;
                    Employee.custom.emp_firstName = fname;
                    Employee.custom.emp_lastName = lname;
                    Employee.custom.company = company;
                    emp = Employee;

                    // Logging to check if the custom object is created
                    Logger.debug('CustomObject created successfully:', emp);
                });
            } else {
                emp = existingEmployee;

                // Logging to check if the custom object is updated
                Logger.debug('CustomObject updated successfully:', emp);
            }

           
            // Render the employee details
            res.render('testDetails/employeeDetails', {
                empId: emp.custom.Emp_id,
                fname: emp.custom.emp_firstName,
                lname: emp.custom.emp_lastName,
                company: emp.custom.company
            });

            next();
        } catch (e) {
        
            // Logging for any errors during the transaction
            Logger.error('Error saving custom object: ' + e.message);
            
            // Handle the error, show an error page, or return an error response
            return next(new Error('Error saving custom object: ' + e.message));
        }
    }
);

module.exports = server.exports();
