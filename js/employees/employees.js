window.onload = function () {
    new employeePage();
  };
  
  class employeePage {
    pageTile = "Quản lý nhân viên ";
    
    allEmployees = [];
    itemsPerPage = 10;
    currentPage = 1;

    constructor() {
        this.init();
    }

    async init() {
        this.setupPagination();
        this.initEvents();   

        await this.getEmployees();
        //this.loadData();
        this.updateTable();
    }

    async getEmployees() {
        try {
            const response = await fetch('http://localhost:5017/api/v1/Employees');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.allEmployees = await response.json();
            return this.allEmployees;
        } catch (error) {
            console.log(error);
        }
    }

    async getEmployee(employee) {
        try {
            const response = await fetch(`https://cukcuk.manhnv.net/api/v1/Employees/${employee.EmployeeId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteEmployee(employee) {
        try {
            const response = await fetch(`https://cukcuk.manhnv.net/api/v1/Employees/${employee.EmployeeId}`, {
                method: 'DELETE'
            });
            console.log(employee.EmployeeId)
            console.log("good ig")
        } catch (error) {
            console.log(error);
        }
    }

    async addEmployee(employee) {
        console.log(employee)
        try {
            const response = await fetch(`https://cukcuk.manhnv.net/api/v1/Employees/${employee.EmployeeId}`, {
                method: 'POST',
                body: JSON.stringify({employee})
            });
        } catch (error) {
            console.log(error);
        }
    }

    showDeleteConfirmation(employee) {
        let confirmationDialog = document.querySelector('.del-confirmation');
        confirmationDialog.classList.remove('hidden');

        document.querySelector('.del-confirmation .dialog-close-btn').addEventListener('click', () => {
            try {
                confirmationDialog.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.del-confirmation .no-dialog-btn').addEventListener('click', () => {
            try {
                confirmationDialog.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.del-confirmation .yes-dialog-btn').addEventListener('click', () => {
            try {
                this.deleteEmployee(employee);
                confirmationDialog.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });
        console.log('fuck')
    }

    showAddForm() {
        let formContainter = document.querySelector('.form-container');

        try {
            formContainter.classList.remove('hidden');
        } catch (error) {
            console.error(error);
        }

        document.querySelector('.form-close-btn').addEventListener('click', () => {
            try {
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
    }

    generateDialog() {
        let errorDialog = document.querySelector('.error');
                let errors = this.inputValidation();
                if(errors.length !== 0) {
                    let errorMessage = document.querySelector('.error-message');
                    errors.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        errorMessage.appendChild(li);
                    });                    
                    errorDialog.classList.remove('hidden');
                    return 1;
                } else {
                    return 0;
                }     
    }

    clearTable() {
        const table = document.querySelector('#tableEmp');
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
    }

    clearDialog() {
        let errorMessage = document.querySelector('.error-message');
        while (errorMessage.firstChild) {
            errorMessage.removeChild(errorMessage.firstChild);
        }
    }

    renderTable(pageData) {
        let table = document.querySelector('#tableEmp');
        let tableContent = document.querySelector('tbody');
        this.clearTable();
        let i = 1;

        pageData.forEach(item => {
            const row = table.insertRow();
            row.classList.add("rel");
            row.innerHTML = `<td>${i}</td>
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
                                    <a href="#" class='del-emp-btn'>
                                        <img src="./assets/icon/delete-48.png" alt="" class="icon">
                                    </a>
                                </div>
                            </td>`;
            i++;
            row.addEventListener('click', () => this.showDeleteConfirmation(item));
        })
      };
      
    updateTable() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.allEmployees.slice(startIndex, endIndex);
        this.renderTable(pageData);
    }
      
    setupPagination() {
        const totalPages = Math.ceil(this.allEmployees.length / this.itemsPerPage);
        let decreasePage = document.querySelector('#decrease-page');
        let increasePage = document.querySelector('#increase-page');

        decreasePage.addEventListener('click', () => { 
            this.currentPage = this.currentPage - 1;
            this.updateTable();
            console.log(this.currentPage);
        });

        increasePage.addEventListener('click', () => { 
            this.currentPage = this.currentPage + 1;
            this.updateTable();
            console.log(this.currentPage);
        });
    }

    searchKey(key) {
        const searchKey = key.toLowerCase().trim();
        const filteredEmployees = this.allEmployees.filter(employee => 
            employee.EmployeeCode.toLowerCase().includes(searchKey)
        );
        this.currentPage = 1
        this.renderTable(filteredEmployees)
    }

    initEvents() {
      try {       
        document.querySelector('#table-add-button').addEventListener('click', () => {
           this.showAddForm();            
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
        //khởi tạo nút cho dialog lỗi
        document.querySelector('.error .dialog-close-btn').addEventListener('click', () => {
            try {
                let errorDialog = document.querySelector('.error');
                errorDialog.classList.add('hidden');
                this.clearDialog();
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.error .pri-btn').addEventListener('click', () => {
            try {
                let errorDialog = document.querySelector('.error');
                errorDialog.classList.add('hidden');
                this.clearDialog();
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('.btn-save').addEventListener('click', () => {
            try {
                this.clearDialog();
                if(!this.generateDialog()) {
                    let tempEmployee = {
                        "employeeId": "string",
                        "employeeCode": "string",
                        "firstName": "string",
                        "lastName": "string",
                        "fullName": `${document.querySelector('#employee-name').value}`,
                        "gender": 0,
                        "dateOfBirth": "2024-08-07T22:38:45.588Z",
                        "phoneNumber": `${document.querySelector('#employee-phoneNo').value}`,
                        "email": `${document.querySelector('#email').value}`,
                        "address": "string",
                        "identityNumber": "string",
                        "identityDate": "2024-08-07T22:38:45.588Z",
                        "identityPlace": "string",
                        "joinDate": "2024-08-07T22:38:45.588Z",
                        "martialStatus": 0,
                        "educationalBackground": 0,
                        "qualificationId": "string",
                        "departmentId": "string",
                        "positionId": "string",
                        "nationalityId": "string",
                        "workStatus": 0,
                        "personalTaxCode": "string",
                        "salary": 0,
                        "positionCode": "string",
                        "positionName": "string",
                        "departmentCode": "string",
                        "departmentName": "string",
                        "qualificationName": "string",
                        "nationalityName": "string"
                    }
                    this.addEmployee(tempEmployee);
                }
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('#search-clear-button').addEventListener('click', () => {
            try {
                this.updateTable(this.allEmployees);
                const searchBar = document.querySelector("#searchbar");
                searchBar.value = '';
            } catch(error) {
                console.error(error);
            }
        })

        document.querySelector('#search-button').addEventListener('click', () => {
            try {
                let key = document.querySelector('#searchbar').value;
                this.searchKey(key);
            } catch(error) {
                console.error(error);
            }
        })

      } catch(error) {
        console.log(error);
      }
    }

    /*
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
                })}
                );

            })
        } catch(error) {
            console.log(error);
        }
    }*/

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