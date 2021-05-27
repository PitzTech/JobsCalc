let data = [
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
]

module.exports = {
    get(){
        return data
    },
    update(newData){
        data = newData
    },
    delete(id){
        data = data.filter(job => job.id != id)
    }
}