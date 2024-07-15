// Dates de début et de fin
const startDate = new Date("2023-05-20");
const endDate = new Date("2023-05-30");

// Fonction pour formater une date en chaîne de caractères
function formatDate(date) {
  return date.toISOString()
}

// Créer un tableau avec toutes les dates
const allDates = [];
const numDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
for (let i = 0; i < numDays; i++) {
  const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  allDates.push(formatDate(currentDate));
}

// Afficher le tableau des dates
console.log(allDates);