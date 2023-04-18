import { CacheModel } from "./cache"

import { ArtworkModel } from "./artwork"
import { ConfigModel } from "./config"
import { PassportModel } from "./passport"
import { UpgradeModel } from "./upgrade"
import { UserModel } from "./user"

export default {
    cache: new CacheModel(),

    artwork: new ArtworkModel(),
    config: new ConfigModel(),
    passport: new PassportModel(),
    upgrade: new UpgradeModel(),
    user: new UserModel(),
}
