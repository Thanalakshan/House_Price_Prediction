function getBathValue() {
    var bathrooms = document.getElementById("uiBathrooms");
    return parseInt(bathrooms.value);
}

function getBHKValue() {
    var bhk = document.getElementById("uiBHK");
    return parseInt(bhk.value);
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value; // Get selected location value
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "/api/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    var url = "./src/columns.json";

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

