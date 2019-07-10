import { GraphQLSchema, graphql } from "graphql";
import { buildSchema, Resolver, Query, Arg, Int } from "type-graphql";
import { Recipe } from "../entities/recipe";
import { User } from "../entities/user";

describe("typeorm-basic-usage unit tests", () => {
  let schema: GraphQLSchema;
  let argsData: any;
  let actualValue: any;
  let expectedValue: any;

  beforeAll(async () => {

    @Resolver(of => Recipe)
    class RecipeResolver {


      @Query(returns => Recipe, { nullable: true })
      recipe(@Arg("recipeId", type => Int) recipeId: number) {
        argsData = recipeId;
        const returnValue = new Recipe();
        returnValue.title = "title";
        returnValue.description = "description";
        returnValue.author = new User();
        returnValue.author.nickname = "jhon";
        return returnValue;
      }
    }

    schema = await buildSchema({
      resolvers: [RecipeResolver],
      validate: true,
    });
  });

  it("recipe query", async () => {
    const query = `query {
            recipe( recipeId: 1 ) {
              title,
              author {
                nickname
              }
            }
          }
          `;
    expectedValue = {
      "data": {
        "recipe": {
          "title": "title",
          "author": {
            "nickname": "jhon"
          }
        }
      }
    };
    actualValue = await graphql(schema, query);
    console.log("ActualValue:", actualValue);
    expect(argsData).toEqual(1);
    expect(JSON.stringify(expectedValue)).toEqual(JSON.stringify(actualValue));
  });
});