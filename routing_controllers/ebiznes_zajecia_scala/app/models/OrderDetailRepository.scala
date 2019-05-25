package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class OrderDetailRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, orderRepo: OrderRepository, productRep: ProductRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class OrderDetailTable(tag: Tag) extends Table[OrderDetails](tag, "orderDetails") {

    def orderDetailID = column[Int]("orderDetailID", O.PrimaryKey, O.AutoInc)

    def orderID = column[Int]("orderID")

    def orderDetailTotalNetPrice = column[Double]("orderDetailTotalNetPrice")

    def orderDetailTotalGrossPrice = column[Double]("orderDetailTotalGrossPrice")

    def productID = column[Int]("productID")

    def productQuantity = column[Int]("productQuantity")

    def orders_fk = foreignKey("uid_fk", orderID, uid)(_.orderID)

//    def product_fk = foreignKey("puid_fk", productID, puid)(_.productID)

    def * = (orderDetailID, orderID, orderDetailTotalNetPrice, orderDetailTotalGrossPrice, productID, productQuantity) <> ((OrderDetails.apply _).tupled, OrderDetails.unapply)
  }

  import orderRepo.OrderTable
//  import productRep.ProductTable
  private val uid = TableQuery[OrderTable]
//  private val puid = TableQuery[ProductTable]
  private val orderDetail = TableQuery[OrderDetailTable]

  def create(orderID: Int, orderDetailTotalNetPrice: Double, orderDetailTotalGrossPrice: Double, productID: Int, productQuantity: Int): Future[OrderDetails] = db.run {
    (orderDetail.map(c => (c.orderID, c.orderDetailTotalNetPrice, c.orderDetailTotalGrossPrice, c.productID, c.productQuantity))
      returning orderDetail.map(_.orderDetailID)
      into {case ((orderID, orderDetailTotalNetPrice, orderDetailTotalGrossPrice, productID, productQuantity), orderDetailID) => OrderDetails(orderDetailID, orderID, orderDetailTotalNetPrice, orderDetailTotalGrossPrice, productID, productQuantity)}
      ) += (orderID, orderDetailTotalNetPrice, orderDetailTotalGrossPrice, productID, productQuantity)
  }

  def list(): Future[Seq[OrderDetails]] = db.run {
    orderDetail.result
  }

  def getByOrderID(orderID: Int): Future[Seq[OrderDetails]] = db.run {
    orderDetail.filter(_.orderID === orderID).result
  }

}
