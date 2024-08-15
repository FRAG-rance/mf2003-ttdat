import Employee from "./Component/employee.js";


window.onload = function () {
    new employeePage();
  };
  
  class employeePage {
    pageTile = "Quản lý nhân viên ";
    employeeService = new Employee();
    itemsPerPage = 10;
    currentPage = 1;
    tableData = [];
    lastSelectedCode;
    isEditMode = false;

    constructor() {
        this.init();
    }

    async init() {
        await this.employeeService.getEmployees();
        this.tableData = this.employeeService.allEmployees;
        this.setupPagination();
        this.initEvents(); 
        this.updateTable();
    }

    showDeleteConfirmation() {
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
                console.log(this.lastSelectedCode);
                //this.employeeService.deleteEmployee(this.lastSelectedCode);
                confirmationDialog.classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        });
    }

    toggleAddForm() {
        let formContainter = document.querySelector('.form-container');
        try {
            if(formContainter.classList.contains('hidden')) {
                formContainter.classList.remove('hidden');
            } else {
                formContainter.classList.add('hidden');
            }
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
    }

    toggleDialog() {
        let errorDialog = document.querySelector('.error');
        try {
            if(errorDialog.classList.contains('hidden')) {
                errorDialog.classList.remove('hidden');
                this.clearDialog();
            } else {
                errorDialog.classList.add('hidden');
                this.clearDialog();
            }
        } catch (error) {
            console.error(error);
        }
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

    clearInput() {
        document.querySelector('#employee-Id').value = '';
        document.querySelector('#employee-name').value = '';
        document.querySelector('#employee-bankBranch').value = ''
        document.querySelector('#employee-bankName').value = '';
        document.querySelector('#employee-bankAcc').value = '';
        document.querySelector('#employee-landlineNo').value = '';
        document.querySelector('#employee-sDate').value = '';
        document.querySelector('#employee-address').value = '';
        document.querySelector('#employee-sPlace').value = '';
        document.querySelector('#employee-birthdate').value = '';
        document.querySelector('#employee-phoneNo').value = '';
        document.querySelector('#employee-socials').value = '';
        document.querySelector('#email').value = '';
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
                                    <a href="#" class='edit-emp-btn'>
                                        <img src="./assets/icon/add.png" alt="" class="icon" >
                                    </a>
                                    <a href="#" class='view-emp-btn'>
                                        <img src="./assets/icon/document-online.png" alt="" class="icon">
                                    </a>
                                    <a href="#" class='del-emp-btn'>
                                        <img src="./assets/icon/delete-48.png" alt="" class="icon">
                                    </a>
                                </div>
                            </td>`;
            i++;
            row.querySelector('.edit-emp-btn').addEventListener('click', () => {
                this.isEditMode = true;
                this.selectRow(item);
                this.handleEdit()
            });
            row.querySelector('.view-emp-btn').addEventListener('click', () => {
                this.selectRow(item);
                this.handleView()
            });
            row.querySelector('.del-emp-btn').addEventListener('click', () => {
                this.selectRow(item);
                this.showDeleteConfirmation()
            });
        })
      };
      
    updateTable() {
        let data = this.tableData;
        const totalPages = Math.ceil(data.length / this.itemsPerPage);
        document.querySelector('.total-page').innerHTML = `Tổng số trang: ${totalPages}`;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);
        this.renderTable(pageData);
    }
      
    async setupPagination() {
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

    async searchKey(key) {
        this.currentPage = 1
        await this.employeeService.getEmployee(key);
        this.tableData = this.employeeService.searchResult;
        console.log(this.tableData);
        this.updateTable();
    }

    selectRow(item) {
        this.lastSelectedCode = item.EmployeeCode;
    }


    handleAdd() {
        this.showFormButton();
        if(!this.generateDialog()) {
            let gender = this.radioChecker();
            console.log(gender);
            let tempEmployee = {
                "EmployeeCode": `${document.querySelector('#employee-Id').value}`,
                "PositionCode": "PID00001",
                "DepartmentCode": "DID-00001",
                "FullName": `${document.querySelector('#employee-name').value}`,
                "SocialNumber": `${document.querySelector('#employee-socials').value}`,
                "Email": `${document.querySelector('#email').value}`,
                "MobileNumber": `${document.querySelector('#employee-phoneNo').value}`,
                "DateOfBirth": `${document.querySelector('#employee-birthdate').value}`,
                "Gender": `${gender}`,
                "SocialPlace": `${document.querySelector('#employee-sPlace').value}`,
                "SocialDate": `${document.querySelector('#employee-sDate').value}`,
                "Address": `${document.querySelector('#employee-address').value}`,
                "LandlineNumber": `${document.querySelector('#employee-landlineNo').value}`,
                "BankAccount": `${document.querySelector('#employee-bankAcc').value}`,
                "BankName": `${document.querySelector('#employee-bankName').value}`,
                "BranchName": `${document.querySelector('#employee-bankBranch').value}`,
            }
            this.employeeService.addEmployee(tempEmployee);
        }
    }

    async handleEdit() {
        this.showFormButton();
        let tmp = await this.employeeService.getEmployee(this.lastSelectedCode);
        
        document.querySelector('#employee-Id').value = tmp[0].EmployeeCode;
        document.querySelector('#employee-name').value = tmp[0].FullName;
        document.querySelector('#employee-bankBranch').value = tmp[0].BranchName;
        document.querySelector('#employee-bankName').value = tmp[0].BankName;
        document.querySelector('#employee-bankAcc').value = tmp[0].BankAccount;
        document.querySelector('#employee-landlineNo').value = tmp[0].LandlineNumber;
        document.querySelector('#employee-sDate').value = this.convertDate(tmp[0].SocialDate);
        document.querySelector('#employee-address').value = tmp[0].Address;
        document.querySelector('#employee-sPlace').value = tmp[0].SocialPlace;
        document.querySelector('#employee-birthdate').value = this.convertDate(tmp[0].DateOfBirth);
        document.querySelector('#employee-phoneNo').value = tmp[0].MobileNumber;
        document.querySelector('#employee-socials').value = tmp[0].SocialNumber;
        document.querySelector('#email').value = tmp[0].Email;

        if(!this.generateDialog()) {
            let gender = this.radioChecker();
            console.log(gender);
            let tempEmployee = {
                "EmployeeCode": `${document.querySelector('#employee-Id').value}`,
                "PositionCode": "PID00001",
                "DepartmentCode": "DID-00001",
                "FullName": `${document.querySelector('#employee-name').value}`,
                "SocialNumber": `${document.querySelector('#employee-socials').value}`,
                "Email": `${document.querySelector('#email').value}`,
                "MobileNumber": `${document.querySelector('#employee-phoneNo').value}`,
                "DateOfBirth": `${document.querySelector('#employee-birthdate').value}`,
                "Gender": `${gender}`,
                "SocialPlace": `${document.querySelector('#employee-sPlace').value}`,
                "SocialDate": `${document.querySelector('#employee-sDate').value}`,
                "Address": `${document.querySelector('#employee-address').value}`,
                "LandlineNumber": `${document.querySelector('#employee-landlineNo').value}`,
                "BankAccount": `${document.querySelector('#employee-bankAcc').value}`,
                "BankName": `${document.querySelector('#employee-bankName').value}`,
                "BranchName": `${document.querySelector('#employee-bankBranch').value}`,
            }
            this.employeeService.editEmployee(tempEmployee);
        }

        this.toggleAddForm();
    }

    async handleView() {
        let tmp = await this.employeeService.getEmployee(this.lastSelectedCode);
        console.log(tmp);
        this.hideFormButton();
        document.querySelector('#employee-Id').value = tmp[0].EmployeeCode;
        document.querySelector('#employee-name').value = tmp[0].FullName;
        document.querySelector('#employee-bankBranch').value = tmp[0].BranchName;
        document.querySelector('#employee-bankName').value = tmp[0].BankName;
        document.querySelector('#employee-bankAcc').value = tmp[0].BankAccount;
        document.querySelector('#employee-landlineNo').value = tmp[0].LandlineNumber;
        document.querySelector('#employee-sDate').value = this.convertDate(tmp[0].SocialDate) ;
        document.querySelector('#employee-address').value = tmp[0].Address;
        document.querySelector('#employee-sPlace').value = tmp[0].SocialPlace;
        document.querySelector('#employee-birthdate').value = this.convertDate(tmp[0].DateOfBirth) ?? "";
        document.querySelector('#employee-phoneNo').value = tmp[0].MobileNumber;
        document.querySelector('#employee-socials').value = tmp[0].SocialNumber;
        document.querySelector('#email').value = tmp[0].Email;

        this.toggleAddForm();
    }

    radioChecker() {
        let ele = document.getElementsByName('gender');
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked)
            {
                return i;
            }
        } 
        return 0;
    }

    hideFormButton() {
        let button = document.querySelector('.button-group');
        button.classList.add('hidden');
    }

    showFormButton() {
        let button = document.querySelector('.button-group');
        button.classList.remove('hidden');
    }

    initEvents() {
      try {       
        //khởi tạo nút add form
        document.querySelector('#table-add-button').addEventListener('click', () => {
            this.isEditMode = false;
            this.toggleAddForm();            
        });

        document.querySelector('.btn-cancel').addEventListener('click', () => {
            this.toggleAddForm();
            this.clearInput();
        });

        document.querySelector('.form-close-btn').addEventListener('click', () => {
            this.toggleAddForm();
            this.clearInput();
        });
        //khởi tạo nút cho dialog lỗi
        document.querySelector('.error .dialog-close-btn').addEventListener('click', () => {
            this.toggleDialog();
        });

        document.querySelector('.error .pri-btn').addEventListener('click', () => {
            this.toggleDialog();
        });
        //nút lưu
        document.querySelector('.btn-save').addEventListener('click', () => {
            try {
                this.clearDialog();
                this.showFormButton();
                if(!this.generateDialog()) {
                    return;
                } 
            } catch (error) {
                console.error(error);
            }
        });

        document.querySelector('#search-clear-button').addEventListener('click', () => {
            try {
                const searchBar = document.querySelector("#searchbar");
                searchBar.value = '';
                this.tableData = this.employeeService.allEmployees;
                this.updateTable();
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

        document.querySelector('#employee-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from reloading the page
            if(this.isEditMode) {
                console.log("edit")
                this.handleEdit();
            } else {
                console.log("add")
                this.handleAdd();
            }
            this.toggleAddForm();
        }.bind(this));

      } catch(error) {
        console.log(error);
      }
    }

    convertDate(dateTimeString) {
        let datePart = dateTimeString.split('T')[0];
        return datePart;
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