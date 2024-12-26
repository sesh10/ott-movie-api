import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
  
export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsOptional()
    readonly role: string;
}