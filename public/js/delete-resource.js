// Function to delete a resource by its ID
function deleteResource(id) {
    // Ask the user to confirm deletion before proceeding
    if (!confirm("Are you sure you want to delete this resource?")) {
      return; // Exit function if user cancels
    }
  
    // Configure the request as DELETE to the delete-resource endpoint with the resource ID
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-resource/" + id, true);
    request.setRequestHeader("Content-Type", "application/json");
  
    // Define what happens when the request completes
    request.onload = function () {
      // Parse the JSON response from the server
      var response = JSON.parse(request.responseText);
  
      // Check if the request was successful (status 200)
      if (request.status === 200) {
        alert(response.message || "Resource deleted successfully!");
        viewResources(); // Refresh the table to reflect the deleted resource
      } else {
        // Show error message if deletion failed
        alert(response.message || "Unable to delete resource.");
      }
    };
  
    // Handle errors like network issues or server failures
    request.onerror = function () {
      alert("There was an error with the request. Please try again later.");
    };
  
    // Send the request (no data needed for deletion)
    request.send();
  }
  