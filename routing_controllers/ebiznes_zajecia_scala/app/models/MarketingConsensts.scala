package models

import play.api.libs.json._

case class MarketingConsensts(marketingConsentID: Int, userID: Int, emailMarketing: Int, phoneMarketing: Int)

object MarketingConsensts {
  implicit val categoryFormat = Json.format[Users]
}
