package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc._
import java.util.Calendar
import java.text.SimpleDateFormat

import play.api.data.format.Formats.doubleFormat

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class OrderController @Inject()(userRepo: UserRepository, orderRepo: OrderRepository, orderStatusRepo: OrderStatusRepository, orderDetailRepo: OrderDetailRepository, productRepo: ProductRepository,
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
      "orderDetailTotalNetPrice" -> of(doubleFormat),
      "orderDetailTotalGrossPrice" -> of(doubleFormat),
      "productID" -> number,
      "productQuantity" -> number,
    )(CreateOrderForm.apply)(CreateOrderForm.unapply)
  }

  def addOrder = Action.async { implicit request =>

    var a:Seq[Users] = Seq[Users]()
    val categories = userRepo.list().onComplete{
      case Success(cat) => a= cat
      case Failure(_) => print("fail")
    }

    var b:Seq[Product] = Seq[Product]()
    val products = productRepo.list().onComplete{
      case Success(cat2) => b= cat2
      case Failure(_) => print("fail")
    }

    val format = new SimpleDateFormat("yyyy-MM-dd")

    val allUsers = userRepo.list()
    allUsers.map { a => {
      productRepo.list().map { b =>
        Ok(views.html.addorder(orderForm, a, b))
        }
      }
    }

    orderForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(views.html.addorder(errorForm, a, b))
        )
      },
      order => {
        orderRepo.create(order.userID, order.orderAddress, order.orderCity, order.orderCountry).map { order2 => {
          orderStatusRepo.create(order2.orderID, format.format(Calendar.getInstance().getTime()), order.deliveryDate, 0).map {
            order3 =>
              orderDetailRepo.create(order2.orderID, order.orderDetailTotalNetPrice, order.orderDetailTotalGrossPrice, order.productID, order.productQuantity)
            }
          }
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

  def getOrderDetailByOrderID(orderID: Int) = Action.async { implicit  request =>
    orderDetailRepo.getByOrderID(orderID).map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def getOrderStatusByOrderID(orderID: Int) = Action.async { implicit  request =>
    orderStatusRepo.getByOrderID(orderID).map { orders =>
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

  def deleteOrder(id: Int) = Action.async { implicit  request =>
    orderRepo.delete(id).map {
      order =>
      orderDetailRepo.delete(id).map {
        order2 =>
        orderStatusRepo.delete(id).map {
          order3 =>
          println(order + order2 + order3)
        }
      }
    }.map {
      _ => Ok(Json.toJson(1))
    }

  }

  def handlePost = Action.async { implicit request =>
    val userID = request.body.asJson.get("userID").as[Int]
    val orderAddress = request.body.asJson.get("orderAddress").as[String]
    val orderCity = request.body.asJson.get("orderCity").as[String]
    val orderCountry = request.body.asJson.get("orderCountry").as[String]
//    val deliveryDate = request.body.asJson.get("deliveryDate").as[String]
    val productID = request.body.asJson.get("productID").as[Int]
    val productQuantity = request.body.asJson.get("productQuantity").as[Int]
    val orderDetailTotalNetPrice = request.body.asJson.get("orderDetailTotalNetPrice").as[Double]
    val orderDetailTotalGrossPrice = request.body.asJson.get("orderDetailTotalGrossPrice").as[Double]
    val format = new SimpleDateFormat("yyyy-MM-dd")

    orderRepo.create(userID, orderAddress, orderCity, orderCountry).map { order2 => {
      orderStatusRepo.create(order2.orderID, format.format(Calendar.getInstance().getTime()), format.format(Calendar.getInstance().getTime()), 0).map {
        order3 =>
          orderDetailRepo.create(order2.orderID, orderDetailTotalNetPrice, orderDetailTotalGrossPrice, productID, productQuantity)
      }
    }
    }.map {
      _ => Ok(Json.toJson(1))
    }


  }

}

case class CreateOrderForm(userID: Int, orderAddress: String, orderCity: String, orderCountry: String, deliveryDate: String, orderDetailTotalNetPrice: Double, orderDetailTotalGrossPrice: Double, productID: Int, productQuantity: Int)