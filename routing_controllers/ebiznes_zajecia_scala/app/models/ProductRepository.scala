package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class ProductRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, categoryRepository: CategoryRepository)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import profile.api._

  private class ProductTable(tag: Tag) extends Table[Product](tag, "products") {

    def productID = column[Int]("productID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def description = column[String]("description")
    def priceNet = column[Double]("priceNet")
    def priceGross = column[Double]("priceGross")
    def taxAmountVat = column[Int]("taxAmountVat")
    def categories = column[Int]("categoryID")
    def category_fk = foreignKey("cat_fk",categories, cat)(_.categoryID)

    def * = (productID, name, description, priceNet, priceGross, taxAmountVat, categories) <> ((Product.apply _).tupled, Product.unapply)
  }


  import categoryRepository.CategoryTable
  private val product = TableQuery[ProductTable]
  private val cat = TableQuery[CategoryTable]

  def create(name: String, description: String, priceNet: Double, priceGross: Double, taxAmountVat: Int, category: Int): Future[Product] = db.run {
    (product.map(p => (p.name, p.description, p.priceNet, p.priceGross, p.taxAmountVat, p.categories))
      returning product.map(_.productID)
      into {case ((name, description, priceNet, priceGross, taxAmountVat, category),id) => Product(id, name, description, priceNet, priceGross, taxAmountVat, category)}
      ) += (name, description, priceNet, priceGross, taxAmountVat, category)
  }

  def list(): Future[Seq[Product]] = db.run {
    product.result
  }

  def getByCategory(category_id: Int): Future[Seq[Product]] = db.run {
    product.filter(_.categories === category_id).result
  }

  def getByID(productID: Int): Future[Seq[Product]] = db.run {
    product.filter(_.productID === productID).result
  }

  def getByProductName(name: String): Future[Seq[Product]] = db.run {
    product.filter(_.name === name).result
  }

//  def getByCategories(category_ids: List[Int]): Future[Seq[Product]] = db.run {
//    product.filter(_.categories inSet category_ids).result
//  }


}
