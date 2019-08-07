# typeorm-basic-usage

Complete project example from TypeGraphQL typeorm-basic-usage example:
[https://github.com/19majkel94/type-graphql/tree/master/examples/typeorm-basic-usage](https://github.com/19majkel94/type-graphql/tree/master/examples/typeorm-basic-usage)

## Running required steps

```bash
docker-compose up -d
npm install
npm start
```

To test the propper behaviour you can use this query:

```gql
query {
  recipe(recipeId: 1) {
    id
    title
    description
    ratings {
      user {
        nickname
      }
      date
      value
    }
    author {
      nickname
    }
  }
}
```
