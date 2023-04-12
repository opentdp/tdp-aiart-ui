// https://cn.vitejs.dev/config/

import { UserConfig } from "vite"

export const config: UserConfig = {
    server: {
        port: 7780,
        open: false,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:7700",
            },
            "/wsi": {
                target: "http://127.0.0.1:7700",
                ws: true
            },
            "/upload": {
                target: "http://127.0.0.1:7700",
            },
        },
    },
}
