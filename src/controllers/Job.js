const ProfileData = require("../model/Profile")
const JobData     = require("../model/Job")
const JobUtils    = require("../utils/Job")

module.exports ={
    async save(request, response){
        // { name: 'teste', 'daily-hours': '10', 'total-hours': '45' }
        //const dayInMs = 24*60*60*1000
        
        await JobData.create({
            name: request.body.name,
            dailyHours: request.body["daily-hours"],
            totalHours: request.body["total-hours"],
            createdAt: Date.now() //+ dayInMs
        })

        return response.redirect("/")
    },
    create(request, response){ 
        return response.render("job")
    },
    async show(request, response){
        const jobs = await JobData.get()
        const profile = await ProfileData.get()

        const jobId = request.params.id

        const job = jobs.find(job => job.id == jobId)

        if(!job) 
            return response.send("Job not found!")

        job.budget = JobUtils.calculateBudget(job, profile.hourValue)

        return response.render("job-edit", {job})
    },
    async edit(request, response){
        const jobs = await JobData.get()
        
        const jobId = request.params.id

        // Get and Update the Job

        const updatedJob = {
            name: request.body.name,
            dailyHours: request.body["daily-hours"],
            totalHours: request.body["total-hours"],
        }

        await JobData.update(updatedJob, jobId)
        
        response.redirect("/job/edit/" + jobId)
    },
    async delete(request, response){
        const jobs = await JobData.get()

        const jobId = request.params.id

        await JobData.delete(jobId)

        return response.redirect("/")
    }
}