package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc._
import play.api.data.format.Formats._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class ProductController @Inject()(productsRepo: ProductRepository, categoryRepo: CategoryRepository,
                                  cc: MessagesControllerComponents
                                 )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val productForm: Form[CreateProductForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "description" -> nonEmptyText,
      "priceNet" -> of(doubleFormat),
      "priceGross" -> of(doubleFormat),
      "taxAmountVat" -> number,
      "category" -> number,
    )(CreateProductForm.apply)(CreateProductForm.unapply)
  }

  val categoryForm: Form[CreateCategoryForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "description" -> nonEmptyText,
    )(CreateCategoryForm.apply)(CreateCategoryForm.unapply)
  }

  def index = Action.async { implicit request =>
    val categories = categoryRepo.list()
    categories.map(cat => Ok(views.html.index(productForm,cat)))
  }

  def addProduct = Action.async { implicit request =>
    var a:Seq[Categories] = Seq[Categories]()
    val categories = categoryRepo.list().onComplete{
      case Success(cat) => a= cat
      case Failure(_) => print("fail")
    }

    val allCategories = categoryRepo.list()
    allCategories.map(cat => Ok(views.html.addproduct(productForm,cat)))

    productForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(views.html.addproduct(errorForm,a))
        )
      },
      product => {
        productsRepo.create(product.name, product.description, product.priceNet, product.priceGross, product.taxAmountVat , product.category).map { _ =>
          Redirect(routes.ProductController.index).flashing("success" -> "product.created")
        }
      }
    )
  }

  def addCategory = Action.async { implicit request =>

    categoryForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(views.html.createcategory(errorForm))
        )
      },
      category => {
        categoryRepo.create(category.name, category.description).map { _ =>
          Redirect(routes.ProductController.index).flashing("success" -> "category.created")
        }
      }
    )
  }

  def getProducts = Action.async { implicit request =>
    productsRepo.list().map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getCategories = Action.async { implicit request =>
    categoryRepo.list().map { categories =>
      Ok(Json.toJson(categories))
    }
  }

  def getByCategory(id: Integer) = Action.async { implicit  request =>
    productsRepo.getByCategory(id).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def handlePost = Action.async { implicit request =>
    val name = request.body.asJson.get("name").as[String]
    val priceNet = request.body.asJson.get("priceNet").as[Double]
    val priceGross = request.body.asJson.get("priceGross").as[Double]
    val taxAmountVat = request.body.asJson.get("taxAmountVat").as[Int]
    val desc = request.body.asJson.get("description").as[String]
    val category = request.body.asJson.get("categoryID").as[Int]

    productsRepo.create(name, desc, priceNet, priceGross, taxAmountVat,category).map { product =>
      Ok(Json.toJson(product))
    }
  }
}

case class CreateProductForm(name: String, description: String, priceNet: Double, priceGross: Double, taxAmountVat: Int, category: Int)
case class CreateCategoryForm(name: String, description: String)