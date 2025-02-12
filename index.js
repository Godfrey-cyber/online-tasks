import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import colors from "colors"

import schema from "./schema/schema.js"
import mutations from "./schema/schema.js"
import { graphqlHTTP } from "express-graphql"
import cors from "cors"

const app = express()
dotenv.config()

// mongo Db Connnection
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database running".cyan.underline.bold)).catch((err) => {
	console.log(err)
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected".red.underline.bold)
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: process.env.NODE_ENV === "development"
}))

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server running on port ${process.env.PORT}`.yellow.underline.bold)
})