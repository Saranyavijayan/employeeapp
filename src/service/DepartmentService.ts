import { plainToClass } from "class-transformer";
import { Department } from "../app/entities/Department";
import HttpException from "../app/exception/HttpException";
import IdNotFoundException from "../app/exception/IdNotFoundException";
import { DepartmentRespository } from "../app/repository/departmentRepository";
import { ErrorCodes } from "../app/util/errorCode";

export class DepartmentService {
    departmentRepository: any;
    constructor(private departmentRepo: DepartmentRespository) { }

    // function for getting all departments
    async getAllDepartment() {
        return await this.departmentRepo.getAllDepartment()


    }
    // function for getting a perticular department by its id
    async getDepartmentbyId(departnmentId: string) {

        const deptdetail = await this.departmentRepo.getDepartmentbyId(departnmentId);
        if (!deptdetail) {
            throw new IdNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        else {
            return deptdetail;
        }
    }
    // function for creating new department
    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                departmentId: departmentDetails.departmentId,
                employeeno: departmentDetails.employeeno,

            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department", "");
        }
    }
    // function to update a department detail by its id
    public async updateDepatment(departmentId: string, departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                departmentId: departmentDetails.departmentId,
                employeeno: departmentDetails.employeeno

            });
            const save = await this.departmentRepo.updateDepartmentDetails(departmentId, newDepartment);

            return save;
        } catch (err) {
            throw new IdNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }
    }
    // function to delete a department by its id
    public async deleteDepartment(departmentId: string) {
        try {

            const save = await this.departmentRepo.softDeleteDepartmentById(departmentId);

            return save;
        } catch (err) {
            throw new IdNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);

        }
    }
}
