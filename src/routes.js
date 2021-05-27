const express = require("express")
const routes  = express.Router()

// Controllers

const ProfileController = require("./controllers/Profile")
const JobController = require("./controllers/Job")
const DashboardController = require("./controllers/Dashboard")

// Index Page
routes.get("/", DashboardController.index)

// Jobs Creation Page
routes.get("/job", JobController.create)
routes.post("/job", JobController.save)

// Job Edit Page

routes.get("/job/edit/:id", JobController.show)
routes.post("/job/edit/:id", JobController.edit)
routes.post("/job/delete/:id", JobController.delete)

// Profile Page

routes.get("/profile", ProfileController.index)
routes.post("/profile", ProfileController.update)

module.exports = routes