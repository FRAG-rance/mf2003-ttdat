export default class Department {
    allDepartments = [];
    async getDepartments() {
        try {
            const response = await fetch('http://localhost:5017/api/v1/Department');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.allDepartments = await response.json();
            return this.allDepartments;
        } catch (error) {
            console.log(error);
        }
    }
}