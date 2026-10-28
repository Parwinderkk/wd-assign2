
// =====================================================
// WatchNext - script.js
// Sections: 1 Helper, 2 Registration, 3 Booking behaviour,
//           4 Booking validation, 5 Recommendation
// =====================================================

// ===== 1. Helper: write or clear an error message =====
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// ===== 2. Registration form validation =====
const registerForm = document.getElementById("registerForm");

// Only run on register.html
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        // Always stop the normal submit, then decide ourselves
        event.preventDefault();
        let isValid = true;

        // Read the values the user typed
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const country = document.getElementById("country").value;

        // Username: at least 5 characters, letters, numbers and underscores only
        if (username === "") {
            showError("usernameError", "Please enter a username.");
            isValid = false;
        } else if (username.length < 5) {
            showError("usernameError", "Username must be at least 5 characters.");
            isValid = false;
        } else if (!/^[A-Za-z0-9_]+$/.test(username)) {
            showError("usernameError", "Use only letters, numbers and underscores.");
            isValid = false;
        } else {
            showError("usernameError", "");
        }

        // Email: simple format check
        if (email === "") {
            showError("emailError", "Please enter your email address.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("emailError", "Please enter a valid email address.");
            isValid = false;
        } else {
            showError("emailError", "");
        }

        // Phone: digits only, 8 to 15 digits
        if (phone === "") {
            showError("phoneError", "Please enter your phone number.");
            isValid = false;
        } else if (!/^[0-9]{8,15}$/.test(phone)) {
            showError("phoneError", "Phone must be 8 to 15 digits, numbers only.");
            isValid = false;
        } else {
            showError("phoneError", "");
        }

        // Password: 10+ characters with upper, lower, number and special character
        if (password === "") {
            showError("passwordError", "Please enter a password.");
            isValid = false;
        } else if (password.length < 10) {
            showError("passwordError", "Password must be at least 10 characters.");
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            showError("passwordError", "Password needs an uppercase letter.");
            isValid = false;
        } else if (!/[a-z]/.test(password)) {
            showError("passwordError", "Password needs a lowercase letter.");
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            showError("passwordError", "Password needs a number.");
            isValid = false;
        } else if (!/[^A-Za-z0-9]/.test(password)) {
            showError("passwordError", "Password needs a special character, such as ! or #.");
            isValid = false;
        } else {
            showError("passwordError", "");
        }

        // Confirm password must match
        if (confirmPassword === "") {
            showError("confirmPasswordError", "Please confirm your password.");
            isValid = false;
        } else if (confirmPassword !== password) {
            showError("confirmPasswordError", "Passwords do not match.");
            isValid = false;
        } else {
            showError("confirmPasswordError", "");
        }

        // Gender: one radio button must be selected
        if (!document.querySelector('input[name="gender"]:checked')) {
            showError("genderError", "Please select a gender.");
            isValid = false;
        } else {
            showError("genderError", "");
        }

        // Genres: at least one checkbox must be ticked
        if (document.querySelectorAll('input[name="genre"]:checked').length === 0) {
            showError("genreError", "Please choose at least one genre.");
            isValid = false;
        } else {
            showError("genreError", "");
        }

        // Country: something other than the empty first option
        if (country === "") {
            showError("countryError", "Please select a country or region.");
            isValid = false;
        } else {
            showError("countryError", "");
        }

        // All checks passed: confirm and clear the form (no server needed)
        if (isValid) {
            alert("Registration successful!");
            registerForm.reset();
        }
    });
}

// ===== 3. Booking page: dynamic behaviour =====
const movieSelect = document.getElementById("movie");

// Only run on pages that have the movie dropdown (booking.html)
if (movieSelect) {
    const ticketsInput = document.getElementById("tickets");
    const priceBox = document.getElementById("ticketPrice");
    const totalBox = document.getElementById("totalCost");
    const voucherFields = document.getElementById("voucherFields");
    const cardFields = document.getElementById("cardFields");
    const cardType = document.getElementById("cardType");
    const cardNumber = document.getElementById("cardNumber");
    const sameEmail = document.getElementById("sameEmail");
    const bookingEmail = document.getElementById("bookingEmail");
    const billingEmail = document.getElementById("billingEmail");

    // Update the ticket price and total cost from the chosen movie
    function updateCost() {
        const selectedOption = movieSelect.options[movieSelect.selectedIndex];
        const price = parseFloat(selectedOption.dataset.price) || 0;
        const tickets = parseInt(ticketsInput.value) || 0;
        priceBox.value = price.toFixed(2);
        totalBox.value = (price * tickets).toFixed(2);
    }

    // Show the voucher box or the card box depending on the payment method
    function updatePaymentFields() {
        const method = document.querySelector('input[name="payment"]:checked');
        voucherFields.hidden = !(method && method.value === "voucher");
        cardFields.hidden = !(method && method.value === "online");
    }

    // Amex cards have 15 digits, Visa and Mastercard have 16
    function updateCardLength() {
        cardNumber.maxLength = (cardType.value === "amex") ? 15 : 16;
    }

    // Copy the email into the billing email when the box is ticked
    function updateBillingEmail() {
        if (sameEmail.checked) {
            billingEmail.value = bookingEmail.value;
        } else {
            billingEmail.value = "";
        }
    }

    movieSelect.addEventListener("change", updateCost);
    ticketsInput.addEventListener("input", updateCost);
    cardType.addEventListener("change", updateCardLength);
    sameEmail.addEventListener("change", updateBillingEmail);

    // Keep the billing email in step while the box stays ticked
    bookingEmail.addEventListener("input", function () {
        if (sameEmail.checked) {
            billingEmail.value = bookingEmail.value;
        }
    });

    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    for (let i = 0; i < paymentRadios.length; i++) {
        paymentRadios[i].addEventListener("change", updatePaymentFields);
    }

    // Pre-fill the movie when opened from a link like booking.html?movie=Sky
    const params = new URLSearchParams(window.location.search);
    const chosenMovie = params.get("movie");
    if (chosenMovie) {
        movieSelect.value = chosenMovie;
        updateCost();
    }
}

// ===== 4. Booking form validation =====
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        let isValid = true;

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("bookingEmail").value.trim();
        const phone = document.getElementById("bookingPhone").value.trim();
        const movie = document.getElementById("movie").value;
        const screening = document.getElementById("screening").value;
        const tickets = parseInt(document.getElementById("tickets").value);
        const method = document.querySelector('input[name="payment"]:checked');
        const billing = document.getElementById("billingEmail").value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Full name must not be empty
        if (fullName === "") {
            showError("fullNameError", "Please enter your full name.");
            isValid = false;
        } else {
            showError("fullNameError", "");
        }

        // Email must be a valid format
        if (!emailPattern.test(email)) {
            showError("bookingEmailError", "Please enter a valid email address.");
            isValid = false;
        } else {
            showError("bookingEmailError", "");
        }

        // Phone: digits only, at least 10 digits
        if (!/^[0-9]{10,}$/.test(phone)) {
            showError("bookingPhoneError", "Phone must have at least 10 digits, numbers only.");
            isValid = false;
        } else {
            showError("bookingPhoneError", "");
        }

        // A movie must be chosen
        if (movie === "") {
            showError("movieError", "Please select a movie.");
            isValid = false;
        } else {
            showError("movieError", "");
        }

        // Screening date and time must be chosen and not in the past
        if (screening === "") {
            showError("screeningError", "Please choose a date and time.");
            isValid = false;
        } else if (new Date(screening) < new Date()) {
            showError("screeningError", "The screening cannot be in the past.");
            isValid = false;
        } else {
            showError("screeningError", "");
        }

        // Number of tickets must be greater than 0
        if (isNaN(tickets) || tickets <= 0) {
            showError("ticketsError", "Number of tickets must be greater than 0.");
            isValid = false;
        } else {
            showError("ticketsError", "");
        }

        // Payment method must be chosen, then check its own fields
        showError("voucherCodeError", "");
        showError("cardNumberError", "");

        if (!method) {
            showError("paymentError", "Please choose a payment method.");
            isValid = false;
        } else {
            showError("paymentError", "");

            if (method.value === "voucher") {
                const voucher = document.getElementById("voucherCode").value.trim();
                if (!/^[0-9]{12}$/.test(voucher)) {
                    showError("voucherCodeError", "Voucher code must be exactly 12 digits.");
                    isValid = false;
                }
            } else {
                const card = document.getElementById("cardNumber").value.trim();
                const needed = (document.getElementById("cardType").value === "amex") ? 15 : 16;
                if (!/^[0-9]+$/.test(card)) {
                    showError("cardNumberError", "Card number must contain digits only.");
                    isValid = false;
                } else if (card.length !== needed) {
                    showError("cardNumberError", "This card type needs " + needed + " digits.");
                    isValid = false;
                }
            }
        }

        // Billing email must be a valid format
        if (!emailPattern.test(billing)) {
            showError("billingEmailError", "Please enter a valid billing email.");
            isValid = false;
        } else {
            showError("billingEmailError", "");
        }

        // Block the submission if anything is wrong; otherwise the form posts normally
        if (!isValid) {
            event.preventDefault();
        }
    });
}

// ===== 5. Recommendation page =====
const recommendForm = document.getElementById("recommendForm");

if (recommendForm) {
    // The movie data the rules work with (titles must match the booking dropdown)
    const movies = [
        { title: "Sky", genre: "Animation", rating: "G", price: 15.00, viewing: ["family"] },
        { title: "21 Home", genre: "Comedy", rating: "PG", price: 18.50, viewing: ["family", "friends"] },
        { title: "Limitless", genre: "Action", rating: "M", price: 23.00, viewing: ["friends", "solo"] },
        { title: "Waterman", genre: "Action", rating: "PG", price: 20.00, viewing: ["friends", "family"] },
        { title: "The Dream", genre: "Drama", rating: "M", price: 22.00, viewing: ["solo", "date"] },
        { title: "Stargaze", genre: "Drama", rating: "PG", price: 19.50, viewing: ["date"] }
    ];

    // Points for each rating by age group (null means not suitable)
    const agePoints = {
        child: { G: 2, PG: 1, M: null },
        teen: { G: 1, PG: 2, M: 1 },
        adult: { G: 1, PG: 1, M: 2 }
    };

    // Friendly names used in the explanation
    const viewingNames = {
        family: "family viewing",
        date: "a date night",
        friends: "watching with friends",
        solo: "watching alone"
    };

    // Build the HTML for one recommended movie
    function movieCard(item, heading) {
        const m = item.movie;
        return '<article>' +
            '<h3>' + heading + ': ' + m.title + '</h3>' +
            '<p>Genre: ' + m.genre + '</p>' +
            '<p>Age rating: ' + m.rating + '</p>' +
            '<p>Ticket price: $' + m.price.toFixed(2) + '</p>' +
            '<p>Why: ' + item.reasons.join(", ") + '.</p>' +
            '<a href="booking.html?movie=' + encodeURIComponent(m.title) + '">Book This Movie</a>' +
            '</article>';
    }

    recommendForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const genre = document.getElementById("genre").value;
        const ageGroup = document.getElementById("ageGroup").value;
        const viewing = document.getElementById("viewing").value;
        const result = document.getElementById("recommendationResult");
        let isValid = true;

        // Every choice must be made
        if (genre === "") {
            showError("genreError", "Please choose a genre.");
            isValid = false;
        } else {
            showError("genreError", "");
        }

        if (ageGroup === "") {
            showError("ageGroupError", "Please choose an age group.");
            isValid = false;
        } else {
            showError("ageGroupError", "");
        }

        if (viewing === "") {
            showError("viewingError", "Please choose a viewing preference.");
            isValid = false;
        } else {
            showError("viewingError", "");
        }

        if (!isValid) {
            result.innerHTML = "";
            return;
        }

        // Give every movie a score using the rules
        const scored = [];
        for (let i = 0; i < movies.length; i++) {
            const m = movies[i];
            const pointsForAge = agePoints[ageGroup][m.rating];

            // Skip movies that are not suitable for this age group
            if (pointsForAge === null) {
                continue;
            }

            let score = pointsForAge;
            const reasons = ["suits the " + ageGroup + " age group"];

            if (m.genre.toLowerCase() === genre) {
                score += 3;
                reasons.push("matches your preferred genre");
            }
            if (m.viewing.includes(viewing)) {
                score += 2;
                reasons.push("works well for " + viewingNames[viewing]);
            }
            scored.push({ movie: m, score: score, reasons: reasons });
        }

        // Highest score first; equal scores keep their original order
        scored.sort(function (a, b) {
            return b.score - a.score;
        });

        // Show the top pick and the runner-up
        let html = movieCard(scored[0], "Top pick");
        if (scored.length > 1) {
            html += movieCard(scored[1], "You might also like");
        }
        result.innerHTML = html;
    });
}
