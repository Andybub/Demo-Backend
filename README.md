# demo-backend

基底：Koa
資料庫：MySQL(Docker)，在.env內設定連線資訊
路由：拆分routes.ts檔統一管理
與資料庫溝通：透過Prisma寫入及讀取
快取：相同的查詢資訊由Redis(Docker)直接返回結果，而不進入MySQL
排成：node-cron定時執行輸出資料在console

### Cron Job
install [node-cron](https://www.npmjs.com/package/node-cron)
install [@types/node-cron](https://www.npmjs.com/package/@types/node-cron)