import { plainToClass } from "class-transformer";
import { Department } from "../app/entities/Department";
import HttpException from "../app/exception/HttpException";
import { DepartmentRespository } from "../app/repository/departmentRepository";

export class DepartmentService{
    departmentRepository: any;
    constructor(private departmentRepo:DepartmentRespository){}
   async getAllDepartment(){
    return await this.departmentRepo.getAllDepartment()
        
    
    }

    async getDepartmentbyId(departnmentId:string){
        return await this.departmentRepo.getDepartmentbyId(departnmentId)
    }
    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                departmentId: departmentDetails.departmentId,
                employeeno: departmentDetails.employeeno,
                // age: employeeDetails.age,
                // isActive: true,
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department","");
        }
    }

    public async updateDepatment(departmentId:string,departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                departmentId: departmentDetails.departmentId,
                employeeno: departmentDetails.employeeno
                
            });
            const save = await this.departmentRepo.updateDepartmentDetails(departmentId,newDepartment);
            
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to update department","");
        }
    }
    public async deleteDepartment(departmentId:string) {
        try {
            
            const save = await this.departmentRepo.softDeleteDepartmentById(departmentId);
            
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to delete department","");
        }
    }
    }
    