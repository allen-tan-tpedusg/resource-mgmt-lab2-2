// Function to open the edit modal and pre-fill it with the selected resource's data
function editResource(data) {
    var selectedResource = JSON.parse(data);
  
    // Pre-fill the modal input fields with the current resource details
    document.getElementById("editName").value = selectedResource.name;
    document.getElementById("editLocation").value = selectedResource.location;
    document.getElementById("editDescription").value = selectedResource.description;
    document.getElementById("editOwner").value = selectedResource.owner;
  
    // Set update button's onclick attribute to call updateResource() with resource's ID
    document.getElementById("updateButton").setAttribute(
      "onclick",
      `updateResource("${selectedResource.id}")` // Using template literals for readability
    );
  
    // Show the edit modal using Bootstrap's modal method
    $('#editResourceModal').modal('show');
  }
  
  // Function to send updated resource data to the backend API
  function updateResource(id) {
    var response = "";
  
    // Create a JSON object from the modal input fields
    var jsonData = {
      name: document.getElementById("editName").value,
      location: document.getElementById("editLocation").value,
      description: document.getElementById("editDescription").value,
      owner: document.getElementById("editOwner").value
    };
  
    // Basic validation to ensure all fields are filled
    if (jsonData.name === "" || jsonData.location === "" || jsonData.description === "" || jsonData.owner === "") {
      alert('All fields are required!');
      return; // Stop execution if validation fails
    }
  
    // Configure the request as PUT to the edit-resource endpoint with the resource ID
    var request = new XMLHttpRequest();
    request.open("PUT", "/edit-resource/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
  
    request.onload = function () {
      response = JSON.parse(request.responseText); // Parse JSON response
  
      // Check if the response is successful and update the UI accordingly
      if (request.status === 200 && response.message === "Resource updated successfully!") {
        alert(`Edited Resource: ${jsonData.name}!`);
        $('#editResourceModal').modal('hide'); // Close modal
        viewResources(); // Reload table content or resource list
      } else {
        // Show error if update failed
        alert('Unable to edit resource! Error: ' + (response.message || 'Unknown error.'));
      }
    };
  
    // Handle network or request errors
    request.onerror = function () {
      alert('There was a problem with the network request. Please try again later.');
    };
  
    // Send the JSON data to the server
    request.send(JSON.stringify(jsonData));
  }
  