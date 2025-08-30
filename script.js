// Дані за замовчуванням
let kostentraeger = [
  1203, 6600, 1, 2, 3, 333, 334, 335, 336, 337,
  338, 339, 340, 341, 342, 343, 344, 345, 346, 347,
  348, 349, 350, 351, 352, 353, 354, 355, 356, 357
];

let tarif = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90,
  100, 110, 120, 130, 140, 150, 160, 170, 180, 190,
  200, 210, 220, 230, 240, 250, 260, 270, 280, 290
];

let combinations = {
  "E1|F1": 0,  "E1|F2": 1,  "E1|3 - Tragestuhl": 2,
  "E2|F1": 3,  "E2|F2": 4,  "E2|3 - Tragestuhl": 5,
  "E3|F1": 6,  "E3|F2": 7,  "E3|3 - Tragestuhl": 8,
  "E4|F1": 9,  "E4|F2": 10, "E4|3 - Tragestuhl": 11,
  "E5|F1": 12, "E5|F2": 13, "E5|3 - Tragestuhl": 14,
  "E6|F1": 15, "E6|F2": 16, "E6|3 - Tragestuhl": 17,
  "E7|F1": 18, "E7|F2": 19, "E7|3 - Tragestuhl": 20,
  "E8|F1": 21, "E8|F2": 22, "E8|3 - Tragestuhl": 23,
  "E9|F1": 24, "E9|F2": 25, "E9|3 - Tragestuhl": 26,
  "E10|F1": 27,"E10|F2": 28,"E10|3 - Tragestuhl": 29
};

// Значення для списків
const valuesE = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"];
const valuesF = ["F1", "F2", "3 - Tragestuhl"];

// Заповнення списків
function populateSelect(id, values) {
  const select = document.getElementById(id);
  select.innerHTML = "";
  values.forEach(val => {
    const option = document.createElement("option");
    option.value = val;
    option.textContent = val;
    select.appendChild(option);
  });
}

// Пошук результату
function findResult() {
  const e = document.getElementById("selectE").value;
  const f = document.getElementById("selectF").value;
  const key = `${e}|${f}`;
  const index = combinations[key];

/* const result = index !== undefined
  ? `Kostenträgernummer: ${kostentraeger[index]}<br><br>Tarif: ${tarif[index]}`
  : "Комбінація не знайдена"; */

//document.getElementById("output").innerHTML = "Res:<br><br>" + result;

/*document.getElementById("output").innerHTML = `
  <strong style="font-size: 1.4em;">
    Kostenträgernummer: ${kostentraeger[index]}<br><br>
    Tarif: ${tarif[index]}
  </strong>
`; */

const result = index !== undefined
  ? `Kostenträgernummer: <span style="font-size:1.5em; font-weight:bold;">${kostentraeger[index]}</span><br><br>
     Tarif: <span style="font-size:1.5em; font-weight:bold;">${tarif[index]}</span>`
  : "Комбінація не знайдена";

document.getElementById("output").innerHTML = "Res:<br>" + result;

}

// Імпорт JSON-файлу
function importJSON() {
  const fileInput = document.getElementById("jsonInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("Оберіть файл JSON");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const jsonData = JSON.parse(event.target.result);

      if (
        Array.isArray(jsonData.kostentraeger) &&
        Array.isArray(jsonData.tarif) &&
        typeof jsonData.combinations === "object"
      ) {
        kostentraeger = jsonData.kostentraeger;
        tarif = jsonData.tarif;
        combinations = jsonData.combinations;

        alert("Дані успішно імпортовано!");
      } else {
        alert("Невірна структура JSON-файлу");
      }
    } catch (e) {
      alert("Помилка при читанні JSON: " + e.message);
    }
  };

  reader.readAsText(file);
}

// Ініціалізація
populateSelect("selectE", valuesE);
populateSelect("selectF", valuesF);

// Реєстрація service worker для PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}