CREATE DEFINER=`marcos`@`localhost` PROCEDURE `EmployeeAddOrEdit`(
	IN _EmpID INT,
	IN _Name varchar(45),
	IN _EmpCode varchar(45),
	IN _Salary int
)
BEGIN
	IF _EmpID = 0 THEN
		INSERT INTO employee (Name,EmpCode,Salary)
        VALUES (_Name,_EmpCode,_Salary);
        
        SET _EmpID = LAST_INSERT_ID();
	ELSE
		UPDATE employee SET Name=_Name,EmpCode=_EmpCode,Salary=_Salary WHERE EmpID=_EmpID;
	END IF;
    SELECT _EmpID AS 'EmpID';
END