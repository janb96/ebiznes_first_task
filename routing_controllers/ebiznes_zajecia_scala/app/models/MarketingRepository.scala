package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class MarketingRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, userRepo: UserRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class MarketingTable(tag: Tag) extends Table[MarketingConsensts](tag, "marketingConsent") {

    def marketingConsentID = column[Int]("marketingConsentID", O.PrimaryKey, O.AutoInc)

    def userID = column[Int]("userID")

    def emailMarketing = column[Int]("emailMarketing")

    def phoneMarketing = column[Int]("phoneMarketing")

    def users_fk = foreignKey("uid_fk", userID, uid)(_.userID)

    def * = (marketingConsentID, userID, emailMarketing, phoneMarketing) <> ((MarketingConsensts.apply _).tupled, MarketingConsensts.unapply)
  }

  import userRepo.UserTable
  private val uid = TableQuery[UserTable]
  private val marketingConsent = TableQuery[MarketingTable]

  def create(userID: Int, emailMarketing: Int, phoneMarketing: Int): Future[MarketingConsensts] = db.run {
    (marketingConsent.map(c => (c.userID, c.emailMarketing, c.phoneMarketing))
      returning marketingConsent.map(_.marketingConsentID)
      into {case ((userID,emailMarketing,phoneMarketing), marketingConsentID) => MarketingConsensts(marketingConsentID, userID, emailMarketing, phoneMarketing)}
          ) += (userID, emailMarketing, phoneMarketing)
  }

  def list(): Future[Seq[MarketingConsensts]] = db.run {
    marketingConsent.result
  }

  def update(id: Int, emailMarketing: Int, phoneMarketing: Int): Future[Int] = {

    val q = marketingConsent.filter(_.userID === id)
      .map(x => (x.emailMarketing, x.phoneMarketing))
      .update((emailMarketing, phoneMarketing))

    db.run(q)

  }

}
