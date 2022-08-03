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
import { Address } from "../app/entities/address";
import { CreateEmployeeDto } from "../app/dto/createEmployeeDto";
import { UpdateEmployeeDto } from "../app/dto/UpdateEmployeeDto";

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
    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        try {

            const newAddress: Address = plainToClass(Address, {
              hname:employeeDetails.address.hname,
              hno:employeeDetails.address.hno,
              city:employeeDetails.address.city,
              state:employeeDetails.address.state,
              country:employeeDetails.address.country,
              pincode:employeeDetails.address.pincode

            })
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                departmentId: employeeDetails.departmentId,
                joiningdate: employeeDetails.joiningdate,
                status: employeeDetails.status,
                role:employeeDetails.role,
                experience:employeeDetails.experience,
                password:employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                username: employeeDetails.username,
                address: newAddress,
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

    public async updateEmployee(employeeId:string,employeeDetails: UpdateEmployeeDto) {
      //console.log(employeeId);
      //console.log(employeeDetails);
        try {
          const addid=await this.employeeRepo.getEmployeebyId(employeeId);

          console.log(addid);

          const newAddress: Address = plainToClass(Address, {
            id:addid.addressId,
            hname:employeeDetails.address.hname,
            hno:employeeDetails.address.hno,
            city:employeeDetails.address.city,
            state:employeeDetails.address.state,
            country:employeeDetails.address.country,
            pincode:employeeDetails.address.pincode

          })

            const newEmployee = plainToClass(Employee, {
                id:employeeId,
                name: employeeDetails.name,
                departmentId: employeeDetails.departmentId,
                joiningdate: employeeDetails.joiningdate,
                status: employeeDetails.status,
                role:employeeDetails.role,
                experience:employeeDetails.experience,
                 username: employeeDetails.username, 
                 password:employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                 address: newAddress

                // age: employeeDetails.age,
                // isActive: true,
            });
            const save = await this.employeeRepo.updateEmployeeDetails(newEmployee);
           // console.log(save);
            return save;
            // if(!save){
            //     throw new IdNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
            // }
            // else{
            //     return save;
            // }
        } catch (err) {
            //throw new HttpException(400, "Failed to update employee","");
            throw new IdNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
    }

    public async deleteEmployee(employeeId:string) {

      const detail=await this.getEmployeebyId(employeeId)
      if(detail)
        try {
            
            const save = await this.employeeRepo.softDeleteEmployeeById(detail);
            
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to delete employee","");

        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByUsername(
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
    