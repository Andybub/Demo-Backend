/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ShippingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `currentLocationId` on the `ShippingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedDelivery` on the `ShippingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `recipientId` on the `ShippingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ShippingDetail` table. All the data in the column will be lost.
  - You are about to drop the `Detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Detail` DROP FOREIGN KEY `Detail_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `Detail` DROP FOREIGN KEY `Detail_shippingId_fkey`;

-- DropForeignKey
ALTER TABLE `ShippingDetail` DROP FOREIGN KEY `ShippingDetail_currentLocationId_fkey`;

-- DropForeignKey
ALTER TABLE `ShippingDetail` DROP FOREIGN KEY `ShippingDetail_recipientId_fkey`;

-- AlterTable
ALTER TABLE `ShippingDetail` DROP COLUMN `createdAt`,
    DROP COLUMN `currentLocationId`,
    DROP COLUMN `estimatedDelivery`,
    DROP COLUMN `recipientId`,
    DROP COLUMN `updatedAt`;

-- DropTable
DROP TABLE `Detail`;

-- DropTable
DROP TABLE `Location`;

-- DropTable
DROP TABLE `Recipient`;
