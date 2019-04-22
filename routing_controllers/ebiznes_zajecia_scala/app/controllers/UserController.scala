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
      "emailMarketing" -> boolean,
      "phoneMarketing" -> boolean,
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
        userRepo.create(user.email, user.firstName, user.surname, user.password).map { _ =>
          Redirect(routes.ProductController.index).flashing("success" -> "user.created")
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
    userRepo.getByEmail(email).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def handlePost = Action.async { implicit request =>
    val email = request.body.asJson.get("email").as[String]
    val firstName = request.body.asJson.get("firstName").as[String]
    val surname = request.body.asJson.get("surname").as[String]
    val password = request.body.asJson.get("password").as[String]
    
    userRepo.create(email, firstName, surname, password).map { user =>
      Ok(Json.toJson(user))
    }
  }

}

case class CreateUserForm(email: String, firstName: String, surname: String, password: String, emailMarketing: Boolean, phoneMarketing: Boolean)