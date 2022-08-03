import { DeepPartial, getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeebyId(id: string){
        const employeeRepo = getConnection().getRepository(Employee);
       return employeeRepo.findOne({where:{id:id}, relations:['address']});
    //    return employeeRepo.findOne(id);
   }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }


    public async updateEmployeeDetails( employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.save(employeeDetails
        //    ...employeeDetails,
         //   id: employeeId,
        );
        return updateEmployeeDetails;
    }
    public async softDeleteEmployeeById(detail:Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softRemove(
            detail
            
        );
    }

    public async getEmployeeByUsername(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username: username },
        });
        return employeeDetail;
    }

    }
