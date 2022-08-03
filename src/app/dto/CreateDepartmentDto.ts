import { IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public name: string;

    

    @IsNumber()
    public employeeno: number;

    
    

   
}
