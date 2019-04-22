# --- !Ups

CREATE TABLE "orders" (
	"orderID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"userID"	INTEGER NOT NULL,
	"orderAddress"	TEXT NOT NULL,
	"orderCity"	TEXT NOT NULL,
	"orderCountry"	TEXT NOT NULL,
	FOREIGN KEY("userID") REFERENCES "users"("userID")
);

CREATE TABLE "orderStatus" (
	"orderStatusID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"orderID"	INTEGER NOT NULL,
	"orderDate"	NUMERIC NOT NULL,
	"deliveryDate"	NUMERIC NOT NULL,
	"delivered"	INTEGER NOT NULL,
	FOREIGN KEY("orderID") REFERENCES "orders"("orderID")
);

CREATE TABLE "orderDetails" (
	"orderDetailID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"orderID"	INTEGER NOT NULL,
	"orderDetailTotalNetPrice"	REAL NOT NULL,
	"orderDetailTotalGrossPrice"	REAL NOT NULL,
	"productID"	INTEGER NOT NULL,
	"productQuantity"	INTEGER NOT NULL,
	FOREIGN KEY("orderID") REFERENCES "orders"("orderID"),
	FOREIGN KEY("productID") REFERENCES "products"("productID")
);

CREATE TABLE "marketingConsent" (
	"marketingConsentID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"userID"	INTEGER NOT NULL UNIQUE,
	"emailMarketing"	INTEGER NOT NULL,
	"phoneMarketing"	INTEGER NOT NULL,
	FOREIGN KEY("userID") REFERENCES "users"("userID")
);

CREATE TABLE "products" (
	"productID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"priceNet"	REAL NOT NULL,
	"priceGross"	REAL NOT NULL,
	"taxAmountVat"	INTEGER NOT NULL,
	"categoryID"	INTEGER NOT NULL,
	FOREIGN KEY("categoryID") REFERENCES "categories"("categoryID")
);

CREATE TABLE "categories" (
	"categoryID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"categoryName"	TEXT NOT NULL,
	"categoryDescription"	TEXT NOT NULL
);

CREATE TABLE "users" (
	"userID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"email"	TEXT NOT NULL,
	"firstName"	TEXT NOT NULL,
	"surname"	TEXT NOT NULL,
	"password"	TEXT NOT NULL
);

# --- !Downs

DROP TABLE IF EXISTS "orders";
DROP TABLE IF EXISTS "orderStatus";
DROP TABLE IF EXISTS "orderDetails";
DROP TABLE IF EXISTS "marketingConsent";
DROP TABLE IF EXISTS "products";
DROP TABLE IF EXISTS "categories";
DROP TABLE IF EXISTS "users";