/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static url = '/account';
  static get(id, callback){
    const url = `${this.url}/${id}`;
    createRequest({url: url, method: 'GET', callback})
  }
}
