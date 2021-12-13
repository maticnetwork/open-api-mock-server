import { DefaultController } from "./controllers/default_controller";
import { ParentRoute } from "fortjs";
import { FxPortalV1Controller } from "./controllers/fx_portal_v1_controller";
import { BurnController } from "./controllers/burn_controller";
import { WatchGodController } from "./controllers/watch_god_controller";

export const routes: ParentRoute[] = [
    {
        path: "/*",
        controller: DefaultController
    },
    {
        path: "/api/v1/fxportal",
        controller: FxPortalV1Controller
    },
    {
        path: "/api/v1/burn",
        controller: BurnController
    },
    {
        path: "/watchgod",
        controller: WatchGodController
    }
];
