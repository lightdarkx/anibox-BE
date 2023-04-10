/*
  Warnings:

  - The primary key for the `shows_to_show_lists` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "show_lists_user_id_list_id_key";

-- DropIndex
DROP INDEX "shows_to_show_lists_user_id_list_id_key";

-- AlterTable
ALTER TABLE "shows_to_show_lists" DROP CONSTRAINT "shows_to_show_lists_pkey",
ADD CONSTRAINT "shows_to_show_lists_pkey" PRIMARY KEY ("user_id", "list_id", "show_id");
