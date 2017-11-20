import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

let i = 0;

const peopleData = (i) => [
  { id: (i * 3) + 1, name: 'John Smith' },
  { id: (i * 3) + 2, name: 'Sara Smith' },
  { id: (i * 3) + 3, name: 'Budd Deey' },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData(i++),
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
