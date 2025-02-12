import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql"
import Project from "../models/Project.js"
import Client from "../models/Client.js"
// This root pertains to queries
export const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		//projects
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args){
				return Project.find()
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return Project.findById(args.id)
			},
		},
		// client
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args){
				return Client.find()
			}
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return Client.findById(args.id)
			},
		},
	},
})

// This root pertains to queries
export const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		//projects
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args){
				return Project.find()
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return Project.findById(args.id)
			},
		},
		// client
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args){
				return Client.find()
			}
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return Client.findById(args.id)
			},
		},
	},
})