import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server';
import { DocumentNode, GraphQLResolveInfo, GraphQLSchema } from 'graphql';

// See below about resolver functions.
type GraphQLFieldResolveFn = (
	source?: any,
	args?: { [argName: string]: any },
	context?: any,
	info?: GraphQLResolveInfo
) => any;

const books: { title: string; author: string }[] = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin'
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster'
	},
	{
		title: 'test',
		author: 'ju'
	}
];

export function setupTypeDef(): DocumentNode {
	// Construct a schema, using GraphQL schema language
	const typeDefs = gql`
		type Book {
			title: String
			author: String
		}

		type Author {
			name: String
			books: [Book]
		}

		type Query {
			getBooks(title: String): [Book]
		}
	`;

	return typeDefs;
}
export function setupResolvers() {
	const resolvers: {
		Query: {
			getBooks: GraphQLFieldResolveFn;
		};
	} = {
		Query: {
			getBooks: () => {
				return books;
			}
		}
	};

	return resolvers;
}

export function getSchema(): GraphQLSchema {
	return makeExecutableSchema({
		typeDefs: setupTypeDef(),
		resolvers: setupResolvers()
	});
}

export async function getApolloServer(): Promise<ApolloServer> {
	const server = new ApolloServer({ schema: getSchema() });

	return server;
}
