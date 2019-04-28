package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc._
import java.util.Calendar
import java.text.SimpleDateFormat

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class OrderController @Inject()(userRepo: UserRepository, orderRepo: OrderRepository, orderStatusRepo: OrderStatusRepository,
                               cc: MessagesControllerComponents
                              )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val orderForm: Form[CreateOrderForm] = Form {
    mapping(
      "userID" -> number,
      "orderAddress" -> nonEmptyText,
      "orderCity" -> nonEmptyText,
      "orderCountry" -> nonEmptyText,
      "deliveryDate" -> nonEmptyText,
    )(CreateOrderForm.apply)(CreateOrderForm.unapply)
  }

  def addOrder = Action.async { implicit request =>

    var a:Seq[Users] = Seq[Users]()
    val categories = userRepo.list().onComplete{
      case Success(cat) => a= cat
      case Failure(_) => print("fail")
    }

    val format = new SimpleDateFormat("yyyy-MM-dd")

    val allUsers = userRepo.list()
    allUsers.map(a => Ok(views.html.addorder(orderForm, a)))

    orderForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(views.html.addorder(errorForm, a))
        )
      },
      order => {
        orderRepo.create(order.userID, order.orderAddress, order.orderCity, order.orderCountry).map { order2 =>
          orderStatusRepo.create(order2.orderID, format.format(Calendar.getInstance().getTime()), order.deliveryDate, 1)
        }.map {
          _ => Redirect(routes.ProductController.index).flashing("success" -> "order.created")
        }
      }
    )
  }

  def getOrders = Action.async { implicit request =>
    orderRepo.list().map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def getByUserID(userID: Int) = Action.async { implicit  request =>
    orderRepo.getByUserID(userID).map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def getByOrderID(orderID: Int) = Action.async { implicit  request =>
    orderRepo.getByOrderID(orderID).map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def getByCountry(country: String) = Action.async { implicit  request =>
    orderRepo.getByCountry(country).map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def getByCity(city: String) = Action.async { implicit  request =>
    orderRepo.getByCity(city).map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def getByAddress(address: String) = Action.async { implicit  request =>
    orderRepo.getByAddress(address).map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def handlePost = Action.async { implicit request =>
    val userID = request.body.asJson.get("userID").as[Int]
    val orderAddress = request.body.asJson.get("orderAddress").as[String]
    val orderCity = request.body.asJson.get("orderCity").as[String]
    val orderCountry = request.body.asJson.get("orderCountry").as[String]
    val orderDate = request.body.asJson.get("orderDate").as[String]
    val deliveryDate = request.body.asJson.get("deliveryDate").as[String]

    orderRepo.create(userID, orderAddress, orderCity, orderCountry).map { order =>
      orderStatusRepo.create(order.orderID, orderDate, deliveryDate, 1)
    }.map {
      order2 => Ok("order.created")
    }
  }

}

case class CreateOrderForm(userID: Int, orderAddress: String, orderCity: String, orderCountry: String, deliveryDate: String)