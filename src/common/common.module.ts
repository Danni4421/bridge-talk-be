import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: format.json(),
      transports: [new transports.Console()],
    }),
  ],
})
export class CommonModule {}
