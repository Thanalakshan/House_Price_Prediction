// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Function to handle form submission
    document.getElementById('predictionForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var formData = new FormData(this);
        
        // Make POST request to Flask endpoint for prediction
        fetch('/predict_home_price', {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            // Update UI with estimated price
            var estimatedPriceDiv = document.getElementById('uiEstimatedPrice');
            estimatedPriceDiv.innerHTML = '<h2>Estimated Price: ₹ ' + data.estimated_price + '</h2>';
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
    });

    // Function to populate locations dropdown on page load
    function onPageLoad() {
        fetch('/get_location_names')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Update dropdown with locations
            var selectDropdown = document.getElementById("uiLocations");
            selectDropdown.innerHTML = ''; // Clear existing options

            // Add placeholder option
            var placeholderOption = document.createElement('option');
            placeholderOption.value = "";
            placeholderOption.textContent = "Choose a Location";
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            selectDropdown.appendChild(placeholderOption);

            // Add options from JSON data
            data.locations.forEach(function(location) {
                var option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                selectDropdown.appendChild(option);
            });
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
    }

    onPageLoad(); // Call onPageLoad function when DOM is loaded
});
