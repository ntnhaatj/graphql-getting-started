# graphql-getting-started
Getting started Graphql Example


### How to run
```
$ node index.js
Go to http://localhost:3000/graphiql to run queries!
```

### Query Examples
Go to http://localhost:3000/graphiql to run queries!
```
query BookAndAuthorDetail {
  book(id:1) {
    author {
      name
    }
    title
  }
  author(id:1){
    name
    books {
      title
    }
  }
}
```