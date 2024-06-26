const apiURL = "http://localhost:3000/create-user";

const btn = document.getElementById('btn');
btn.addEventListener('click',submit);

function submit(e) {
  validateForm();

  if (!document.forms["my-form"].checkValidity()) return;

  e.preventDefault();

  const username = document.forms["my-form"]["name"].value;
  const email = document.forms["my-form"]["email"].value;

  const body = JSON.stringify({ username, email });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  fetch(apiURL, options)
    .then((res) => {

        // check if status is between 200 and 299

      const removeSuccessMsg = () =>
        document.querySelector(".success") &&
        document
          .querySelector(".container")
          .removeChild(document.querySelector(".success"));

      removeSuccessMsg();

      const _successDiv = document.createElement("div");
      const successMessagePara = document.createElement("p");

      successMessagePara.textContent = "Thank you for submitting your details.";

      _successDiv.classList.add("success");
      _successDiv.style.display = "block";
      _successDiv.appendChild(successMessagePara);

      document.querySelector(".container").appendChild(_successDiv);

      setTimeout(removeSuccessMsg, 5000);

      resetForm();
    })
    .catch((e) => {

       const removeErrorMsg = () =>
         document.querySelector(".error") &&
         document
           .querySelector(".container")
           .removeChild(document.querySelector(".error"));

       removeErrorMsg();

       const _errorDiv = document.createElement("div");
       const errorMessagePara = document.createElement("p");

       errorMessagePara.textContent = e?.message || "Something bad happen"; 

       _errorDiv.classList.add("error");
       _errorDiv.style.display = "block";
       _errorDiv.appendChild(errorMessagePara);

       document.querySelector(".container").appendChild(_errorDiv);

       setTimeout(removeErrorMsg, 5000);
    });
}

function validateForm() {
  const nameInput = document.forms["my-form"]["name"];
  const emailInput = document.forms["my-form"]["email"];

  if (nameInput.validity.valueMissing)
    nameInput.setCustomValidity("This is a required field");
  else if (nameInput.validity.tooShort)
    nameInput.setCustomValidity("Name must atleast have 3 char(s)");
  else if (nameInput.validity.tooLong)
    nameInput.setCustomValidity("Name must atmost have 40 char(s)");
  else nameInput.setCustomValidity("");

  if (emailInput.validity.valueMissing)
    emailInput.setCustomValidity("This is a required field");
  else if (emailInput.validity.typeMismatch)
    emailInput.setCustomValidity("Please provide a valid email");
  else emailInput.setCustomValidity("");

  nameInput.reportValidity();
  emailInput.reportValidity();

}

const resetForm = () => {
  document.forms["my-form"]["name"].value = "";
  document.forms["my-form"]["email"].value = "";
};