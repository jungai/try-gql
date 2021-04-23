import { getApolloServer } from '../apollo';

(async () => {
    const { app, server } = await getApolloServer();

    app.listen(3000, () =>
        console.log(
            `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
        )
    );
})();
