package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc._
import scala.concurrent.{ExecutionContext, Future}

class OrderController @Inject()(userRepo: UserRepository, orderRepo: OrderRepository,
                               cc: MessagesControllerComponents
                              )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val orderForm: Form[CreateOrderForm] = Form {
    mapping(
      "userID" -> number,
      "orderAddress" -> nonEmptyText,
      "orderCity" -> nonEmptyText,
      "orderCountry" -> nonEmptyText,
    )(CreateOrderForm.apply)(CreateOrderForm.unapply)
  }

  def addOrder = Action.async { implicit request =>
    orderForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(views.html.addorder(errorForm))
        )
      },
      order => {
        orderRepo.create(order.userID, order.orderAddress, order.orderCity, order.orderCountry).map { _ =>
          Redirect(routes.ProductController.index).flashing("success" -> "order.created")
        }
      }
    )
  }

  def getOrders = Action.async { implicit request =>
    orderRepo.list().map { orders =>
      Ok(Json.toJson(orders))
    }
  }

}

case class CreateOrderForm(userID: Int, orderAddress: String, orderCity: String, orderCountry: String)