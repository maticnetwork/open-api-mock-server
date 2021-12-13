import * as path from "path";
import { Fort, ResultMapper } from "fortjs";
import { routes } from "./routes";
import { CorsWall } from "./walls/cors_wall";

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];
    Fort.routes = routes;
    Fort.walls = [
        CorsWall
    ]
    await Fort.create();
    process.env.APP_URL = `http://localhost:${Fort.port}`;
};
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}

