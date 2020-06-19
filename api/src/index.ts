import "reflect-metadata";
import {createConnection, getConnectionOptions} from "typeorm";
// import {User} from "./entity/User";
import { Place } from "./entity/Place";

async function bootstrap() {

    // Get config options from ormconfig.js
    const dbOptions = await getConnectionOptions(process.env.NODE_ENV || 'development');

    createConnection({...dbOptions, name: 'default'}).then(async connection => {

        console.log("Inserting a new user into the database...");
        const place = new Place();
        place.id = 1;
        place.title = 'New York City';
        place.description = 'The Big Apple';
        place.imageUrl = 'https://picsum.photos/700';
        place.creationDate = new Date();
        await connection.manager.save(place);
        const places = await connection.manager.find(Place);
        console.log("Loaded places: " + places);


        console.log("Here you can setup and run express/koa/any other framework.");

    }).catch(error => console.log(error));
}

bootstrap();

