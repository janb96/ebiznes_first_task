BEGIN TRANSACTION;
DROP TABLE IF EXISTS "orders";
CREATE TABLE IF NOT EXISTS "orders" (
	"orderID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"userID"	INTEGER NOT NULL,
	"orderAddress"	TEXT NOT NULL,
	"orderCity"	TEXT NOT NULL,
	"orderCountry"	TEXT NOT NULL,
	FOREIGN KEY("userID") REFERENCES "users"("userID")
);
DROP TABLE IF EXISTS "orderStatus";
CREATE TABLE IF NOT EXISTS "orderStatus" (
	"orderStatusID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"orderID"	INTEGER NOT NULL,
	"orderDate"	NUMERIC NOT NULL,
	"deliveryDate"	NUMERIC NOT NULL,
	"delivered"	INTEGER NOT NULL,
	FOREIGN KEY("orderID") REFERENCES "orders"("orderID")
);
DROP TABLE IF EXISTS "orderDetails";
CREATE TABLE IF NOT EXISTS "orderDetails" (
	"orderDetailID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"orderID"	INTEGER NOT NULL,
	"orderDetailTotalNetPrice"	REAL NOT NULL,
	"orderDetailTotalGrossPrice"	REAL NOT NULL,
	"productID"	INTEGER NOT NULL,
	"productQuantity"	INTEGER NOT NULL,
	FOREIGN KEY("orderID") REFERENCES "orders"("orderID"),
	FOREIGN KEY("productID") REFERENCES "products"("productID")
);
DROP TABLE IF EXISTS "marketingConsent";
CREATE TABLE IF NOT EXISTS "marketingConsent" (
	"marketingConsentID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"userID"	INTEGER NOT NULL UNIQUE,
	"emailMarketing"	INTEGER NOT NULL,
	"phoneMarketing"	INTEGER NOT NULL,
	"dateOfConsent"	NUMERIC NOT NULL,
	FOREIGN KEY("userID") REFERENCES "users"("userID")
);
DROP TABLE IF EXISTS "products";
CREATE TABLE IF NOT EXISTS "products" (
	"productID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"priceNet"	REAL NOT NULL,
	"priceGross"	REAL NOT NULL,
	"taxAmountVat"	INTEGER NOT NULL,
	"categoryID"	INTEGER NOT NULL,
	FOREIGN KEY("categoryID") REFERENCES "categories"("categoryID")
);
DROP TABLE IF EXISTS "categories";
CREATE TABLE IF NOT EXISTS "categories" (
	"categoryID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"categoryName"	TEXT NOT NULL,
	"categoryDescription"	TEXT NOT NULL
);
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"userID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"email"	TEXT NOT NULL,
	"firstName"	TEXT NOT NULL,
	"surname"	TEXT NOT NULL,
	"password"	TEXT NOT NULL
);
COMMIT;
