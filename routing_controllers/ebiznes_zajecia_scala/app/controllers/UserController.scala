package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc._
import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(userRepo: UserRepository, marketingRepo: MarketingRepository,
                                  cc: MessagesControllerComponents
                                 )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val userForm: Form[CreateUserForm] = Form {
    mapping(
      "email" -> nonEmptyText,
      "firstName" -> nonEmptyText,
      "surname" -> nonEmptyText,
      "password" -> nonEmptyText,
      "emailMarketing" -> number,
      "phoneMarketing" -> number,
    )(CreateUserForm.apply)(CreateUserForm.unapply)
  }


  def addUser = Action.async { implicit request =>

    userForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(views.html.createuser(errorForm))
        )
      },
      user => {
        userRepo.create(user.email, user.firstName, user.surname, user.password).map { user2 =>
          marketingRepo.create(user2.userID, user.emailMarketing, user.phoneMarketing)
        }.map {
          _ => Redirect(routes.ProductController.index).flashing("success" -> "user.created")
        }
      }
    )

  }

  def getUsers = Action.async { implicit request =>
    userRepo.list().map { users =>
      Ok(Json.toJson(users))
    }
  }

  def getByEmail(email: String) = Action.async { implicit  request =>
    userRepo.getByEmail(email).map { users =>
      Ok(Json.toJson(users))
    }
  }

  def getBySurname(surname: String) = Action.async { implicit  request =>
    userRepo.getBySurname(surname).map { users =>
      Ok(Json.toJson(users))
    }
  }

  def getByID(id: Int) = Action.async { implicit  request =>
    userRepo.getByID(id).map { users =>
      Ok(Json.toJson(users))
    }
  }

  def handlePost = Action.async { implicit request =>
    val email = request.body.asJson.get("email").as[String]
    val firstName = request.body.asJson.get("firstName").as[String]
    val surname = request.body.asJson.get("surname").as[String]
    val password = request.body.asJson.get("password").as[String]
    val emailMarketing = request.body.asJson.get("emailMarketing").as[Int]
    val phoneMarketing = request.body.asJson.get("phoneMarketing").as[Int]
    
    userRepo.create(email, firstName, surname, password).map { user =>
      marketingRepo.create(user.userID, emailMarketing, phoneMarketing)
    }.map {
      user => Ok("user.created")
    }
  }

}

case class CreateUserForm(email: String, firstName: String, surname: String, password: String, emailMarketing: Int, phoneMarketing: Int)