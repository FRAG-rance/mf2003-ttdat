export default class Employee {
    allEmployees = [];
    searchResult = [];
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

    async getEmployee(string) {
        try {
            const response = await fetch(`http://localhost:5017/api/v1/Employees/${string}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.searchResult = await response.json();
            return this.searchResult;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteEmployee(string) {
        try {
            const response = await fetch(`http://localhost:5017/api/v1/Employees/${string}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
            console.log(error);
        }
    }

    async addEmployee(employee) {
        try {
            console.log("doestn esven get here")
            console.log(JSON.stringify(employee));
            const response = await fetch(`http://localhost:5017/api/v1/Employees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
            console.log(error);
        }
    }
    async editEmployee(employee) {
        try {
            console.log("esven get here")
            console.log(JSON.stringify(employee));
            const response = fetch(`http://localhost:5017/api/v1/Employees/${employee.EmployeeCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
            console.log(error);
        }
    }
}