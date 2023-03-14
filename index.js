import dotenv from "dotenv"
import express from "express"

import schema from "./schema/schema.js"
import { graphqlHTTP } from "express-graphql"
import cors from "cors"

const app = express()
dotenv.config()

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: process.env.NODE_ENV === "development"
}))

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})