const modal1 = new HystModal({
  linkAttributeName: "data-hystmodal",
  // настройки (не обязательно), см. API
  backscroll: true,
});

const firstZoneIMG = "./images/zones.jpg"
const secondZoneIMG = "./images/zone2.jpg"
const thirdZoneIMG = "./images/zone3.jpg"

var btns = document.querySelectorAll("button.send-btn");
btns.forEach(function (btn) {
  btn.addEventListener('click', throwRequest);
})

var details = document.querySelectorAll("details");
for (i = 0; i < details.length; i++) {
  details[i].addEventListener("toggle", accordion);
}


function accordion(event) {
  if (!event.target.open) return;
  changeImage(event)

  var details = event.target.parentNode.children;
  for (i = 0; i < details.length; i++) {
    if (details[i].tagName != "DETAILS" || !details[i].hasAttribute('open') || event.target == details[i]) {
      continue;
    }
    details[i].removeAttribute("open");
  }
}


function changeImage(event) {
  var item = event.target;
  var zone = item.querySelector('summary').textContent;
  zoneImage = document.getElementById("zones-image");
  console.log(zoneImage)

  switch (zone) {
    case '1. Наружная':
      zoneImage.src = firstZoneIMG
      break
    case '2. Тамбурная':
      zoneImage.src = secondZoneIMG
      break
    case '3. Внутренняя':
      zoneImage.src = thirdZoneIMG
      break
    default:
      zoneImage.src = firstZoneIMG
  }
}

function throwRequest(event) {
  event.preventDefault();

  var elements = event.target.closest('.modal-text-wrapper');
  var system = elements.querySelector('h1').textContent;
  var phone = elements.querySelector("#phone").value;
  var square = elements.querySelector("#meters").value;

  if (phone == '' || square == '') {
    alert("Все поля должны быть заполнены")
    return
  }

  var data = {
    "system": system,
    "phone": phone,
    "square": square,
  };


  const url = "http://95.163.241.28:5001/message/new";
  const params = {
    headers: {
      "content-type":"application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  fetch(url, params)
    .then(data => data.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
  
}
