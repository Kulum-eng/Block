import { Test, TestingModule } from '@nestjs/testing';
import { GearService } from './contract.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

describe('GearService - Notificaciones', () => {
  let service: GearService;
  let notificationRepository: Repository<Notification>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GearService,
        {
          provide: getRepositoryToken(Notification),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GearService>(GearService);
    notificationRepository = module.get<Repository<Notification>>(
      getRepositoryToken(Notification),
    );
  });

  it('debería crear una notificación', async () => {
    const notification = { id: 1, message: 'Contrato creado', isRead: false };
    jest.spyOn(notificationRepository, 'save').mockResolvedValue(notification);

    const result = await service.crearNotificacion(1, 'Contrato creado');
    expect(result).toEqual(notification);
  });

  it('debería obtener notificaciones por usuario', async () => {
    const notifications = [
      { id: 1, message: 'Contrato creado', isRead: false },
    ];
    jest.spyOn(notificationRepository, 'find').mockResolvedValue(notifications);

    const result = await service.getNotificaciones(1);
    expect(result).toEqual(notifications);
  });
});
