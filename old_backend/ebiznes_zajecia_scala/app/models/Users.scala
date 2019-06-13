package models

import play.api.libs.json._

case class Users(userID: Int, email: String, firstName: String, surname: String, password: String)

object Users {
  implicit val categoryFormat = Json.format[Users]
}
