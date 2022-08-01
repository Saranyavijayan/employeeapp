import { plainToClass } from "class-transformer";
import { Employee } from "../app/entities/Employee";
import HttpException from "../app/exception/HttpException";
import { EmployeeRespository } from "../app/repository/employeeRepository";

export class EmployeeService{
    employeeRepository: any;
    constructor(private employeeRepo:EmployeeRespository){}
   async getAllEmployees(){
    return await this.employeeRepo.getAllEmployees()
        
    
    }
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                departmentId: employeeDetails.departmentId,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee","");
        }
    }
    }
    