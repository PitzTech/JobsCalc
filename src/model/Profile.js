let Data = {
    name: "PitzTech",
    avatar: "https://github.com/PitzTech.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    hourValue: 30
}

module.exports = {
    get(){
        return Data
    },
    update(newData){
        Data = newData
    }
}