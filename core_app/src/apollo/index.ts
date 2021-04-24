import { ApolloServer, gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';
import { Express } from 'express';
import { app } from '../express';

export function setupTypeDef(): DocumentNode {
	// Construct a schema, using GraphQL schema language
	const typeDefs = gql`
		type Query {
			hello: String
		}
	`;

	return typeDefs;
}

export function setupResolvers() {
	// Provide resolver functions for your schema fields

	const resolvers = {
		Query: {
			hello: () => 'Hello world!'
		}
	};

	return resolvers;
}

export async function getApolloServer(): Promise<{
	app: Express;
	server: ApolloServer;
}> {
	const server = new ApolloServer({
		typeDefs: setupTypeDef(),
		resolvers: setupResolvers()
	});
	await server.start();

	server.applyMiddleware({ app, path: '/jugql' });

	return { app, server };
}
