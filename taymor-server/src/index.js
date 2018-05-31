const {GraphQLServer} = require('graphql-yoga')
  const {Prisma} = require('prisma-binding')

const resolvers = {
  Query: {
    colors: (_, args, context, info) => {
      return context.prisma.query.colors(
        {
          where: {
              title_contains: args.searchString,
          },
        },
        info,
      )
    },
    user: (_, args, context, info) => {
      return context.prisma.query.user(
        {
          where: {
            id: args.id,
          },
        },
        info,
      )
    },
  },
  Mutation: {
    createColor: (_, args, context, info) => {
      return context.prisma.mutation.createColor(
        {
          data: {
            color: args.color,
          },
        },
        info,
      )
    },
    publish: (_, args, context, info) => {
      return context.prisma.mutation.updateColor(
        {
          where: {
            id: args.id,
          },
          data: {
            published: true,
          },
        },
        info,
      )
    },
    deleteColor: (_, args, context, info) => {
      return context.prisma.mutation.deleteColor(
        {
          where: {
            id: args.id,
          },
        },
        info,
      )
    },
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            name: args.name,
          },
        },
        info,
      )
    },
  },
}


        const server = new GraphQLServer({
          typeDefs: 'src/schema.graphql',
          resolvers,
          context: req => ({
            ...req,
            prisma: new Prisma({typeDefs: 'src/generated/prisma.graphql', endpoint: 'http://localhost:4466'})
          })
        });
        server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))
