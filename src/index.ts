import Koa from 'koa'
import cors from '@koa/cors'
import { router } from './routes'
import { trackingStatusSummaryReport } from './cron-job'

const app = new Koa()

const port = 3000;

trackingStatusSummaryReport.start();

app.use(cors());
app.use(router.routes())

app.listen(port, () => {
    console.log(`Server running on port ${port} 🚀🚀🚀`);
})