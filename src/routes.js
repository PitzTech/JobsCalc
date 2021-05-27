const express = require("express")
const routes = express.Router()

// EJS already uses __dirname + "/views"  as basePath
const views = __dirname + "/views/" 

const Profile = {
    data: {
        name: "PitzTech",
        avatar: "https://github.com/PitzTech.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        hourValue: 30
    },
    controllers:{
        index(request, response){
            //     response.sendFile(basePath + "/index.html")
            return response.render(views + "profile", {profile: Profile.data})
        },
        update(request, response){
            const data = request.body

            const weeksPerYear = 52
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            const monthlyTotalHours = weeksPerMonth * weekTotalHours

            const hourValue = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...request.body,
                hourValue
            }
            return response.redirect("/profile")
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso", 
            dailyHours: 2,
            totalHours: 60,
            createdAt: Date.now(),
            budget: 45000
        },
        {
            id: 2,
            name: "OneTwo Project", 
            dailyHours: 3,
            totalHours: 47, 
            createdAt: Date.now(),
            budget: 45000
        }
    ],
    controllers: {
        index(request, response){

            const updatedJobs = Job.data.map(job => {
                
                const remaining = Job.services.getRemainingDays(job)
                const status = remaining < 0 ? "done" : "progress"
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data.hourValue)
                }  
            })
    
            return response.render(views + "index", {jobs:updatedJobs, profile: Profile.data})
        },
        save(request, response){
            // { name: 'teste', 'daily-hours': '10', 'total-hours': '45' }
            const jobId = Job.data[Job.data.length-1]?.id + 1 || 1;
            const dayInMs = 24*60*60*1000
            Job.data.push({
                id: jobId,
                name: request.body.name,
                dailyHours: request.body["daily-hours"],
                totalHours: request.body["total-hours"],
                createdAt: Date.now() + dayInMs
            })
            return response.redirect("/")
        },
        create(request, response){ 
            return response.render(views + "job")
        },
        edit(request, response){

            const jobId = request.params.id

            const job = Job.data.find(job => job.id == jobId)

            if(!job) 
                return responde.send("Job not found!")

            job.budget = Job.services.calculateBudget(job, Profile.data.hourValue)

            return response.render(views + "job-edit", {job})
        },
        update(request, response){
            
            const jobId = request.params.id

            const job = Job.data.find(job => job.id == jobId)

            if(!job) 
                return responde.send("Job not found!")

            const updatedJob = {
                ...job,
                name: request.body.name,
                dailyHours: request.body["daily-hours"],
                totalHours: request.body["total-hours"],
            }

            Job.data = Job.data.map(job => {
                if(job.id == jobId)
                    job = updatedJob

                return job
            })
            
            response.redirect("/job/edit/" + jobId)
        },
        delete(request, response){
            const jobId = request.params.id

            Job.data = Job.data.filter(job => job.id != jobId)

            return response.redirect("/")
        }
    },
    services: {
        getRemainingDays(job){
            const remainingDays = Math.ceil(job.totalHours / job.dailyHours)
        
            const createdDate = new Date(job.createdAt)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
        
            const dayInMs = 24*60*60*1000
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            return dayDiff
        },
        calculateBudget(job, hourValue){
            return hourValue * job.totalHours
        }
    }
}

// Index Page
routes.get("/", Job.controllers.index)

// Jobs Creation Page
routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)

// Job Edit Page

routes.get("/job/edit/:id", Job.controllers.edit)
routes.post("/job/edit/:id", Job.controllers.update)
routes.post("/job/delete/:id", Job.controllers.delete)

// Profile Page

routes.get("/profile", Profile.controllers.index)
routes.post("/profile", Profile.controllers.update)

module.exports = routes