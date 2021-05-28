const ProfileData = require("../model/Profile")

module.exports = {
    async index(request, response){
        //     response.sendFile(basePath + "/index.html")
        return response.render("profile", {profile: await ProfileData.get()})
    },
    async update(request, response){
        const profile = await ProfileData.get()
        const data = request.body

        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        const monthlyTotalHours = weeksPerMonth * weekTotalHours

        const hourValue = data["monthly-budget"] / monthlyTotalHours
        
        await ProfileData.update({
            ...profile,
            ...request.body,
            hourValue
        })
        return response.redirect("/profile")
    }
}