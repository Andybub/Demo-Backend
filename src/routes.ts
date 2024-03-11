import { PrismaClient } from '@prisma/client';
import Router from "koa-router";
// import { Redis } from 'ioredis';

const trackingStatus = ["Created", "Package Received", "In Transit", "Out for Delivery", "Delivery Attempted", "Delivered", "Returned to Sender", "Exception"];

export const router = new Router();

const prisma = new PrismaClient();

// const redis = new Redis({
//     port: 6379, // redis服务器默认端口号
//     host: '127.0.0.1' // redis服务器的IP地址
// })

router.get('/fake', async (ctx) => {
    const { num } = ctx.query;
    // ctx.body = `Received num parameter: ${num}`;

    const dataList = Array.from(Array(Number(num))).map(() => ({
        sno: String(Math.floor(Math.random() * 1000000000)).padStart(9, '0'),
        trackingStatus: trackingStatus[Math.floor(Math.random() * trackingStatus.length)],
    }));
    // console.log({num, dataList});

    async function main() {
        // ... you will write your Prisma Client queries here
        const results: unknown[] = [];  // 用來存儲成功創建的產品資料

        for (const data of dataList) {
            const result = await prisma.shippingDetail.create({ data });
            results.push(result);
        }

        return results
      }
      
    const result = await main()
      .then((result) => result)
      .catch((e) => {
          console.error(e)
          process.exit(1)
      })
      .finally(async () => {
          await prisma.$disconnect()
      });

    if (result) {
        ctx.body = result;
    } else {
        ctx.body = "Failed to create data";
        ctx.status = 404;
    }
  });

router.get("/query", async (ctx, next) => {
    const { sno } = ctx.query;

    // console.log(await redis.ttl(String(sno)));
    // let cacheResult = await redis.get(String(sno));
    let cacheResult = null;

    if (cacheResult) {
        console.log("Cache hit");

        ctx.body = JSON.parse(cacheResult);
        return;
    } else {
        console.log("Cache miss");

        async function main() {
          // ... you will write your Prisma Client queries here
          const result = await prisma.shippingDetail.findUnique({
            where: { sno: String(sno) },
          });
          return result;
        }
    
        const result = await main()
          .then((result) => result)
          .catch((e) => {
              console.error(e)
              process.exit(1)
          })
          .finally(async () => {
              await prisma.$disconnect()
          });
    
        if (result) {
            // await redis.set(String(sno), JSON.stringify(result), 'EX', 3600);
            ctx.body = result;
        } else {
            ctx.body = "No data found";
            ctx.status = 404;
        }
    }

});

router.get("/test", (ctx, next) => {
    ctx.body = "Text Content!";
});

router.get("/", (ctx, next) => {
    ctx.body = "Hello World!";
});