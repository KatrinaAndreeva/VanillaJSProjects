const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionariesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();


// fetch random user and add money
async function getRandomUser(){
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// double everyones money
function doubleMoney(){
  data = data.map(user => {
    return { ...user, money: user.money * 2};
  });
  updateDOM();
}

// sort users by richest
function sortByRichest(){
  data.sort((a, b) => 
    b.money - a.money
  );
  updateDOM();
}

// filter only millioners 
function showMillionaries(){
  data = data.filter(user => {
    return user.money >= 1000000;
  });
  updateDOM();
}


// calc all welth
function calculateWealth(){
  const welth = data.reduce((acc, user) => acc+= (user.money), 0);
 const welthEl = document.createElement('div');
 welthEl.innerHTML = `<h3>Total welth: <strong>${formatMoney(welth)}</strong></h3>`;
 main.appendChild(welthEl);
}


// add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}


// update DOM
function updateDOM(providedData = data){
  // clear main div 
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  }); 
}


// format number as money
function formatMoney(number) {
  return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 

}


// event listeners`
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionariesBtn.addEventListener('click', showMillionaries);
calculateWealthBtn.addEventListener('click', calculateWealth);