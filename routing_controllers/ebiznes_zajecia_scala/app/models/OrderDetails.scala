package models

import play.api.libs.json._

case class OrderDetails(orderDetailID: Int, orderID: Int, orderDetailTotalNetPrice: Double, orderDetailTotalGrossPrice: Double, productID: Int, productQuantity: Int)

object OrderDetails {
  implicit val categoryFormat = Json.format[OrderDetails]
}
