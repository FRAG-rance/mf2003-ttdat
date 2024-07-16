window.onload = function () {
    new employeePage();
  };
  
  class employeePage {
    pageTile = "Quản lý nhân viên ";
    constructor() {
        this.initEvents();
        this.loadData();
    }
  

    initEvents() {
      try {
        document.querySelector('#table-add-button').addEventListener('click', () => {
            try {
                let formContainter = document.querySelector('.form-container');
                formContainter.classList.remove('hidden');
            } catch (error) {
                console.error(error);
            }
            
        });
        document.querySelector('.close-btn').addEventListener('click', () => {
            try {
                let formContainter = document.querySelector('.form-container');
                formContainter.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });
        document.querySelector('.btn-cancel').addEventListener('click', () => {
            try {
                let formContainter = document.querySelector('.form-container');
                formContainter.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });
      } catch (error) {
        console.error(error);
      }
    }
    loadData() {}
  
  }