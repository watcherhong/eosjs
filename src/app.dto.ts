import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class AbiJsonToBinDTO {

    @ApiProperty({type:'string', name: 'code', description: 'code', required: true })
    @IsString({ message: 'code should be a string'})
    code: string;

    @ApiProperty({ type: 'string', name: 'action', description: 'action', required: true })
    @IsString( { message: 'action should be a string'})
    action: string;

    @ApiProperty({ name: 'args', description: 'actions', required: true })
    args: any[];
}

