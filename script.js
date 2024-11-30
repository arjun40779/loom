const cardsData = [
  {
    id: 1,
    units: 1,
    discount: "10% Off",
    description: "Standard Price",
    currentPrice: "$10.00 USD",
    crossedPrice: "$24.00 USD",
  },
  {
    id: 2,
    units: 2,
    discount: "15% Off",
    description: "Discounted Price",
    currentPrice: "$18.00 USD",
    crossedPrice: "$30.00 USD",
  },
  {
    id: 3,
    units: 3,
    discount: "20% Off",
    description: "Best Value",
    currentPrice: "$25.00 USD",
    crossedPrice: "$40.00 USD",
  },
];

const cardWrapper = document.getElementById("card-wrapper");
const totalPriceElement = document.getElementById("total-price");

let activeId = 1;

const renderForm = (card) => {
  return ` <div
            id="form-container-${card.id}"
            class="form-container"
            style="display: none"
          >
          <div class="input-group " > <span style="width:14px; height:11px">  </span> <span style="width:64px; text-align:start"> Size</span> <span>Color</span></div>
            ${Array.from({ length: card.units })
              .map(
                (_, index) => `
            <div class="input-group">
            <span> #${index + 1}</span>
              <select
                class="size"
                id="size-${card.id}-${index}"
                name="size-${card.id}-${index}"
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
              <select
                class="color"
                id="color-${card.id}-${index}"
                name="color-${card.id}-${index}"
              >
                <option value="Black">Black</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
              </select>
            </div>
            `
              )
              .join("")}
          </div>`;
};

cardsData.forEach((card) => {
  const cardElement = document.createElement("div");

  cardElement.innerHTML = `
    <button id="card-${card.id}" class="card">
    <div class="card-top">
      <div class="card-left-wrapper">
        <div >
          <span class="circle"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 16" fill="none">
            <circle cx="7.22995" cy="8.07761" r="4.51902" fill="#FF6B82" />
            <circle cx="7.23042" cy="8.07808" r="6.77852" stroke="#FF6B82" stroke-width="0.903803" />
          </svg>
        </div>
        <div>
          <div class="text-start">
            <span class="heading-2">${
              card.units === 1 ? card.units + " Unit" : card.units + " Units"
            }</span>
            <span class="discount-label">${card.discount}</span>
          </div>
          <p class="text">${card.description}</p>
    
        </div>
      </div>
      <div class="card-right-wrapper">
        <span class="current-price">${card.currentPrice}</span>
        <span class="price-crossed">${card.crossedPrice}</span>
      </div>
      </div>
      ${renderForm(card)}
    </button>
  `;

  cardWrapper.appendChild(cardElement);
});

totalPriceElement.innerHTML = cardsData[0].currentPrice;

const cards = document.getElementsByClassName("card");

const removeActiveClass = () => {
  Array.from(cards).forEach((card) => {
    card.classList.remove("active");
  });
};

cards[0].classList.add("active");
document.getElementsByClassName("form-container")[0].style.display = "flex";
Array.from(cards).forEach((card) => {
  card.addEventListener("click", () => {
    removeActiveClass();
    card.classList.add("active");

    const cardId = parseInt(card.id.split("-")[1]);
    const cardData = cardsData.find((item) => item.id === cardId);
    totalPriceElement.innerHTML = cardData.currentPrice;

    hideForms();
    const formContainer = document.getElementById(`form-container-${cardId}`);
    formContainer.style.display = "flex";
    activeId = cardId;
  });
});

const hideForms = () => {
  const formContainers = document.getElementsByClassName("form-container");
  Array.from(formContainers).forEach((form) => {
    form.style.display = "none";
  });
};

const addToCartButton = document.querySelector("#add-to-cart");
addToCartButton.addEventListener("click", () => {
  const selectedOptions = [];
  const formContainer = document.getElementById(`form-container-${activeId}`);

  for (let i = 0; i < cardsData[activeId - 1].units; i++) {
    const size = formContainer.querySelector(`#size-${activeId}-${i}`).value;
    const color = formContainer.querySelector(`#color-${activeId}-${i}`).value;
    selectedOptions.push({ size, color });
  }

  const data = JSON.stringify(selectedOptions);
  alert(data);
});

