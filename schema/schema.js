import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLEnumType } from "graphql"
import Project from "../models/Project.js"
import Client from "../models/Client.js"
// client Type
const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
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
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Client.findById(parent.clientId)
			}
		}
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

//mutations

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		//add client
		addClient: {
			type: ClientType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString)},
				email: { type: new GraphQLNonNull(GraphQLString)},
				phone: { type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args) {
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone
				});
				return client.save()
			}
		},
		//add project
		addProject: {
			type: ProjectType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString)},
				description: { type: new GraphQLNonNull(GraphQLString)},
				status: { type: new GraphQLEnumType({
					name: "ProjectStatus",
					values: {
						'new': { value: 'Not Started'},
						'progress': { value: 'In Progress'},
						'completed': { value: 'Completed'},
					}
				}),
				defaultValue: "Not Started"
			},
			clientId: { type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const project = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId
				});
				return project.save()
			}
		},
		//delete a client
		deleteClient: {
			type: ClientType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				return Client.findByIdAndRemove(args.id)
			}
		},
		//delete a project
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				return Project.findByIdAndRemove(args.id)
			}
		},
		//update a project
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID)},
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				clientId: { type: GraphQLString },
				status: { 
					type: new GraphQLEnumType({
						name: "ProjectStatusUpdated",
						values: {
							'new': { value: 'Not Started'},
							'progress': { value: 'In Progress'},
							'completed': { value: 'Completed'},
						}
					}),
				},
			},
			resolve(parent, args) {
				return Project.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status,
							clientId: args.clientId
						},
					},
					{ new: true }
				)
			}
		},
	},
})

const schema = new GraphQLSchema({
	query: RootQuery,
	mutation
})

export default schema

// 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