import { IsNumber, IsString } from "class-validator";

export class UpdateDepartmentDto {
    @IsString()
    public name: string;

    

    @IsNumber()
    public employeeno: number;
}

    
    

   

