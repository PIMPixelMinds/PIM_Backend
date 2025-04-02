import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AddAppointmentDto } from './dto/addAppointment.dto';
import { EditAppointmentDto } from './dto/editAppointment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('appointment')
export class AppointmentController {

  constructor(private readonly appointmentService: AppointmentService) { }

  @UseGuards(JwtAuthGuard)
  @Post('addAppointment')
  AddAppointment(@Body() addAppointmentDto: AddAppointmentDto, @Request() req) {
    return this.appointmentService.addAppointment(addAppointmentDto, req.user);
  }

  @Put('updateAppointment/:appointmentName')
  UpdateAppointment(@Param('appointmentName') appointmentName: string, @Body() editAppointmentDto: EditAppointmentDto) {
    return this.appointmentService.updateAppointment(appointmentName, editAppointmentDto);
  }

  @Put('cancelAppointment/:appointmentName')
  async cancelAppointment(@Param('appointmentName') appointmentName: string): Promise<{ message: string }> {
    return this.appointmentService.cancelAppointment(appointmentName);
  }

  @UseGuards(JwtAuthGuard)
  @Get('displayAppointment')
  displayAppointment(@Request() req): Promise<{ appointment }> {
    return this.appointmentService.displayAppointment(req.user);
  }

  @Put('updateFcmToken')
  async updateFcmToken(@Body() body: { fullName: string, fcmToken: string }) {
    return this.appointmentService.updateFcmToken(body.fullName, body.fcmToken);
  }

  @Get('countAppointments')
  countAppointments(){
    return this.appointmentService.countAppointments();
  }

}