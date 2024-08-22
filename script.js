

//const con = require("./connection.js")




function goAsSeller() {
    window.location.href = "seller.html";
  }
  
  function login() {
      window.location.href = "login.html";
    }
  function goBack() {
    window.location.href = "portal.html"; // Update with the URL of your first page
  }
  
  function goAsBuyer() {
    window.location.href = "buyer.html";
  }
  
  // Define count in the global scope
  
  
  
  var count =0;
  
  
  
  
  
  /*function submitAndRedirect() {
    // Perform any additional actions or validations here
   // console.log(count)
  
    // Get form data
   
    
         // Push each user object into the array
         var username = document.getElementById('username1').value;
         var name = document.getElementById('name1').value;
         var contactNumber = document.getElementById('contactNumber1').value;
         var email = document.getElementById('email1').value;
         var password = document.getElementById('password1').value;
         var confirmPassword = document.getElementById('confirmPassword1').value;
       
         
         if (username.trim() === '' || name.trim() === '' || contactNumber.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
             alert('Please fill in all fields');
         } 
         else {
       
      if(password===confirmPassword){
       
             // If all fields are filled, submit the form
       
        var formData = new FormData(document.getElementById('signupForm'));
       
         // Create a hidden input field to hold the redirect URL
         var redirectInput = document.createElement('input');
         redirectInput.type = 'hidden';
         redirectInput.name = 'redirect';
         redirectInput.value = 'portal.html';
         formData.append('redirect', 'portal.html');
         
       
         // Submit the form with the form data
         var form = document.createElement('form');
         //form.action = '/signup-form';
         //form.method = 'POST';
        // form.style.display = 'none';
         form.appendChild(redirectInput);
       
         // Append form data as hidden input fields
         formData.forEach(function(value, key) {
             var input = document.createElement('input');
             input.type = 'hidden';
             input.name = key;
             input.value = value;
             form.appendChild(input);
         });
       
         // Append the form to the document body
         document.body.appendChild(form);
       
         // Submit the form
         form.submit();
       
         // Redirect to portal.html after a short delay
         setTimeout(function() {
             window.location.href = 'portal.html';
         }, 1000);
       }
       else{
         if (!document.getElementById('errorMessage')) {
           // Create a new paragraph element for the error message
           var paragraph = document.createElement("p");
           paragraph.id = 'errorMessage';
           paragraph.style.marginLeft = "479px";
           
           // Create text content for the paragraph
           var text = document.createTextNode("Confirm password is not the same as password.");
       
           // Append the text node to the paragraph element
           paragraph.appendChild(text);
       
           // Append the paragraph element to the body of the HTML document
           document.body.appendChild(paragraph);
       }
       }
       
       }
      }*/
  
      function submitAndRedirect() {
  
        
          // Get form data
          var formData = new FormData(document.getElementById('signupForm'));
      
          var username = document.getElementById('username1').value;
          var name = document.getElementById('name1').value;
          var contactNumber = document.getElementById('contactNumber1').value;
          var email = document.getElementById('email1').value;
          var password = document.getElementById('password1').value;
          var confirmPassword = document.getElementById('confirmPassword1').value;
          username1=name
  
         
      
          if (username.trim() === '' || name.trim() === '' || contactNumber.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
              alert('Please fill in all fields');
          } else if (password !== confirmPassword) {
              var errorMessagee = document.getElementById('errorMessagee');
              if (errorMessagee) {
                  errorMessagee.remove();
              }
              if (!document.getElementById('errorMessage')) {
                  // Create a new paragraph element for the error message
                  var paragraph = document.createElement("p");
                  paragraph.id = 'errorMessage';
                  paragraph.style.marginLeft = "479px";
      
                  // Create text content for the paragraph
                  var text = document.createTextNode("Confirm password is not the same as password.");
      
                  // Append the text node to the paragraph element
                  paragraph.appendChild(text);
      
                  // Append the paragraph element to the body of the HTML document
                  document.body.appendChild(paragraph);
              }
              
          }
          else if (password.length < 8) {
              var errorMessage = document.getElementById('errorMessage');
              if (errorMessage) {
                  errorMessage.remove();
              }
              // Check if there's already an error message element
              var errorMessagee = document.getElementById('errorMessagee');
              if (!errorMessagee) {
                  // If not, create a new one
                  errorMessagee = document.createElement('p');
                  errorMessagee.id = 'errorMessagee';
                  errorMessagee.style.marginLeft = "479px";
                  var text = document.createTextNode("Password length must be at least 8 characters.");
  
              // Append the text node to the paragraph element
                  errorMessagee.appendChild(text);
                  // Append it to an appropriate place in your HTML, for example, the form element
                  errorMessagee.style.marginLeft = "479px";
                  //var form = document.getElementById('signupForm'); // Replace 'yourFormId' with the actual ID of your form
                  document.body.appendChild(errorMessagee);
              }
          }
          else if(password === confirmPassword && password.length > 8 ){
              var errorMessage = document.getElementById('errorMessage');
              if (errorMessage) {
                  errorMessage.remove();
              }
              var errorMessagee = document.getElementById('errorMessagee');
              if (errorMessagee) {
                  errorMessagee.remove();
              }
              
                  
              
              fetch('/signup?contactNumber=' + contactNumber + '&email=' + email + '&username=' + username, {
                  method: 'GET'
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json(); // Parse the JSON response
              })
              .then(data => {
                  console.log('Response from server helooooo:', data);
                  if(data.success){
                      window.location.href = "login.html";
                  }
                  else{
                      if(data === "contact number , cnic and email are already taken."){
                          var errorMessage2 = document.getElementById('errorMessage2');
                      if (errorMessage2) {
                       errorMessage2.remove();
                     }
                     var errorMessage5 = document.getElementById('errorMessage5');
                      if (errorMessage5) {
                       errorMessage5.remove();
                     }
                     var errorMessage6 = document.getElementById('errorMessage6');
                      if (errorMessage6) {
                       errorMessage6.remove();
                     }
                     var errorMessage7 = document.getElementById('errorMessage7');
                      if (errorMessage7) {
                       errorMessage7.remove();
                     }
                     var errorMessage3 = document.getElementById('errorMessage3');
                      if (errorMessage3) {
                       errorMessage3.remove();
                     }
                     var errorMessage4 = document.getElementById('errorMessage4');
              if (errorMessage4) {
                  errorMessage4.remove();
              }
              var errorMessage = document.getElementById('errorMessage');
              if (errorMessage) {
                  errorMessage.remove();
              }
                          if (!document.getElementById('errorMessage1')) {
                              // Create a new paragraph element for the error message
                              var paragraph = document.createElement("p");
                              paragraph.id = 'errorMessage1';
                              paragraph.style.marginLeft = "479px";
                  
                              // Create text content for the paragraph
                              var text = document.createTextNode(data);
                  
                              // Append the text node to the paragraph element
                              paragraph.appendChild(text);
                  
                              // Append the paragraph element to the body of the HTML document
                              document.body.appendChild(paragraph);
                          }
                      }
                      if(data === "Contact number and email is already taken."){
                          var errorMessage = document.getElementById('errorMessage');
                      if (errorMessage) {
                       errorMessage.remove();
                     }
                     var errorMessage1 = document.getElementById('errorMessage1');
                      if (errorMessage1) {
                       errorMessage1.remove();
                     }
                     var errorMessage2 = document.getElementById('errorMessage2');
                      if (errorMessage2) {
                       errorMessage2.remove();
                     }
                     var errorMessage6 = document.getElementById('errorMessage6');
                      if (errorMessage6) {
                       errorMessage6.remove();
                     }
                     var errorMessage7 = document.getElementById('errorMessage7');
                      if (errorMessage7) {
                       errorMessage7.remove();
                     }
                     var errorMessage3 = document.getElementById('errorMessage3');
                      if (errorMessage3) {
                       errorMessage3.remove();
                     }
                     var errorMessage4 = document.getElementById('errorMessage4');
              if (errorMessage4) {
                  errorMessage4.remove();
              }
                          if (!document.getElementById('errorMessage5')) {
                              // Create a new paragraph element for the error message
                              var paragraph = document.createElement("p");
                              paragraph.id = 'errorMessage5';
                              paragraph.style.marginLeft = "479px";
                  
                              // Create text content for the paragraph
                              var text = document.createTextNode(data);
                  
                              // Append the text node to the paragraph element
                              paragraph.appendChild(text);
                  
                              // Append the paragraph element to the body of the HTML document
                              document.body.appendChild(paragraph);
                          }
                      }
                      if(data === "Contact number and cnic is already taken."){
                          var errorMessage2 = document.getElementById('errorMessage2');
                      if (errorMessage2) {
                       errorMessage2.remove();
                     }
                     var errorMessage = document.getElementById('errorMessage');
                     if (errorMessage) {
                      errorMessage.remove();
                    }
                    var errorMessage1 = document.getElementById('errorMessage1');
                     if (errorMessage1) {
                      errorMessage1.remove();
                    }
                    var errorMessage5 = document.getElementById('errorMessage5');
                      if (errorMessage5) {
                       errorMessage5.remove();
                     }
                     var errorMessage7 = document.getElementById('errorMessage7');
                      if (errorMessage7) {
                       errorMessage7.remove();
                     }
                     var errorMessage3 = document.getElementById('errorMessage3');
                      if (errorMessage3) {
                       errorMessage3.remove();
                     }
                     var errorMessage4 = document.getElementById('errorMessage4');
              if (errorMessage4) {
                  errorMessage4.remove();
              }
                          if (!document.getElementById('errorMessage6')) {
                              // Create a new paragraph element for the error message
                              var paragraph = document.createElement("p");
                              paragraph.id = 'errorMessage6';
                              paragraph.style.marginLeft = "479px";
                  
                              // Create text content for the paragraph
                              var text = document.createTextNode(data);
                  
                              // Append the text node to the paragraph element
                              paragraph.appendChild(text);
                  
                              // Append the paragraph element to the body of the HTML document
                              document.body.appendChild(paragraph);
                          }
                      }
                      if(data === "cnic and email is already taken."){
                          var errorMessage2 = document.getElementById('errorMessage2');
                      if (errorMessage2) {
                       errorMessage2.remove();
                     }
                     var errorMessage = document.getElementById('errorMessage');
                      if (errorMessage) {
                       errorMessage.remove();
                     }
                     var errorMessage1 = document.getElementById('errorMessage1');
                      if (errorMessage1) {
                       errorMessage1.remove();
                     }
                     var errorMessage5 = document.getElementById('errorMessage5');
                      if (errorMessage5) {
                       errorMessage5.remove();
                     }
                     var errorMessage3 = document.getElementById('errorMessage3');
                      if (errorMessage3) {
                       errorMessage3.remove();
                     }
                     var errorMessage6 = document.getElementById('errorMessage6');
                     if (errorMessage6) {
                         errorMessage6.remove();
                     }
                     var errorMessage4 = document.getElementById('errorMessage4');
              if (errorMessage4) {
                  errorMessage4.remove();
              }
                          if (!document.getElementById('errorMessage7')) {
                              // Create a new paragraph element for the error message
                              var paragraph = document.createElement("p");
                              paragraph.id = 'errorMessage7';
                              paragraph.style.marginLeft = "479px";
                  
                              // Create text content for the paragraph
                              var text = document.createTextNode(data);
                  
                              // Append the text node to the paragraph element
                              paragraph.appendChild(text);
                  
                              // Append the paragraph element to the body of the HTML document
                              document.body.appendChild(paragraph);
                          }
                      }
                      if(data === "Contact number is already taken."){
                          var errorMessage1 = document.getElementById('errorMessage1');
              if (errorMessage1) {
                  errorMessage1.remove();
              }
              var errorMessage = document.getElementById('errorMessage');
              if (errorMessage) {
                  errorMessage.remove();
              }
              var errorMessage5 = document.getElementById('errorMessage5');
                      if (errorMessage5) {
                       errorMessage5.remove();
                     }
                     var errorMessage6 = document.getElementById('errorMessage6');
                      if (errorMessage6) {
                       errorMessage6.remove();
                     }
                     var errorMessage7 = document.getElementById('errorMessage7');
                      if (errorMessage7) {
                       errorMessage7.remove();
                     }
              var errorMessage3 = document.getElementById('errorMessage3');
              if (errorMessage3) {
                  errorMessage3.remove();
              }
              var errorMessage4 = document.getElementById('errorMessage4');
              if (errorMessage4) {
                  errorMessage4.remove();
              }
                          if (!document.getElementById('errorMessage2')) {
                              // Create a new paragraph element for the error message
                              var paragraph = document.createElement("p");
                              paragraph.id = 'errorMessage2';
                              paragraph.style.marginLeft = "479px";
                  
                              // Create text content for the paragraph
                              var text = document.createTextNode(data);
                  
                              // Append the text node to the paragraph element
                              paragraph.appendChild(text);
                  
                              // Append the paragraph element to the body of the HTML document
                              document.body.appendChild(paragraph);
                          }
                      }
                      if(data === "Email is already taken."){
                          var errorMessage1 = document.getElementById('errorMessage1');
                          if (errorMessage1) {
                              errorMessage1.remove();
                          }
                          var errorMessage5 = document.getElementById('errorMessage5');
                      if (errorMessage5) {
                       errorMessage5.remove();
                     }
                     var errorMessage6 = document.getElementById('errorMessage6');
                      if (errorMessage6) {
                       errorMessage6.remove();
                     }
                     var errorMessage7 = document.getElementById('errorMessage7');
                      if (errorMessage7) {
                       errorMessage7.remove();
                     }
                          var errorMessage2 = document.getElementById('errorMessage2');
                          if (errorMessage2) {
                              errorMessage2.remove();
                          }
                          var errorMessage = document.getElementById('errorMessage');
              if (errorMessage) {
                  errorMessage.remove();
              }
              var errorMessage4 = document.getElementById('errorMessage4');
              if (errorMessage4) {
                  errorMessage4.remove();
              }
                          if (!document.getElementById('errorMessage3')) {
                              // Create a new paragraph element for the error message
                              var paragraph = document.createElement("p");
                              paragraph.id = 'errorMessage3';
                              paragraph.style.marginLeft = "479px";
                  
                              // Create text content for the paragraph
                              var text = document.createTextNode(data);
                  
                              // Append the text node to the paragraph element
                              paragraph.appendChild(text);
                  
                              // Append the paragraph element to the body of the HTML document
                              document.body.appendChild(paragraph);
                          }
                      }
                      if(data === "cnic is already taken."){
                          var errorMessage1 = document.getElementById('errorMessage1');
                          if (errorMessage1) {
                              errorMessage1.remove();
                          }
                          var errorMessage2 = document.getElementById('errorMessage2');
                          if (errorMessage2) {
                              errorMessage2.remove();
                          }
                          var errorMessage3 = document.getElementById('errorMessage3');
                          if (errorMessage3) {
                              errorMessage3.remove();
                          }
                          var errorMessage = document.getElementById('errorMessage');
              if (errorMessage) {
                  errorMessage.remove();
              }
              var errorMessage5 = document.getElementById('errorMessage5');
                      if (errorMessage5) {
                       errorMessage5.remove();
                     }
                     var errorMessage6 = document.getElementById('errorMessage6');
                      if (errorMessage6) {
                       errorMessage6.remove();
                     }
                     var errorMessage7 = document.getElementById('errorMessage7');
                      if (errorMessage7) {
                       errorMessage7.remove();
                     }
                          if (!document.getElementById('errorMessage4')) {
                              // Create a new paragraph element for the error message
                              var paragraph = document.createElement("p");
                              paragraph.id = 'errorMessage4';
                              paragraph.style.marginLeft = "479px";
                  
                              // Create text content for the paragraph
                              var text = document.createTextNode(data);
                  
                              // Append the text node to the paragraph element
                              paragraph.appendChild(text);
                  
                              // Append the paragraph element to the body of the HTML document
                              document.body.appendChild(paragraph);
                          }
                      }
                 
                  // Check if the backend response indicates that contact and email are not taken
              }
              })
              .catch(error => {
                  console.error(error);
              });
          }
          else{
      }
  }
  
  
  
  function submitAndRedirectforlogin() {
   
    let userDataArray = [];
  
    fetch('/login')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log('Response from server:', data);
            data.forEach(user => {
                userDataArray.push(user); // Push each user object into the array
            });
  
            // Check if all fields are filled
            var username = document.getElementById('email').value;
            var password = document.getElementById('password').value;
  
            if (username.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields');
            } else {
                // If all fields are filled, check credentials
                let found = false;
                userDataArray.forEach(user => {
                    if (user.cnic === username && user.password === password) {
                        found = true;
                        // If credentials match, redirect to portal.html
                        window.location.href = 'portal.html';
                        return;
                    }
                });
  
                // If credentials were not found, show error message
                if (!found) {
                    if (!document.getElementById('wrongcred')) {
                        var paragraph = document.createElement("p");
                        paragraph.id = 'wrongcred';
                        paragraph.style.marginLeft = "660px";
                        var text = document.createTextNode("Invalid Credentials.");
                        paragraph.appendChild(text);
                        document.body.appendChild(paragraph);
                    }
                }
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
  
      }
  
  
  
  function showOption(optionName) {
    if(optionName != 'Dashboard'){
    document.getElementById('currentOption').textContent = optionName; }
    else{
      document.getElementById('currentOption').textContent = null;
    }
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }
  
    // Get the form element
    var formToShow = document.getElementById('AddLandForm');
  
    // Get the help content element
    var helpContent = document.getElementById('HelpContent');
  
    // Hide the help content by default
    if (helpContent) {
        helpContent.style.display = 'none';
    }
  
    // Show the appropriate content based on the option selected
    if (optionName === 'Add Land') {
        if (formToShow) {
            formToShow.style.display = 'block';
        }
    } else if (optionName === 'Help') {
        if (helpContent) {
            helpContent.style.display = 'block';
        }
    }
  }
  
  function showOptionn(optionName) {
    document.getElementById('currentOption').textContent = optionName;
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }
  
    var formToShow = document.getElementById('BuyerProfileForm');
    if (optionName === 'Buyer Profile') {
        if (formToShow) {
            formToShow.style.display = 'block';
        }
    } else {
        var helpContent = document.getElementById('HelpContent');
        if (helpContent) {
            helpContent.style.display = 'none';
        }
    }
  }
  
  
  
    function sendOTP(){
      const email = document.getElementById('email');
      const otpverify = document.getElementsByClassName('otpverify')[0];
     
      var em;
      // Create a SMTP crendentials that I showed u in my previous video
    
      // Generating random number as OTP;
      let userDataArray = [];
      fetch('/forgotpassword')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json(); // Parse the JSON response
          })
          .then(data => {
              console.log('Response from server:', data);
              data.forEach(user => {
                  userDataArray.push(user); 
                  console.log(user.email)// Push each user object into the array
              });
              em = email.value;
  
             if(email.value.trim() === ''){
              alert('Please fill the field first');
             }
             else {
              let found = false;
              userDataArray.forEach(user => {
                  if (user.email === email.value ) {
                      found = true;
                  }
              })
              if(found){
                      let otp_val = Math.floor(Math.random()*10000);
    
                      let emailbody = `
                         
                          <h2>Your OTP is </h2>${otp_val}
                      `;
                    
                      Email.send({
                          SecureToken : "9100139c-459c-4c56-8f97-db6adcc797f0",
                          To : email.value,
                          From: "sheikhhannan310@gmail.com",
                          Subject : "This is the from land deed",
                          Body : emailbody
                      }).then(
                          //if success it returns "OK";
                        message => {
                          if(message === "OK"){
                              alert("OTP sent to your email "+email.value);
                    
                              // now making otp input visible
                              otpverify.style.display = "block";
                              const otp_inp = document.getElementById('otp_inp');
                              const otp_btn = document.getElementById('otp-btn');
                    
                              otp_btn.addEventListener('click',()=>{
                                  // now check whether sent email is valid
                                  if(otp_inp.value == otp_val){
                                      alert("Email address verified...");
                                    //  window.location.href =  "confirmPassword.html";
                                      window.location.href = `confirmPassword.html?email=${em}`;
                    
                                  }
                                  else{
                                      alert("Invalid OTP");
                                  }
                              })
                          }
                        }
                      );
                  }
                  if(!found){
                      if (!document.getElementById('wrongemail')) {
                          var paragraph = document.createElement("p");
                          paragraph.id = 'wrongemail';
                          paragraph.style.marginLeft = "660px";
                          var text = document.createTextNode("this email does not exist.");
                          paragraph.appendChild(text);
                          document.body.appendChild(paragraph);
                      }
                  }
              }
                      // If credentials match, redirect to portal.html
                     
                  });
          }
  
  
          function change(){
             
       const params = new URLSearchParams(window.location.search);
       
      const emailc = params.get('email');
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
     // const confirmPassword = document.getElementById('confirmPassword').value;
      document.getElementById('emailc').value = emailc
     
      console.log(emailc);
  
      if (newPassword.trim() === '' || confirmPassword.trim() === '') {
          alert('Please fill in both password fields.');
          return ;
      } else if (newPassword !== confirmPassword) { // Check if passwords match
          alert('Passwords do not match.');
          return ;
      } 
      else if (newPassword === confirmPassword && newPassword.length < 8 ) { // Check if passwords match
          alert('Password length must be atleast 8 ');
          return ;
      } 
      else {
          // Set the value of the email field and open the portal.html file
        
          window.open('login.html', '_blank');
      }
       
         
      
  }
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
      const submitButton = document.getElementById('submitButton');
      if (submitButton) {
          submitButton.addEventListener('click', submitSellerForm);
      } else {
          console.error('Submit button not found');
      }
  });
  
  async function submitSellerForm(event) {
      event.preventDefault(); // Prevent the form from submitting the default way
      var cnic = document.getElementById('formGroupExampleInput0').value;
      var area = document.getElementById('formGroupExampleInput').value;
      var city = document.getElementById('formGroupExampleInput2').value;
      var walletAddress = document.getElementById('formGroupExampleInput3').value;
      var price = document.getElementById('formGroupExampleInput4').value;
      var propertyNumber = document.getElementById('formGroupExampleInput5').value;
      var landImage = document.getElementById('formGroupExampleInput6').files.length;
      var frc = document.getElementById('FRC').files.length;
      var powerOfAttorney = document.getElementById('powerOfAttorney').files.length;
  
      // Check if any field is empty or if file inputs are not selected
      if (cnic.trim() === '' || area.trim() === '' || city.trim() === '' || walletAddress.trim() === '' || price.trim() === '' || propertyNumber.trim() === '' || landImage === 0 || frc === 0 || powerOfAttorney === 0) {
          alert('Please fill in all fields and upload all required files');
          return; // Stop the function if any field is empty
      }
      const form = document.getElementById('sellerForm');
      const formData = new FormData(form);
  
      try {
          const response = await fetch('/sellerform', {
              method: 'POST',
              body: formData,
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log('Response:', data.result);
              const resultDiv = document.getElementById('result');
              if(data.result == true){
              resultDiv.textContent = `FRC verified`;
              resultDiv.style.backgroundColor = '#7FFFD4'; // Set the background color
              resultDiv.style.color = '#581845'; // Set the text color
          } 
          else{ 
              resultDiv.textContent = `FRC not verified`;
              resultDiv.style.backgroundColor = '#900C3F'; // Set the background color
              resultDiv.style.color = '#e6e6e6'; // Set the text color
          }
             
          } else {
            
              const errorData = await response.json();
              alert( errorData.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An unexpected error occurred: ' + error.message);
      }
  }
  
  
    document.addEventListener("DOMContentLoaded", function() {
      fetchLandData(1); // Fetch data for the first page
  });
  
  const cardsPerPage = 4;
  let currentPage = 1;
  
  function fetchLandData(page) {
    fetch("/landgallery")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("card-container");
            container.innerHTML = ""; // Clear any existing content

            // Calculate start and end index based on the current page
            const startIndex = (page - 1) * cardsPerPage;
            const endIndex = Math.min(startIndex + cardsPerPage, data.length);

            for (let i = startIndex; i < endIndex; i++) {
                const land = data[i];
                
                // Log the land object for debugging
                console.log(land);

                // Check if any of the required fields are null or undefined
                if (!land || !land.area || !land.city || !land.property_number || !land.price) {
                    continue;
                }

                const card = document.createElement("div");
                card.classList.add("card");
                card.style.width = "18rem"; // Adjust the width as needed

                const img = document.createElement("img");
                img.classList.add("card-img-top");
                img.src = land.landImage ? `uploads/${land.landImage}` : 'path/to/default/image.jpg'; // Adjust the path if needed
                img.alt = "Land Image";

                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");

                const listGroup = document.createElement("ul");
                listGroup.classList.add("list-group");

                const areaItem = document.createElement("li");
                areaItem.classList.add("list-group-item");
                areaItem.textContent = `Area in Sqm: ${land.area}`;

                const cityItem = document.createElement("li");
                cityItem.classList.add("list-group-item");
                cityItem.textContent = `City: ${land.city}`;

                const propertyNoItem = document.createElement("li");
                propertyNoItem.classList.add("list-group-item");
                propertyNoItem.textContent = `Property No: ${land.property_number}`;

                const priceItem = document.createElement("li");
                priceItem.classList.add("list-group-item");
                priceItem.textContent = `Price: ${land.price}`;

                listGroup.appendChild(areaItem);
                listGroup.appendChild(cityItem);
                listGroup.appendChild(propertyNoItem);
                listGroup.appendChild(priceItem);

                cardBody.appendChild(listGroup);
                card.appendChild(img);
                card.appendChild(cardBody);

                container.appendChild(card);
            }

            setupPagination(data.length, page);
        })
        .catch(error => console.error("Error fetching land data:", error));
}

  
  function setupPagination(totalItems, currentPage) {
      const totalPages = Math.ceil(totalItems / cardsPerPage);
      const pagination = document.getElementById("pagination");
      pagination.innerHTML = "";
  
      for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement("button");
          button.className = "btn btn-primary";
          button.textContent = i;
          button.disabled = (i === currentPage);
          button.addEventListener("click", () => {
              fetchLandData(i);
              currentPage = i; // Update the current page
          });
          pagination.appendChild(button);
      }
  }
  
  
  
  document.addEventListener("DOMContentLoaded", function() {
      fetchSellerData();
  
      // Add event listeners to the "View Details" links
      document.getElementById('viewRegisteredLand').addEventListener('click', function(e) {
          e.preventDefault();
          toggleVisibility('registeredLandCard');
      });
  
      document.getElementById('viewTotalBuyers').addEventListener('click', function(e) {
          e.preventDefault();
          toggleVisibility('totalBuyersCard');
      });
  });
  
  function fetchSellerData() {
      fetch("/seller")
          .then(response => response.json())
          .then(data => {
              const tableBody = document.querySelector("#datatablesSimple tbody");
              tableBody.innerHTML = ""; // Clear any existing content
  
              data.forEach(item => {
                  const row = document.createElement("tr");
  
                  // Create and append Property Number cell
                  const propertyNumberCell = document.createElement("td");
                  propertyNumberCell.textContent = item.property_number;
                  row.appendChild(propertyNumberCell);
  
                  // Create and append Area in Sqm cell
                  const areaCell = document.createElement("td");
                  areaCell.textContent = item.area;
                  row.appendChild(areaCell);
  
                  // Create and append City cell
                  const cityCell = document.createElement("td");
                  cityCell.textContent = item.city;
                  row.appendChild(cityCell);
  
                  // Create and append Price cell
                  const priceCell = document.createElement("td");
                  priceCell.textContent = item.price;
                  row.appendChild(priceCell);
  
                  // Append the row to the table body
                  tableBody.appendChild(row);
              });
  
              // Initialize DataTable
              new DataTable("#datatablesSimple");
          })
          .catch(error => console.error("Error fetching seller data:", error));
  }
  
  function toggleVisibility(id) {
      const registeredLandCard = document.getElementById('registeredLandCard');
      const totalBuyersCard = document.getElementById('totalBuyersCard');
  
      if (id === 'registeredLandCard') {
          registeredLandCard.style.display = registeredLandCard.style.display === 'none' ? 'block' : 'none';
          totalBuyersCard.style.display = 'none';
      } else if (id === 'totalBuyersCard') {
          totalBuyersCard.style.display = totalBuyersCard.style.display === 'none' ? 'block' : 'none';
          registeredLandCard.style.display = 'none';
      }
  }
  
  
  function handleFormSubmit(event) {
      event.preventDefault(); // Prevent the default form submission
  
      const form = event.target.closest('form');
      const formData = new URLSearchParams(new FormData(form)).toString();
  
      fetch('/buyerform', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Set the content type
          },
          body: formData
      })
      .then(response => response.text())
      .then(message => {
          alert(message); // Display the message as an alert
          if (message.includes("already in use")) {
              // Handle specific cases if needed
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while submitting the form.');
      });
  
      return false; // Prevent the default form action
  }

  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const squareYards = document.querySelector('input[name="squareYards"]').value;

    fetch(`/search?squareYards=${encodeURIComponent(squareYards)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

var buyerData = {};
var requestState = {};
function displayResults(results) {
    const container = document.getElementById('resultsTableContainer');
    container.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-striped'; // Add Bootstrap styling for a cool look

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.innerHTML = `
        <tr>
            <th>CNIC</th>
            <th>Area</th>
            <th>City</th>
            <th>Wallet Address</th>
            <th>Price</th>
            <th>Property Number</th>
            <th>Request</th>
        </tr>
    `;
    
    results.forEach((result, index) => {
        const uniqueId = `btn-${result.cnic}-${index}`;
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td>${result.cnic}</td>
            <td>${result.area}</td>
            <td>${result.city}</td>
            <td>${result.walletaddress}</td>
            <td>${result.price}</td>
            <td>${result.property_number}</td>
            <td>
                <button id="${uniqueId}" class="btn btn-primary" onclick="toggleRequest('${result.cnic}', '${uniqueId}'); sendRequest('${result.cnic}')">Send</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

function toggleRequest(cnic, buttonId) {
    const button = document.getElementById(buttonId);
    
    if (!button) {
        console.error(`Button with ID ${buttonId} not found.`);
        return;
    }

    // Toggle the request state and button appearance
    if (requestState[buttonId]) {
        // If state is 'Sent', change to 'Send'
        button.textContent = 'Send';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-primary');
        delete requestState[buttonId]; // Reset the state
        console.log(`Request for ${cnic} set to 'Send'.`);
    } else {
        // If state is 'Send', change to 'Sent'
        button.textContent = 'Unsend';
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');
        requestState[buttonId] = true; // Mark the state as 'Sent'
        console.log(`Request for ${cnic} set to 'Unsend'.`);
    }

}



function sendRequest(cnic) {
    // Make a GET request to fetch buyer data based on the CNIC
    fetch(`/api/get-buyer-data?cnic=${encodeURIComponent(cnic)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // Assuming `data` contains the buyer information
        // You can now display this data to the user
        buyerData = data;
        console.log(buyerData);
        //displayBuyerData(data);
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

