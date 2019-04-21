package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

/**
  * A repository for people.
  *
  * @param dbConfigProvider The Play db config provider. Play will inject this for you.
  */
@Singleton
class CategoryRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  /**
    * Here we define the table. It will have a name of people
    */
  class CategoryTable(tag: Tag) extends Table[Categories](tag, "categories") {

    /** The ID column, which is the primary key, and auto incremented */
    def categoryID = column[Int]("categories", O.PrimaryKey, O.AutoInc)

    /** The name column */
    def categoryName = column[String]("categoryName")

    def categoryDescription = column[String]("categoryDescription")

    /**
      * This is the tables default "projection".
      *
      * It defines how the columns are converted to and from the Person object.
      *
      * In this case, we are simply passing the id, name and page parameters to the Person case classes
      * apply and unapply methods.
      */
    def * = (categoryID, categoryName, categoryDescription) <> ((Categories.apply _).tupled, Categories.unapply)
  }

  /**
    * The starting point for all queries on the people table.
    */
  val category = TableQuery[CategoryTable]



  /**
    * Create a person with the given name and age.
    *
    * This is an asynchronous operation, it will return a future of the created person, which can be used to obtain the
    * id for that person.
    */
  def create(categoryName: String, categoryDescription: String): Future[Categories] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (category.map(c => (c.categoryName, c.categoryDescription))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning category.map(_.categoryID)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into {case ((categoryName,categoryDescription),categoryID) => Categories(categoryID, categoryName, categoryDescription)}
      // And finally, insert the person into the database
      ) += (categoryName, categoryDescription)
  }

  /**
    * List all the people in the database.
    */
  def list(): Future[Seq[Categories]] = db.run {
    category.result
  }
}