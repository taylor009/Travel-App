import { Resolver, Query, Arg, Mutation } from "type-graphql";
// import { plainToClass } from "class-transformer";
import { Place } from "../entity/Place";
// import { PlaceInput } from "../graphql-types/PlaceInput";

@Resolver(() => Place)
export class PlaceResolver {
    @Query(() => Place, { nullable: true })
    async place(@Arg('id') id: number): Promise<Place | undefined> {
        return await Place.findOne(id)
    }

    @Query(() => [Place], {
        description: 'Get all places from around the world'
    })
    async places(): Promise<Place[]> {
        const places = await Place.find();
        return places;
    }
}
