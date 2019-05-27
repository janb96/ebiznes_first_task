package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class CategoryRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class CategoryTable(tag: Tag) extends Table[Categories](tag, "categories") {

    def categoryID = column[Int]("categoryID", O.PrimaryKey, O.AutoInc)

    def categoryName = column[String]("categoryName")

    def categoryDescription = column[String]("categoryDescription")

    def * = (categoryID, categoryName, categoryDescription) <> ((Categories.apply _).tupled, Categories.unapply)
  }

  val category = TableQuery[CategoryTable]

  def create(categoryName: String, categoryDescription: String): Future[Categories] = db.run {
    (category.map(c => (c.categoryName, c.categoryDescription))
      returning category.map(_.categoryID)
      into {case ((categoryName,categoryDescription),categoryID) => Categories(categoryID, categoryName, categoryDescription)}
      ) += (categoryName, categoryDescription)
  }

  def list(): Future[Seq[Categories]] = db.run {
    category.result
  }

  def getCategoriesByID(categoryID: Int): Future[Seq[Categories]] = db.run {
    category.filter(_.categoryID === categoryID).result
  }

  def getCategoriesByName(name: String): Future[Seq[Categories]] = db.run {
    category.filter(_.categoryName === name).result
  }

  def delete(id: Int): Future[Int] = {
    val q = category.filter(_.categoryID === id).delete
    db.run(q)
  }

}
