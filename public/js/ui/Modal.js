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
      //  Modal.registerEvents();
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
    
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    const closeBtn = document.getElementsByName('bobik');
    closeBtn.addEventListener('click', ()=>{
      Modal.close();
    })
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    const modals = [...document.querySelectorAll('.modal ')];
    modals.forEach((el) =>{
      el.addEventListener('click', () => {
        if(el === this.element){
          this.element.style.display = 'block';
        }
      })
    })
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    const modals = [...document.querySelectorAll('.modal')];
    modals.forEach((el) =>{
      el.addEventListener('click', () => {
        if(el === this.element){
          this.element.style.display = 'none';
        }
      })
    })
  }
}
