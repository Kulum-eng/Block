import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { Notification } from './entities/notification.entity';
import { User } from './entities/user.entity';

@Injectable()
export class GearService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getTrabajosPorHabilidad(habilidad: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skill')
      .where('skill.name = :habilidad', { habilidad })
      .getMany();
  }

  async crearContrato(clienteId: number, EmpleoyeeId: number, monto: number) {
    const contrato = this.contractsRepository.create({
      client: { id: clienteId },
      freelancer: { id: EmpleoyeeId }, 
      amout : monto,
      approvedByClient: false,
      approvedByEmpleoyee: false,
    });
    return this.contractsRepository.save(contrato);
  }

  async aprobarContratoPorCliente(id: number) {
    const contrato = await this.contractsRepository.findOne({ where: { id } });
    contrato.approvedByClient = true;
    return this.contractsRepository.save(contrato);
  }

  async aprobarContratoPorEmpleoyee(id: number) {
    const contrato = await this.contractsRepository.findOne({ where: { id } });
    contrato.approvedByEmpleoye = true;
    return this.contractsRepository.save(contrato);
  }

  async crearNotificacion(userId: number, mensaje: string) {
    const notificacion = this.notificationsRepository.create({
      user: { id: userId },
      message: mensaje,
      isRead: false, 
    });

    return this.notificationsRepository.save(notificacion);
  }

  

  async getNotificaciones(userId: number) {
    return this.notificationsRepository.find({ where: { user: { id: userId } } });
  }
}
