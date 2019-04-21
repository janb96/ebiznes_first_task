package controllers

import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, ControllerComponents}


@Singleton
class UsersController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val arr = new Array[String](5)

  arr(0) = "Jan Kowalski"
  arr(1) = "Janusz Zagłoba"
  arr(2) = "Mathew McDonald"
  arr(3) = "Ireneusz Mozart"
  arr(4) = "Daria Szpakowska"

  def welcome(name: String, surname: String) = Action {
    Ok("Welcome " + name + " " + surname)
  }

  def getUser(id: Int) =

    if(id < 5){
      Action {
        Ok("User with id=" + id + " is " + arr(id))
      }
    } else {
      Action {
        Ok("User not found. Try again with id from 0 to 4")
      }
    }

  def getAllUsers = {
    var x = 0
    var users = ""
    while(x < 5){
      users = users + arr(x) + "\n"
      x = x + 1
    }
    Action {
      Ok(users)
    }
  }


  def login = Action { request =>
    val json = request.body.asJson.get
    val stock = json.toString()

    val password = json.apply("password": String)
    val userName = json.apply("userName": String)

    Ok("Your userName is: " + userName.toString() + " and your password is: " + password.toString())
  }


}
