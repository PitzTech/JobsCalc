module.exports = {
    index(request, response){
        //     response.sendFile(basePath + "/index.html")
        return response.render("profile", {profile: Profile.data})
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