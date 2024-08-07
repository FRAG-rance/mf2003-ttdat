window.onload = function () {
    new employeePage();
  };
  
  class employeePage {
    pageTile = "Quản lý nhân viên ";
    constructor() {
        this.loadData();
        this.initEvents();
    }

    initEvents() {
      try {
        //khởi tạo nút cho form
        document.querySelector('#table-add-button').addEventListener('click', () => {
            try {
                let formContainter = document.querySelector('.form-container');
                formContainter.classList.remove('hidden');
            } catch (error) {
                console.error(error);
            }
            
        });

        document.querySelector('.form-close-btn').addEventListener('click', () => {
            try {
                let formContainter = document.querySelector('.form-container');
                formContainter.classList.add('hidden');
                document.querySelector('#employee-Id').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-name').style.borderColor = "#e6e6e6";
                document.querySelector('#email').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-sDate').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-birthdate').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-phoneNo').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-socials').style.borderColor = "#e6e6e6";

            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.btn-cancel').addEventListener('click', () => {
            try {
                let formContainter = document.querySelector('.form-container');
                formContainter.classList.add('hidden');
                document.querySelector('#employee-Id').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-name').style.borderColor = "#e6e6e6";
                document.querySelector('#email').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-sDate').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-birthdate').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-phoneNo').style.borderColor = "#e6e6e6";
                document.querySelector('#employee-socials').style.borderColor = "#e6e6e6";
            } catch (error) {
                console.error(error);
            }
        });
        //khởi tạo nút cho dialog xoá
        document.querySelector('.del-confirmation .dialog-close-btn').addEventListener('click', () => {
            try {
                let confirmationDialog = document.querySelector('.del-confirmation');
                confirmationDialog.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.del-confirmation .no-dialog-btn').addEventListener('click', () => {
            try {
                let confirmationDialog = document.querySelector('.del-confirmation');
                confirmationDialog.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }

        });
        //khởi tạo nút cho dialog lỗi
        document.querySelector('.error .dialog-close-btn').addEventListener('click', () => {
            try {
                let errorDialog = document.querySelector('.error');
                errorDialog.classList.add('hidden');
                let errorMessage = document.querySelector('.error-message');
                while (errorMessage.firstChild) {
                    errorMessage.removeChild(errorMessage.firstChild);
                }
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.error .pri-btn').addEventListener('click', () => {
            try {
                let errorDialog = document.querySelector('.error');
                errorDialog.classList.add('hidden');
                let errorMessage = document.querySelector('.error-message');
                while (errorMessage.firstChild) {
                    errorMessage.removeChild(errorMessage.firstChild);
                }
                confirmationDialog.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.btn-save').addEventListener('click', () => {
            try {
                let errorDialog = document.querySelector('.error');
                let errors = this.inputValidation();
                if(
                    errors.length !== 0
                  ) {
                    let errorMessage = document.querySelector('.error-message');
                    errors.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        errorMessage.appendChild(li);
                    });                    
                    errorDialog.classList.remove('hidden');
                }                
            } catch (error) {
                console.error(error);
            }
        });

      } catch(error) {
        console.log(error);
      }
    }

    loadData() {
        try {
            fetch('http://localhost:5017/api/v1/Employees').then(res => res.json()).then(data => {
                let table = document.querySelector('#tableEmp');
                let i = 1;
                for (const item of data) {
                    let tr = document.createElement('tr');
                    tr.className = 'test';
//                  <td>${item.Gender == 1 ? 'Nam' : 'Nữ'}</td>

                    tr.innerHTML = `<td>${i}</td>
                                    <td>${item.EmployeeId}</td>
                                    <td>${item.FullName}</td>
                                    <td>${item.PhoneNumber}</td>
                                    <td>${item.EmployeeSocials}</td>
                                    <td>${item.Email}</td>
                                    <td>${item.EmployeeSDate}
                                        <div class="table-action">
                                            <a href="#">
                                                <img src="./assets/icon/add.png" alt="" class="icon">
                                            </a>
                                            <a href="#">
                                                <img src="./assets/icon/document-online.png" alt="" class="icon">
                                            </a>
                                            <a href="#" class='del-emp-btn'>
                                                <img src="./assets/icon/delete-48.png" alt="" class="icon">
                                            </a>
                                        </div>
                                    </td>`;
                    table.querySelector('tbody').append(tr);
                    i++;
                }

                //hơi ngu nhưng mà tạm 
                document.querySelectorAll('.del-emp-btn').forEach(item => {
                    item.addEventListener('click', () => {
                    try {
                        let formContainter = document.querySelector('.del-confirmation');
                        formContainter.classList.remove('hidden');
                    } catch (error) {
                        console.error(error);
                    }
                })});

            })
        } catch(error) {
            console.log(error);
        }
    }

    inputValidation() { 
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const date = new Date().toJSON();

            let errorMessage = [];

            let EmployeeId = document.querySelector('#employee-Id').value;
            let EmployeeName = document.querySelector('#employee-name').value;
            let EmployeeEmail = document.querySelector('#email').value;
            let EmployeePhoneNo = document.querySelector('#employee-phoneNo').value;
            let EmployeeSocials = document.querySelector('#employee-socials').value;
            let EmployeeSDate = document.querySelector('#employee-sDate').value;
            let EmployeeBirthdate = document.querySelector('#employee-birthdate').value;
            
            //kiểm tra input trống
            if(
                EmployeeId === "" ||
                EmployeeId === null ||
                EmployeeId === undefined
              ) {
                errorMessage.push("Mã nhân viên không được phép để trống.");
                document.querySelector('#employee-Id').style.borderColor = "red";
            }

            if(
                EmployeeName === "" ||
                EmployeeName === null ||
                EmployeeName === undefined
              ) {
                errorMessage.push("Tên nhân viên không được phép để trống.");
                document.querySelector('#employee-name').style.borderColor = "red";
            }

            if(
                EmployeeEmail === "" ||
                EmployeeEmail === null ||
                EmployeeEmail === undefined
              ) {
                errorMessage.push("Email không được phép để trống.");
                document.querySelector('#email').style.borderColor = "red";
            }

            if(
                EmployeePhoneNo === "" ||
                EmployeePhoneNo === null ||
                EmployeePhoneNo === undefined
              ) {
                errorMessage.push("Số di động nhân viên không được phép để trống.");
                document.querySelector('#employee-phoneNo').style.borderColor = "red";
            }
            
            if(
                EmployeeSocials === "" ||
                EmployeeSocials === null ||
                EmployeeSocials === undefined
              ) {
                errorMessage.push("Mã số căn cước không được phép để trống.");
                document.querySelector('#employee-socials').style.borderColor = "red";
            }
            //kiểm tra email
            if(!emailRegex.test(EmployeeEmail)) {
                errorMessage.push("Email sai định dạng.");
                document.querySelector('#email').style.borderColor = "red";
            }
            //so sánh date
            if(EmployeeSDate > date) {
                errorMessage.push("Ngày cấp nhân viên không hợp lệ");
                document.querySelector('#employee-sDate').style.borderColor = "red";
            }
            
            if(EmployeeBirthdate > date) {
                errorMessage.push("Ngày sinh nhân viên không hợp lệ");
                document.querySelector('#employee-birthdate').style.borderColor = "red";
            }
            return errorMessage;
        } catch (error) {
            console.log(error);
        }
    }
  
  }