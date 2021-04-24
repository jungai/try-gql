import "dotenv/config";
import { getApolloServer } from "@workspace/core_app";

(async () => {
	const server = await getApolloServer();

	server.listen({ port: 4000 }, () =>
		console.log(`🚀 Server ready at http://localhost:4000`)
	);
})();
