import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GearService } from './contract.service';

@Controller('gear')
export class GearController {
  constructor(private readonly gearService: GearService) {}

  // obtener trabajos filtrados por habilidad
  @Get('trabajos/:habilidad')
  getTrabajosPorHabilidad(@Param('habilidad') habilidad: string) {
    return this.gearService.getTrabajosPorHabilidad(habilidad);
  }

  // crear un contrato
  @Post('contrato')
  crearContrato(
    @Body() body: { clienteId: number; freelancerId: number; monto: number },
  ) {
    return this.gearService.crearContrato(
      body.clienteId,
      body.freelancerId,
      body.monto,
    );
  }

  // aprobar contrato por cliente
  @Post('contrato/:id/cliente')
  aprobarContratoPorCliente(@Param('id') id: number) {
    return this.gearService.aprobarContratoPorCliente(id);
  }

  // Aprobar contrato por freelancer
  @Post('contrato/:id/freelancer')
  aprobarContratoPorFreelancer(@Param('id') id: number) {
    return this.gearService.aprobarContratoPorFreelancer(id);
  }

  // Crear una notificación
  @Post('notificacion')
  crearNotificacion(
    @Body() body: { userId: number; mensaje: string },
  ) {
    return this.gearService.crearNotificacion(body.userId, body.mensaje);
  }

  // Obtener notificaciones del usuario
  @Get('notificaciones/:userId')
  getNotificaciones(@Param('userId') userId: number) {
    return this.gearService.getNotificaciones(userId);
  }
}
