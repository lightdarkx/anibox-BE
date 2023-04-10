-- DropForeignKey
ALTER TABLE "shows_to_show_lists" DROP CONSTRAINT "shows_to_show_lists_list_id_fkey";

-- DropForeignKey
ALTER TABLE "shows_to_show_lists" DROP CONSTRAINT "shows_to_show_lists_user_id_fkey";

-- DropIndex
DROP INDEX "show_lists_list_id_key";

-- CreateTable
CREATE TABLE "test_show2show_list" (
    "user_id" INTEGER NOT NULL,
    "list_id" INTEGER NOT NULL,
    "show_id" INTEGER NOT NULL,

    CONSTRAINT "test_show2show_list_pkey" PRIMARY KEY ("user_id","list_id")
);

-- CreateTable
CREATE TABLE "test_show_list" (
    "user_id" INTEGER NOT NULL,
    "list_id" INTEGER NOT NULL,
    "list_name" VARCHAR(255),

    CONSTRAINT "test_show_list_pkey" PRIMARY KEY ("user_id","list_id")
);

-- CreateTable
CREATE TABLE "test_shows" (
    "show_id" INTEGER NOT NULL,

    CONSTRAINT "test_shows_pkey" PRIMARY KEY ("show_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_show_list_user_id_key" ON "test_show_list"("user_id");

-- AddForeignKey
ALTER TABLE "shows_to_show_lists" ADD CONSTRAINT "shows_to_show_lists_user_id_list_id_fkey" FOREIGN KEY ("user_id", "list_id") REFERENCES "show_lists"("user_id", "list_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_show2show_list" ADD CONSTRAINT "test_show2show_list_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "test_shows"("show_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_show2show_list" ADD CONSTRAINT "test_show2show_list_user_id_list_id_fkey" FOREIGN KEY ("user_id", "list_id") REFERENCES "test_show_list"("user_id", "list_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
