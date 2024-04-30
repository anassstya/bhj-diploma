/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    this.element = element;
    try{
      if(this.element){
   //     Modal.registerEvents();
      }
    } catch{
      throw new Error('mistake')
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const close = document.querySelectorAll('.close');
    const closeBtns = [];
    close.forEach(el => {
      if(el.getAttribute('data-dismiss') === 'modal'){
      closeBtns.push(el);
      }
    });
    closeBtns.forEach(elem => {
      elem.onclick = function(){
        Modal.onClose();
      }
    })
    
    console.log(closeBtns)
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    const close = document.querySelectorAll('.close');
    close.forEach(el => {
      el.addEventListener('click', () => {
        Modal.close();
      })
    })
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = 'none';
  }
}



