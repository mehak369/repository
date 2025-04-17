document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("purchaseForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        let errors = [];

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let creditCard = document.getElementById("CreditCardNumber").value.trim();
        let expiryMonth = document.getElementById("CreditCardExpiryMonth").value.trim();
        let expiryYear = document.getElementById("CreditCardExpiryYear").value.trim();

        // Get item quantities
        let donutQty = document.getElementById("donutQty").value.trim();
        let chocolateQty = document.getElementById("chocolateQty").value.trim();
        let waterQty = document.getElementById("waterQty").value.trim();
        let penQty = document.getElementById("penQty").value.trim();
        let juiceQty = document.getElementById("juiceQty").value.trim();

        // Clear previous errors
        document.getElementById("errors").innerHTML = "";

        // Validate personal details
        if (!name) errors.push("Name is required.");
        if (!email) errors.push("Email is required.");
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Invalid email format.");

        if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(creditCard)) {
            errors.push("Invalid credit card format. Use XXXX-XXXX-XXXX-XXXX.");
        }
        if (!/^[A-Za-z]{3}$/.test(expiryMonth)) errors.push("Invalid expiry month format. Use MMM (e.g., JAN).");
        if (!/^\d{4}$/.test(expiryYear)) errors.push("Invalid expiry year format. Use YYYY.");

        // Prices for each item
        let prices = {
            donut: 5,
            chocolate: 15,
            water: 10,
            pen: 2,
            juice: 20
        };

        let totalAmount = 0;
        let purchasedItems = [];
        let atLeastOneItem = false;

        function processItem(qty, name, price) {
            if (qty) {
                if (!/^[1-9]\d*$/.test(qty)) {
                    errors.push(`${name} quantity must be a positive number.`);
                } else {
                    atLeastOneItem = true;
                    let itemTotal = parseInt(qty) * price;
                    totalAmount += itemTotal;
                    purchasedItems.push(`${qty} x ${name} ($${price} each) = $${itemTotal}`);
                }
            }
        }

        // Validate and process items
        processItem(donutQty, "Donuts", prices.donut);
        processItem(chocolateQty, "Chocolate", prices.chocolate);
        processItem(waterQty, "Water Bottle", prices.water);
        processItem(penQty, "Pen", prices.pen);
        processItem(juiceQty, "Juice", prices.juice);

        if (!atLeastOneItem) errors.push("At least one item must be purchased.");

        // Display errors
        if (errors.length > 0) {
            document.getElementById("errors").innerHTML = `<div class="alert alert-danger">${errors.join("<br>")}</div>`;
            return;
        }

        // Calculate donation (minimum $10 or 10% of total purchase)
        let donation = Math.max(10, totalAmount * 0.1);
        let totalCost = totalAmount + donation;

        // Display receipt
        document.getElementById("formResult").innerHTML = `
            <div class="alert alert-success">
                <h3>Receipt</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Credit Card:</strong> ****-****-****-${creditCard.slice(-4)}</p>
                <h4>Items Purchased:</h4>
                <ul>${purchasedItems.map(item => `<li>${item}</li>`).join('')}</ul>
                <p><strong>Total Purchase Amount:</strong> $${totalAmount.toFixed(2)}</p>
                <p><strong>Donation Amount:</strong> $${donation.toFixed(2)}</p>
                <p><strong>Total Cost:</strong> <span class="text-success">$${totalCost.toFixed(2)}</span></p>
            </div>
        `;
    });
});
