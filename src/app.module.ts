import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GearModule } from './gear/contract.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sql',
      database: 'database.sql',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GearModule,
  ],
})
export class AppModule {}
