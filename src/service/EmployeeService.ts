import { plainToClass } from "class-transformer";
import { Employee } from "../app/entities/Employee";
import HttpException from "../app/exception/HttpException";
import { EmployeeRespository } from "../app/repository/employeeRepository";
import bcrypt from "bcrypt";
//import UserNotAuthorizedException from "../app/exception/UserNotAuthorizedException";
import { ErrorCodes } from "../app/util/errorCode";
import IncorrectUsernameOrPasswordException from "../app/exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken";
import UserNotAuthorizedException from "../app/exception/UserNotAuthorisedException";
import IdNotFoundException from "../app/exception/IdNotFoundException";

export class EmployeeService{
    employeeRepository: any;
    constructor(private employeeRepo:EmployeeRespository){}
   async getAllEmployees(){
    return await this.employeeRepo.getAllEmployees()
        
    
    }
async getEmployeebyId(employeeId:string){
    const emp= await this.employeeRepo.getEmployeebyId(employeeId);
    if(!emp){
      throw new IdNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
    else{
      return emp;
    }
}
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                departmentId: employeeDetails.departmentId,
                joiningdate: employeeDetails.joiningdate,
                status: employeeDetails.status,
                role:employeeDetails.role,
                experience:employeeDetails.experience,
                password:employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                username: employeeDetails.username
                // age: employeeDetails.age,
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            // throw new HttpException(400, "Failed to create employee","");
            throw err;
        }
    }

    public async updateEmployee(employeeId:string,employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                departmentId: employeeDetails.departmentId,
                joiningdate: employeeDetails.joiningdate,
                status: employeeDetails.status,
                role:employeeDetails.role,
                experience:employeeDetails.experience,
                 username: employeeDetails.username,
                 password:employeeDetails.password
                // age: employeeDetails.age,
                // isActive: true,
            });
            const save = await this.employeeRepo.updateEmployeeDetails(employeeId,newEmployee);
            
            return save;
            // if(!save){
            //     throw new IdNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
            // }
            // else{
            //     return save;
            // }
        } catch (err) {
            throw new HttpException(400, "Failed to update employee","");
            //throw new IdNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
    }

    public async deleteEmployee(employeeId:string) {
        try {
            
            const save = await this.employeeRepo.softDeleteEmployeeById(employeeId);
            
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to delete employee","");

        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role":employeeDetails.role,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.USER_NOT_FOUND);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
    
    }
    