const ProfileData = require("../model/Profile")
const JobData     = require("../model/Job")
const JobUtils    = require("../utils/Job")

module.exports ={
    save(request, response){
        const jobs = JobData.get()

        // { name: 'teste', 'daily-hours': '10', 'total-hours': '45' }
        const jobId = Number(jobs[jobs.length-1]?.id) + 1 || 1;
        const dayInMs = 24*60*60*1000
        
        JobData.create({
            id: jobId,
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
    show(request, response){
        const jobs = JobData.get()
        const profile = ProfileData.get()

        const jobId = request.params.id

        const job = jobs.find(job => job.id == jobId)

        if(!job) 
            return response.send("Job not found!")

        job.budget = JobUtils.calculateBudget(job, profile.hourValue)

        return response.render("job-edit", {job})
    },
    edit(request, response){
        const jobs = JobData.get()
        
        const jobId = request.params.id

        const job = jobs.find(job => job.id == jobId)

        const updatedJob = {
            ...job,
            name: request.body.name,
            dailyHours: request.body["daily-hours"],
            totalHours: request.body["total-hours"],
        }

        const updatedJobs = jobs.map(job => {
            if(job.id == jobId)
                job = updatedJob

            return job
        })

        JobData.update(updatedJobs)
        
        response.redirect("/job/edit/" + jobId)
    },
    delete(request, response){
        const jobs = JobData.get()

        const jobId = request.params.id

        JobData.delete(jobId)

        return response.redirect("/")
    }
}