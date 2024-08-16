export default class Position {
    allPositions = [];
    async getPositions() {
        try {
            const response = await fetch('http://localhost:5017/api/v1/Position');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.allPositions = await response.json();
            return this.allPositions;
        } catch (error) {
            console.log(error);
        }
    }
}