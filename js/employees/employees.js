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
    loadData() {
        try {
            fetch('https://cukcuk.manhnv.net/api/v1/Employees').then(res => res.json()).then(data => {
                console.log(data);
                let table = document.querySelector('#tableEmp');
                let i = 1;
                for (const item of data) {
                    let tr = document.createElement('tr');
                    tr.className = 'test';
                    tr.innerHTML = `<td>${i}</td>
                                    <td>${item.EmployeeCode}</td>
                                    <td>${item.FullName}</td>
                                    <td>${item.Gender == 1 ? 'Nam' : 'Nữ'}</td>
                                    <td>${item.DateOfBirth}</td>
                                    <td>${item.Email}</td>
                                    <td>${item.Address}
                                        <div class="table-action">
                                            <a href="#">
                                                <img src="./assets/icon/add.png" alt="" class="icon">
                                            </a>
                                            <a href="#">
                                                <img src="./assets/icon/document-online.png" alt="" class="icon">
                                            </a>
                                            <a href="#">
                                                <img src="./assets/icon/delete-48.png" alt="" class="icon">
                                            </a>
                                        </div>
                                    </td>`;
                    table.querySelector('tbody').append(tr);
                    i++;
                }
            })
        } catch(error) {
            console.log(error);
        }
    }
  
  }