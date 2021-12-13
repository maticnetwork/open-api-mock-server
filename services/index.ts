import { join, dirname } from 'path'
import { FxPortalService } from './fx_portal'
import { FxPortalData } from '../types'
import { WatchGodService } from './watch_god';

const StormDB = require("stormdb");



const createService = (dbName) => {
    const engine = new StormDB.localFileEngine(`./db/db.${dbName}`);
    const db = new StormDB(engine);
    return db;
}


export const service = {
    fxPortal: new FxPortalService(
        createService('fx_portal')
    ),
    watchGod: new WatchGodService(
        createService('watch_god')
    )
}
