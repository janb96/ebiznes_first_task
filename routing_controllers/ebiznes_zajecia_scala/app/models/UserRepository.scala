package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent._
import scala.concurrent.duration._

import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class UserRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class UserTable(tag: Tag) extends Table[Users](tag, "users") {

    def userID = column[Int]("userID", O.PrimaryKey, O.AutoInc)

    def email = column[String]("email")

    def firstName = column[String]("firstName")

    def surname = column[String]("surname")

    def password = column[String]("password")

    def * = (userID, email, firstName, surname, password) <> ((Users.apply _).tupled, Users.unapply)
  }

  val users = TableQuery[UserTable]

  def create(email: String, firstName: String, surname: String, password: String): Future[Users] = db.run {
    (users.map(c => (c.email, c.firstName, c.surname, c.password))
      returning users.map(_.userID)
      into {case ((email,firstName,surname, password), userID) => Users(userID, email, firstName, surname, password)}
      ) += (email, firstName, surname, password)
  }

  def getByEmail(email: String): Future[Seq[Users]] = db.run {
    users.filter(_.email === email).result
  }

  def getBySurname(surname: String): Future[Seq[Users]] = db.run {
    users.filter(_.surname === surname).result
  }

  def getByID(id: Int): Future[Seq[Users]] = db.run {
    users.filter(_.userID === id).result
  }

  def list(): Future[Seq[Users]] = db.run {
    users.result
  }

  def delete(id: Int): Future[Int] = {
    val q = users.filter(_.userID === id).delete
    db.run(q)
  }

}
