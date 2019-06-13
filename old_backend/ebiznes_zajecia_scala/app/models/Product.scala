package models

import play.api.libs.json._

case class Product(productID: Int, name: String, description: String, priceNet: Double, priceGross: Double, taxAmountVat: Int, categoryID: Int, photo: String)

object Product {
  implicit val productFormat = Json.format[Product]
}
