/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static url = '/user'
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const userStr = localStorage.getItem('user')
    if(userStr){
      return JSON.parse(userStr);
    } else {
      return undefined
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: `${this.url}/current`,
      method: 'GET',
      callback: (err, response) => {
        let result;
        if (err) {
          User.unsetCurrent();
          result = { success: false, error: 'Необходима авторизация' };
        } else {
          User.setCurrent(response);
          result = { success: true, user: response };
        }
        callback(result);
      }
    });
  
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.url + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: `${this.url}/register`,
      method: 'POST',
      data: data,
      callback: (err, response) => {
        if(err){
          callback({"success": false,
          "error": {
              "email": [
                  "Поле E-Mail адрес должно быть действительным электронным адресом."
              ],
              "password": [
                  "Количество символов в поле Пароль должно быть не менее 3."
              ]
          }})
        } else{
          callback(null, { success: true, user: data });
        }
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: `${this.url}/logout`,
      method: 'POST',
      callback: () => {
        if(User.current()){
          User.unsetCurrent();
          return {success: true}
        }
      }
    })
  }
}
