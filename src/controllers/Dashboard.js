JobData     = require("../model/Job")
ProfileData = require("../model/Profile")
JobUtils    = require("../utils/Job")

module.exports = {
    index(request, response){
        const jobs = JobData.get()
        const profile = ProfileData.get()

        let statusCount = {
            progress: 0,
            done : 0,
            total: jobs.length
        }    

        // Jobs Panel

        let workingHours = 0
        
        const updatedJobs = jobs.map(job => {
                    
            const remaining = JobUtils.getRemainingDays(job)
            const status = remaining < 0 ? "done" : "progress"

            // Descontar horas de trabalho do total
            if(status == "progress")
                workingHours += Number(job.dailyHours)

            // Contar trabalhos por status
            statusCount[status]++
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile.hourValue)
            }  
        })

        const freeHours = profile["hours-per-day"] - workingHours
        console.log(`${profile["hours-per-day"]} - ${workingHours} = ${profile["hours-per-day"] - workingHours}`)

        return response.render("index", {jobs: updatedJobs, profile: profile, statusCount, freeHours})
    },
}