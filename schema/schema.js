import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList } from "graphql"
import { clients, projects } from "./sampleData.js"
// client Type
const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
		career: { type: GraphQLString },
	})
})

// client Type
const ProjectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
	})
})

// This root pertains to queries
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		//projects
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args){
				return projects
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return projects.find((project) => project.id === args.id)
			},
		},
		// client
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args){
				return clients
			}
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return clients.find((client) => client.id === args.id)
			},
		},
	},
})

const schema = new GraphQLSchema({
	query: RootQuery
})

export default schema

// hello