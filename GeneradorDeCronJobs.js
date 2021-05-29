import schedule from 'node-schedule';
import cronTime from "cron-time-generator";

const MSJ_ERROR_JOB_NULL = "The Job that are you trying to delete does not exist"
const MSJ_ERROR_JOB_NAME_NOT_FOUND = "The job are you looking at does not exist"
const MSJ_ERROR_JOB_NAME_NOT_STRING = "The Job name its not a String"

function cronJob() {
    return {
        createDateBasedScheduling: (jobName, date, task) => {
            const job = schedule.scheduleJob(jobName, date, task)
            console.log('---------------------')
            console.log(`Job ${jobName} created`)
            return job
        },
        createRecurrenceJob: (jobName, obj, task) => {
            const job = schedule.scheduleJob(jobName, obj, task)
            console.log('---------------------')
            console.log(`Job created to run based on: ` + JSON.stringify(obj))
            return job
        },
        cancelJobExecutionByObj: (job) => {
            if (job === null) {
                throw new Error(MSJ_ERROR_JOB_NULL);
            }
            job.cancel()
            console.log('---------------------')
            console.log('Job canceled')
        },
        cancelJobExecutionByName: (jobName) => {
            if(typeof jobName !== 'string'){
                throw new Error(MSJ_ERROR_JOB_NAME_NOT_STRING);
            }
            try {
                const job = schedule.scheduledJobs[jobName]
                job.cancel()
                console.log('---------------------')
                console.log(`Job ${jobName} canceled`)
            } catch (error) {
                throw new Error(MSJ_ERROR_JOB_NAME_NOT_FOUND);
            }
        },
        rescheduleJobByObj: (job, date) => {
            if (job === null) {
                throw new Error(MSJ_ERROR_JOB_NULL);
            }
            schedule.rescheduleJob(job, date)
            console.log('---------------------')
            console.log('Job Rescheduled')
        },
        rescheduleJobByName: (jobName, date) => {
            if(typeof jobName !== 'string'){
                throw new Error(MSJ_ERROR_JOB_NAME_NOT_STRING);
            }
            try {
                const job = schedule.scheduledJobs[jobName]
                schedule.rescheduleJob(job, date)
                console.log('---------------------')
                console.log(`Job ${jobName} Rescheduled`)
            } catch (error) {
                throw new Error(MSJ_ERROR_JOB_NAME_NOT_FOUND);
            }
        },
        getExecutionRules: () =>{
            return cronTime
        }
    }
}
export { cronJob }

