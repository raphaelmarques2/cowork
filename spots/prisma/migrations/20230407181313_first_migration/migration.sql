-- CreateTable
CREATE TABLE "spots" (
    "id" SERIAL NOT NULL,
    "oid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "spots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "spots_oid_key" ON "spots"("oid");

-- CreateIndex
CREATE UNIQUE INDEX "spots_name_key" ON "spots"("name");
