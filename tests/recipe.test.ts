import { GraphQLSchema, graphql } from "graphql";
import { buildSchema, Resolver, Query, Arg, Int } from "type-graphql";
import { Recipe } from "../entities/recipe";

describe("typeorm-basic-usage unit tests",  () => {
    let schema: GraphQLSchema;
    let argsData: any;
    
    beforeAll(async () => {

        @Resolver(of => Recipe)
        class RecipeResolver {

        
          @Query(returns => Recipe, { nullable: true })
          recipe(@Arg("recipeId", type => Int) recipeId: number) {
            argsData = recipeId;
            return {};
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
        await graphql(schema, query);
    expect(argsData).toEqual(1);
    });
});