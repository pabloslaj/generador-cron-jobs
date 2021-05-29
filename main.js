import { cronJob } from './GeneradorDeCronJobs.js';
import fs from 'fs';

// Creo el cron job:
const generador = cronJob()

// Creo la tareas que quiero que sea ejecutadas
const jobName1 = 'removeErrorsJob'
const task1 = function() {
    fs.unlink('./errors.log', err => {
    if (err) throw err;
    console.log('Archivos de error eliminados!');
    });
}

const jobName2 = 'printMSJJob'
const task2 = function(){
    console.log('Hola cron recurrente!')
}

    // Creando un cron job para que se ejecute una vez en una fecha en especifica:
const date = new Date(2021, 4, 27, 21, 4, 0); // año - mes - dia - hora - min - seg
const job1 = generador.createDateBasedScheduling(jobName1 ,date, task1);

    // Cancelando el Job por objeto:
//generador.cancelJobExecutionByObj(job)

    // Cancelando el Job por su nombre:
//generador.cancelJobExecutionByName(jobName1)

    // Rescheduleando el Job a una nueva fecha:
//const date2 = new Date(2021, 4, 27, 21, 5, 0); // año - mes - dia - hora - min - seg
    // Por objeto:
//generador.rescheduleJobByObj(job1, date2)
    // Por nombre:
//generador.rescheduleJobByName(jobName1, date2)

    // Creando un job recurrente ///////////////////////////////////////////////////////////////////////////////////
    // Creo un objeto para que se ejecute x dias de la semana a determinada hora:
//const obj1 = {hour: 16, minute: 9, dayOfWeek: 2, tz: 'America/Argentina/Buenos_Aires'} 
//const job2 = generador.createRecurrenceJob(jobName2,obj1, task1);

    // Creo un objeto para que se ejecute entre determinadas fechas, con un inicio y un fin:
const startTime = new Date(Date.now() + 5000); // Comienza el los próximos 5 segundos
const endTime = new Date(startTime.getTime() + 600000); // Finaliza en los proximos x minutos
const obj2 = { start: startTime, end: endTime, rule: generador.getExecutionRules().everyMinute()}
const jobObj2 = generador.createRecurrenceJob(jobName2, obj2, task2);

