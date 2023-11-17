
const foodItems = [
    { name: "Whopper", image: "whopper.jpeg" },
    { name: "Chicken Fries", image: "chicken.jpeg" },
    { name: "Cheeseburger", image: "cheeseburger.jpeg" },
    { name: "French Fries", image: "french-fries.jpeg" },
    { name: "Onion Rings", image: "onion-rings.png" },
  ];
  
  function generateOrderId() {
    const userInput = prompt("Enter your initials:");
    const randomNum = Math.floor(Math.random() * 10000);
    return `${userInput.toUpperCase()}-${randomNum}`;
  }
  
  async function prepareOrder() {
    const cookingItems = Array.from(document.querySelectorAll('.menu input[type="checkbox"]:checked'));
  
    cookingItems.forEach(item => {
      const cookingAnimation = document.createElement('div');
      cookingAnimation.classList.add('cooking-animation');
      item.parentElement.appendChild(cookingAnimation);
      setTimeout(() => {
        cookingAnimation.remove();
      }, 3000); 
    });
  
    return new Promise((resolve) => {
      const randomTime = Math.floor(Math.random() * 5000) + 1000;
      setTimeout(() => {
        resolve();
      }, randomTime);
    });
  }
  
  function completeOrder(selectedItems, orderId) {
    const orderStatus = document.querySelector('.orderStatus');
    orderStatus.innerHTML = `<div>Order ID: ${orderId}</div>`;
  
    selectedItems.forEach(item => {
      const foodImage = document.createElement('img');
      foodImage.src = foodItems.find(food => food.name === item).image;
      foodImage.classList.add('foodImage');
      foodImage.style.opacity = '0';
      orderStatus.appendChild(foodImage);
  
      setTimeout(() => {
        foodImage.style.opacity = '1';
      }, 1000); 
    });
  
    setTimeout(() => {
        showFeedbackPopup(); 
      }, 2000); 
    } 
  
  

    function showFeedbackPopup() {
        const feedbackContainer = document.querySelector('.orderStatus'); 
      
        const starsContainer = document.createElement('div');
        starsContainer.classList.add('stars-container', 'centered'); 
      
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement('span');
          star.classList.add('star');
          star.setAttribute('data-rating', i);
          star.textContent = '★';
      
          star.addEventListener('mouseover', () => {
            highlightStars(i);
          });
      
          star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            alert(`Thank you for your feedback! You rated us ${rating} stars.`);
            feedbackContainer.innerHTML = ''; 
          });
      
          starsContainer.appendChild(star);
        }
      
        feedbackContainer.innerHTML = `<div>How would you rate your experience?</div>`;
        feedbackContainer.appendChild(starsContainer);
      
        setTimeout(() => {
          feedbackContainer.innerHTML = `<div>Thank you for your feedback!</div>`;
        }, 5000);
      }
  
  
  document.getElementById('orderButton').addEventListener('click', async () => {
    const selectedItems = Array.from(document.querySelectorAll('.menu input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);
  
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }
  
    const orderStatus = document.querySelector('.orderStatus');
    orderStatus.textContent = 'Processing your order...';
  
    try {
      await prepareOrder();
      orderStatus.textContent = '';
      const orderId = generateOrderId();
      completeOrder(selectedItems, orderId);
    } catch (error) {
      console.error(error);
      orderStatus.textContent = 'An error occurred. Please try again.';
    }
  });
  
  
  function createFoodCheckboxes() {
    const menuDiv = document.querySelector('.menu');
    foodItems.forEach((item, index) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `food${index}`;
      checkbox.value = item.name;
  
      const label = document.createElement('label');
      label.htmlFor = `food${index}`;
      label.textContent = item.name;
  
      menuDiv.appendChild(checkbox);
      menuDiv.appendChild(label);
    });
  }
  
  window.addEventListener('load', createFoodCheckboxes);



