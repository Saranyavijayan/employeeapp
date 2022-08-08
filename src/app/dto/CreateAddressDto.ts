import {  IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    public hname: string;

    @IsString()
    public hno: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsString()
    public country : string;

    @IsString()
    public pincode: string;
   
}