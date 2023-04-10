/*
  Warnings:

  - The primary key for the `shows_to_show_lists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id]` on the table `show_lists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,list_id]` on the table `show_lists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,list_id]` on the table `shows_to_show_lists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `shows_to_show_lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "show_lists" ALTER COLUMN "list_id" DROP DEFAULT;
DROP SEQUENCE "show_lists_list_id_seq";

-- AlterTable
ALTER TABLE "shows_to_show_lists" DROP CONSTRAINT "shows_to_show_lists_pkey",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "shows_to_show_lists_pkey" PRIMARY KEY ("user_id", "list_id");

-- CreateIndex
CREATE UNIQUE INDEX "show_lists_user_id_key" ON "show_lists"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "show_lists_user_id_list_id_key" ON "show_lists"("user_id", "list_id");

-- CreateIndex
CREATE UNIQUE INDEX "shows_to_show_lists_user_id_list_id_key" ON "shows_to_show_lists"("user_id", "list_id");

-- AddForeignKey
ALTER TABLE "shows_to_show_lists" ADD CONSTRAINT "shows_to_show_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "show_lists"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
