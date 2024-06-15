function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    var sqft = document.getElementById("uiSqft").value;
    var bhk = document.getElementById("uiBHK").value;
    var bathrooms = document.getElementById("uiBathrooms").value;
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "https://thanalakshan.github.io/api/predict_home_price";

    // Construct query parameters for GET request
    var queryParams = `?total_sqft=${encodeURIComponent(sqft)}&bhk=${encodeURIComponent(bhk)}&bath=${encodeURIComponent(bathrooms)}&location=${encodeURIComponent(location)}`;

    // Make GET request
    $.get(url + queryParams)
        .done(function(data) {
            console.log(data.estimated_price);
            estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error in GET request:", textStatus, errorThrown);
        });
}

function onPageLoad() {
    var url = "./src/locations.json";

    $.getJSON(url)
        .done(function(data) {
            console.log("got response for get_location_names request");
            if (data && data.locations) {
                var locations = data.locations;
                var selectDropdown = document.getElementById("uiLocations");
                selectDropdown.innerHTML = ''; // Clear existing options (including placeholder)

                // Add placeholder option
                var placeholderOption = document.createElement('option');
                placeholderOption.value = "";
                placeholderOption.textContent = "Choose a Location";
                placeholderOption.disabled = true;
                placeholderOption.selected = true;
                selectDropdown.appendChild(placeholderOption);

                // Add options from JSON data
                locations.forEach(function(location) {
                    var option = document.createElement('option');
                    option.value = location;
                    option.textContent = location;
                    selectDropdown.appendChild(option);
                });
            } else {
                console.error("Invalid or empty data received from JSON.");
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Request Failed: " + err);
        });
}

// Call onPageLoad when the document is fully loaded
$(document).ready(function() {
    onPageLoad();
});

