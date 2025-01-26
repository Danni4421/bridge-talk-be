import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { ValidationService } from './validation.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: format.json(),
      transports: [new transports.Console()],
    }),
  ],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class CommonModule {}
