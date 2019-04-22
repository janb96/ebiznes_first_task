package models

import play.api.libs.json._

case class Orders(orderID: Int, userID: Int, orderAddress: String, orderCity: String, orderCountry: String)

object Orders {
  implicit val categoryFormat = Json.format[Orders]
}
