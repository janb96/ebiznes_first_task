package models

import play.api.libs.json._

case class Product(productID: Long, name: String, description: String, priceNet: Double, priceGross: Double, taxAmountVat: Int, categoryID: Int)

object Product {
  implicit val productFormat = Json.format[Product]
}
