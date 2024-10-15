export class Helpers {

    // Generowanie losowego imienia i nazwiska
    generateFullName(): string {
      const names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Eve'];
      const lastNames = ['Smith', 'Doe', 'Johnson', 'Brown', 'Davis'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      return `${randomName} ${randomLastName}`;
    }
  
    // Generowanie losowych 4 cyfr
    generateFourDigits(): string {
      return Math.floor(1000 + Math.random() * 9000).toString();
    }
  
    // Generowanie miesiąca w zakresie 1-12
    generateMonth(): string {
      const month = Math.floor(Math.random() * 12) + 1;
      return month < 10 ? `0${month}` : month.toString();
    }
  
    // Generowanie roku w zakresie 00-99
    generateYear(): string {
      const year = Math.floor(Math.random() * 100);
      return year < 10 ? `0${year}` : year.toString();
    }
  }
  