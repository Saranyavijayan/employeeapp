import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {
    // get all employee repository
    async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }
    // get employee by id repository
    async getEmployeebyId(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne({ where: { id: id }, relations: ['address'] });

    }
    // repository function for saving employee details
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

     // repository function for updating employee details
    public async updateEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.save(employeeDetails

        );
        return updateEmployeeDetails;
    }
     // repository function for deleting employee details
    public async softDeleteEmployeeById(detail: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softRemove(
            detail

        );
    }
     // repository function for getting employee details by name
    public async getEmployeeByUsername(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username: username },
        });
        return employeeDetail;
    }

}
