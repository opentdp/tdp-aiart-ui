import { CacheModel } from "./cache"

import { ArtworkModel } from "./artwork"
import { ConfigModel } from "./config"
import { PassportModel } from "./passport"
import { UpgradeModel } from "./upgrade"
import { UserModel } from "./user"
import { ChatbotModel } from "./chatbot"

export default {
    cache: new CacheModel(),

    artwork: new ArtworkModel(),
    chatbot: new ChatbotModel(),
    config: new ConfigModel(),
    passport: new PassportModel(),
    upgrade: new UpgradeModel(),
    user: new UserModel(),
}
