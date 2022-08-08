import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository {
    // get all department repository function
    async getAllDepartment() {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }

    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    async getDepartmentbyId(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findOne(id);
    }

    public async updateDepartmentDetails(departnmentId: string, departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDEpartmentDetails = await departmentRepo.update({ id: departnmentId, deletedAt: null }, departmentDetails);
        return updateDEpartmentDetails;
    }

    public async softDeleteDepartmentById(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete({
            id
        });
    }
}
