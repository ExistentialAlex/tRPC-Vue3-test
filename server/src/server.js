import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import { appRouter } from './routers/index';
const PORT = process.env.PORT || 3000;
const server = async () => {
    // express implementation
    const app = express();
    app.use(cors());
    app.use((req, _res, next) => {
        // request logger
        console.log('⬅️ ', req.method, req.path, req.body ?? req.query);
        next();
    });
    app.use('/trpc', trpcExpress.createExpressMiddleware({
        router: appRouter,
    }));
    app.get('/', (_req, res) => res.send('hello'));
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at: http://localhost:${PORT}`);
    });
};
server();
