import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const port = 5173;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

      template = await vite.transformIndexHtml(url, template);

      const page = template.split(`<!--ssr-outlet-->`);

      const { render } = await vite.ssrLoadModule(`${__dirname}/src/entry-server.tsx`);

      const { pipe } = await render(url, {
        onShellReady() {
          res.write(page[0]);
          pipe(res);
        },

        onAllReady() {
          res.write(page[1]);
          res.end();
        },

        onError(e: unknown) {
          console.error(e);
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    }
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

createServer();
