-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends" (
    "user_id_req" INTEGER NOT NULL,
    "user_id_accept" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("user_id_req","user_id_accept")
);

-- CreateTable
CREATE TABLE "shows" (
    "show_id" INTEGER NOT NULL,

    CONSTRAINT "shows_pkey" PRIMARY KEY ("show_id")
);

-- CreateTable
CREATE TABLE "shows_to_show_lists" (
    "show_id" INTEGER NOT NULL,
    "list_id" INTEGER NOT NULL,

    CONSTRAINT "shows_to_show_lists_pkey" PRIMARY KEY ("show_id","list_id")
);

-- CreateTable
CREATE TABLE "show_lists" (
    "user_id" INTEGER NOT NULL,
    "list_id" SERIAL NOT NULL,
    "show_ids" INTEGER NOT NULL,
    "list_name" VARCHAR(255) NOT NULL,
    "is_edited" BOOLEAN NOT NULL DEFAULT false,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "show_lists_pkey" PRIMARY KEY ("user_id","list_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "user_id" INTEGER NOT NULL,
    "show_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "review_text" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "is_edited" BOOLEAN NOT NULL DEFAULT false,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("user_id","show_id")
);

-- CreateTable
CREATE TABLE "liked_shows" (
    "user_id" INTEGER NOT NULL,
    "show_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "liked_shows_pkey" PRIMARY KEY ("user_id","show_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "show_lists_list_id_key" ON "show_lists"("list_id");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_accept_fkey" FOREIGN KEY ("user_id_accept") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_req_fkey" FOREIGN KEY ("user_id_req") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shows_to_show_lists" ADD CONSTRAINT "shows_to_show_lists_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("show_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shows_to_show_lists" ADD CONSTRAINT "shows_to_show_lists_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "show_lists"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "show_lists" ADD CONSTRAINT "show_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
