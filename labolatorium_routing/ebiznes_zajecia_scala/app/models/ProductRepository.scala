package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import models.CategoryRepository
import scala.concurrent.{ Future, ExecutionContext }

/**
  * A repository for people.
  *
  * @param dbConfigProvider The Play db config provider. Play will inject this for you.
  */
@Singleton
class ProductRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, categoryRepository: CategoryRepository)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  /**
    * Here we define the table. It will have a name of people
    */
  import categoryRepository.CategoryTable

  private class ProductTable(tag: Tag) extends Table[Product](tag, "products") {

    /** The ID column, which is the primary key, and auto incremented */
    def productID = column[Long]("productID", O.PrimaryKey, O.AutoInc)

    /** The name column */
    def name = column[String]("name")

    /** The age column */
    def description = column[String]("description")

    def priceNet = column[Double]("description")

    def priceGross = column[Double]("description")

    def taxAmountVat = column[Int]("description")

    def categories = column[Int]("categoryID")

    def category_fk = foreignKey("cat_fk",categories, cat)(_.categoryID)


    /**
      * This is the tables default "projection".
      *
      * It defines how the columns are converted to and from the Person object.
      *
      * In this case, we are simply passing the productID, name and page parameters to the Person case classes
      * apply and unapply methods.
      */
    def * = (productID, name, description, priceNet, priceGross, taxAmountVat, categories) <> ((Product.apply _).tupled, Product.unapply)
    //def * = (productID, name) <> ((Category.apply _).tupled, Category.unapply)
  }

  /**
    * The starting point for all queries on the people table.
    */

  import categoryRepository.CategoryTable

  private val product = TableQuery[ProductTable]

  private val cat = TableQuery[CategoryTable]


  /**
    * Create a person with the given name and age.
    *
    * This is an asynchronous operation, it will return a future of the created person, which can be used to obtain the
    * productID for that person.
    */
  def create(name: String, description: String, priceNet: Double, priceGross: Double, taxAmountVat: Int, category: Int): Future[Product] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the productID column
    
    (product.map(p => (p.name, p.description, p.priceNet, p.priceGross, p.taxAmountVat, p.categories))
      // Now define it to return the productID, because we want to know what productID was generated for the person
      returning product.map(_.productID)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned productID

//      into {case ((categoryName,categoryDescription),categoryID) => Categories(categoryID, categoryName, categoryDescription)}
//      // And finally, insert the person into the database
//      ) += (categoryName, categoryDescription)



      into {case ((name,description, priceNet, priceGross, taxAmountVat, category),id) => Product(id,name, description, priceNet, priceGross, taxAmountVat, category)}
      // And finally, insert the person into the database
      ) += (name, description, priceNet, priceGross, taxAmountVat, category)
  }

  /**
    * List all the people in the database.
    */
  def list(): Future[Seq[Product]] = db.run {
    product.result
  }

  def getByCategory(category_id: Int): Future[Seq[Product]] = db.run {
    product.filter(_.categories === category_id).result
  }

  def getByCategories(category_ids: List[Int]): Future[Seq[Product]] = db.run {
    product.filter(_.categories inSet category_ids).result
  }


}
