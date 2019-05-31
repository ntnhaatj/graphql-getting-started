/**
 * This source code is referred from
 * https://www.apollographql.com/docs/apollo-server/v1/example/
 */

const express = require('express');
const bodyParser = require('body-parser');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const _ = require('lodash');


// Fake data
const authors = [
    {
        id: 1,
        name: "Nguyen Nhat Anh",
        email: "nguyennhatanh@gmail.com",
    },
    {
        id: 2,
        name: "J.K. Rowling",
        email: "jkrowling@gmail.com"
    }
]

const books = [
    {
        id: 1,
        title: "Toi thay hoa vang tren co xanh",
        authorId: 1,
    }, 
    {
        id: 2,
        title: "Harry Potter and the Sorcerer's Stone",
        authorId: 2,
    }
];

const getBook = (root, {id}) => {
    return books.filter((book) => book.id === id)[0];
}

const getAuthor = (root, {id}) => {
    return authors.filter((author) => author.id === id)[0];
}

// The Graphql schema in string form
const typeDefs = `
    type Query {
        books: [Book],
        book(id: Int!): Book,
        author(id: Int!): Author,
    },
    type Book {
        id: Int,
        title: String,
        author: Author
    },
    type Author {
        id: Int,
        name: String,
        email: String,
        books: [Book]
    },
`;

// The resolvers 
const resolvers = {
    Query: {
        books: () => books,
        book: getBook,
        author: getAuthor,
    },
    Book: {
        author: (book) => _.find(authors, {id: book.authorId})
    },
    Author: {
        books: (author) => books.filter((book) => book.authorId === author.id ),
    }
}

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const app = express();
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, () => {
    console.log("Go to http://localhost:3000/graphiql to run queries!")
})