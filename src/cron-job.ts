import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const trackingStatusSummaryReport = cron.schedule('* 0,8,16 * * *', async () => {
    console.log('trackingStatusSummaryReport');
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString().split('.')[0] + 'Z';

    try {
        const shippingDetails = await prisma.shippingDetail.findMany();
        console.log({
            created_dt: isoDateString,
            trackingSummary: shippingDetails.reduce<Record<string, number>>((acc, cur) => {
                if (acc[cur.trackingStatus]) {
                    acc[cur.trackingStatus] += 1;
                } else {
                    acc[cur.trackingStatus] = 1;
                }
                return acc;
            }, {}),
        });
      } catch (error) {
        console.error('Error fetching shippingDetails:', error);
      } finally {
        await prisma.$disconnect();
      }
})