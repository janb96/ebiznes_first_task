package models

import play.api.libs.json._

case class OrderStatus(orderStatusID: Int, orderID: Int, orderDate: String, deliveryDate: String, delivered: Boolean)

object OrderStatus {
  implicit val categoryFormat = Json.format[OrderStatus]
}
