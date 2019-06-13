package models

import play.api.libs.json._

case class Categories(categoryID: Int, categoryName: String, categoryDescription: String)

object Categories {
  implicit val categoryFormat = Json.format[Categories]
}
