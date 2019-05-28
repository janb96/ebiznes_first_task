package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class OrderStatusRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, orderRepo: OrderRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class OrderStatusTable(tag: Tag) extends Table[OrderStatus](tag, "orderStatus") {

    def orderStatusID = column[Int]("orderStatusID", O.PrimaryKey, O.AutoInc)

    def orderID = column[Int]("orderID")

    def orderDate = column[String]("orderDate")

    def deliveryDate = column[String]("deliveryDate")

    def delivered = column[Int]("delivered")

    def orders_fk = foreignKey("uid_fk", orderID, uid)(_.orderID)

    def * = (orderStatusID, orderID, orderDate, deliveryDate, delivered) <> ((OrderStatus.apply _).tupled, OrderStatus.unapply)
  }

  import orderRepo.OrderTable
  private val uid = TableQuery[OrderTable]
  private val orderStatus = TableQuery[OrderStatusTable]

  def create(orderID: Int, orderDate: String, deliveryDate: String, delivered: Int): Future[OrderStatus] = db.run {
    (orderStatus.map(c => (c.orderID, c.orderDate, c.deliveryDate, c.delivered))
      returning orderStatus.map(_.orderStatusID)
      into {case ((orderID, orderDate, deliveryDate, delivered), orderStatusID) => OrderStatus(orderStatusID, orderID, orderDate, deliveryDate, delivered)}
      ) += (orderID, orderDate, deliveryDate, delivered)
  }

  def list(): Future[Seq[OrderStatus]] = db.run {
    orderStatus.result
  }

  def getByOrderID(orderID: Int): Future[Seq[OrderStatus]] = db.run {
    orderStatus.filter(_.orderID === orderID).result
  }

  def delete(id: Int): Future[Int] = {
    val q = orderStatus.filter(_.orderID === id).delete
    db.run(q)
  }

  def update(id: Int, deliveryDate: String, delivered: Int): Future[Int] = {

    val q = orderStatus.filter(_.orderID === id)
      .map(x => (x.deliveryDate, x.delivered))
      .update((deliveryDate, delivered))

    db.run(q)

  }

}
