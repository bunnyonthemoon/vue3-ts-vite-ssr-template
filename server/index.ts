import path from 'path'
import express from 'express'
import { createSsrServer } from 'vite-ssr/dev/server'
import api from './api'

import { distPath, port, staticPath } from '../env'

setup()

async function setup() {
    const server = express()

    const pathPrefix =
        process.env.NODE_ENV == 'production' ? '../..' : '../dist'
    const { ssr } = await import(pathPrefix + '/client/server/package.json')
    const manifest = await import(
        pathPrefix + '/client/client/ssr-manifest.json'
    )
    const { default: renderPage } = await import(
        pathPrefix + '/client/server/main.js'
    )

    server.use(
        express.static(
            process.env.NODE_ENV === 'production' ? '../../public' : '../public'
        )
    )
    server.use('/', api)

    productionServer()
    // if (process.env.NODE_ENV == 'production') productionServer()
    // else developmentServer()

    server.listen(port)
    console.log(`Server started: http://localhost:${port}`)

    // eslint-disable-next-line no-unused-vars
    async function developmentServer() {
        const viteServer = await createSsrServer({
            server: { middlewareMode: 'ssr' },
        })

        server.use(viteServer.middlewares)
    }

    function productionServer() {
        for (const asset of ssr.assets || []) {
            console.log(
                path.join(__dirname, pathPrefix + `/client/client/` + asset)
            )
            server.use(
                '/' + asset,
                express.static(
                    path.join(__dirname, pathPrefix + `/client/client/` + asset)
                )
            )
        }

        server.get('*', async (request, response) => {
            const url =
                request.protocol +
                '://' +
                request.get('host') +
                request.originalUrl

            const { html, status, statusText, headers } = await renderPage(
                url,
                {
                    manifest,
                    preload: true,
                    request,
                    response,
                }
            )

            response.type('html')
            response.writeHead(status || 200, statusText || headers, headers)
            response.end(html)
        })
    }
}
