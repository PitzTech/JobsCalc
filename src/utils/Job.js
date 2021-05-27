module.exports = {
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