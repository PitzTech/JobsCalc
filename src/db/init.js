const Database = require("./config")

const initDb = {
    async init(){
        const db = await Database()

        await db.exec(`
            CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                hourValue INT
            );
        `)

        await db.exec(`
            CREATE TABLE jobs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                dailyHours INT,
                totalHours INT,
                createdAt DATETIME
            );
        `)

        await db.run(`
            INSERT INTO profile (
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day,
                vacation_per_year,
                hourValue
            ) VALUES (
                "PitzTech",
                "https://github.com/PitzTech.png",
                4500,
                5,
                5,
                4,
                45
            );
        `)

        await db.run(`
            INSERT INTO jobs(
                name,
                dailyHours,
                totalHours,
                createdAt
            ) VALUES (
                "Seu Primeiro Job",
                2,
                1,
                1617514376018
            );
        `)

        await db.run(`
            INSERT INTO jobs(
                name,
                dailyHours,
                totalHours,
                createdAt
            ) VALUES (
                "Seu Segundo Job",
                3,
                47,
                1617514376018
            );
        `)

        await db.close()
    }
}

initDb.init()