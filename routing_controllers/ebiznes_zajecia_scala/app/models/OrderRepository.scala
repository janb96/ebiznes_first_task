package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class OrderRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class OrderTable(tag: Tag) extends Table[Orders](tag, "orders") {

    def orderID = column[Int]("orderID", O.PrimaryKey, O.AutoInc)

    def userID = column[Int]("userID")

    def orderAddress = column[String]("orderAddress")

    def orderCity = column[String]("orderCity")

    def orderCountry = column[String]("orderCountry")

    def * = (orderID, userID, orderAddress, orderCity, orderCountry) <> ((Orders.apply _).tupled, Orders.unapply)
  }

  val orders = TableQuery[OrderTable]

  def create(userID: Int, orderAddress: String, orderCity: String, orderCountry: String): Future[Orders] = db.run {
    (orders.map(c => (c.userID, c.orderAddress, c.orderCity, c.orderCountry))
      returning orders.map(_.orderID)
      into {case ((userID,orderAddress,orderCity, orderCountry), orderID) => Orders(orderID, userID,orderAddress,orderCity, orderCountry)}
      ) += (userID,orderAddress,orderCity, orderCountry)
  }

  def list(): Future[Seq[Orders]] = db.run {
    orders.result
  }

}
