import { IsNumber, IsString } from "class-validator";

export class AssignRoleDto {

    @IsNumber({}, { message: 'User id should be a number' })
    readonly userId: number;

    @IsString({ message: 'Value should be a string' })
    readonly value: string;
    
}