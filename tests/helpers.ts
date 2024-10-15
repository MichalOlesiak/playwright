export class Helpers {
    // Generates a random full name with first and last name
    static generateRandomFullName(): string {
      const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie"];
      const lastNames = ["Smith", "Johnson", "Brown", "Williams", "Jones"];
      
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      return `${firstName} ${lastName}`;  // Full name with first and last name
    }
  
    static generateRandomLastFourDigits(): string {
      return Math.floor(1000 + Math.random() * 9000).toString();
    }
  
    static generateRandomMonth(): string {
      return Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
    }
  
    static generateRandomYear(): string {
      return (new Date().getFullYear() + Math.floor(Math.random() * 5)).toString();
    }
  }
  