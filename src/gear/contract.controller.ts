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
    @Body() body: { clienteId: number; EmpleoyeeId: number; monto: number },
  ) {
    return this.gearService.crearContrato(
      body.clienteId,
      body.EmpleoyeeId,
      body.monto,
    );
  }

  // aprobar contrato por cliente
  @Post('contrato/:id/cliente')
  aprobarContratoPorCliente(@Param('id') id: number) {
    return this.gearService.aprobarContratoPorCliente(id);
  }

  // aprobar contrato por empleoyee
  @Post('contrato/:id/freelancer')
  aprobarContratoPorEmpleoyee(@Param('id') id: number) {
    return this.gearService.aprobarContratoPorEmpleoyee(id);
  }

  // crear una notificación
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
