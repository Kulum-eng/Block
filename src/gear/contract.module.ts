import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GearController } from './contract.controller';
import { GearService } from './contract.service';
import { Contract } from './entities/contract.entity';
import { Notification } from './entities/notification.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Notification, User])],
  controllers: [GearController],
  providers: [GearService],
})
export class GearModule {

  
}
