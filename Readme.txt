WatchNext - COS10005 Web Development, Assignment 2
=====================================================
Student name: Parwinder Kaur
Student ID: 106243241
Unit: COS10005 Web Development, Semester 2, 2026

1. LINKS
-----------------------------------------------------
Mercury link: http://mercury.swin.edu.au/cos10005/s106243241/assignment2/index.html
GitHub repository: 

2. WEBSITE STRUCTURE
-----------------------------------------------------
assignment2/
  index.html      Home page: introduces WatchNext, its purpose,
                  target users and services
  movies.html     Six movies with genre, age rating, running time,
                  description, image, price and sessions
  recommend.html  Recommendation form (genre, age group, viewing
                  preference)
  register.html   Registration form with JavaScript validation
  booking.html    Ticket booking form
  css/style.css   One external stylesheet used by every page
  js/script.js    All JavaScript, linked on every page
  images/         Home banner and six movie images
  Readme.txt      This file

All pages share the same header, navigation bar (the current page
is highlighted) and footer. The layout changes for desktop (1024px
and above), tablet (768 to 1023px) and mobile (767px and below).

3. HOW THE JAVASCRIPT WORKS (plain English)
-----------------------------------------------------
Registration validation (register.html)
When Register is clicked, the script stops the normal submit and
checks every field. Errors appear in red under the field, and the
form is blocked until all errors are fixed.
- Username: at least 5 characters, only letters, numbers and
  underscores.
- Email: must look like name@site.com.
- Phone: digits only, between 8 and 15 digits.
- Password: at least 10 characters with an uppercase letter, a
  lowercase letter, a number and a special character.
- Confirm password: must match the password.
- Gender must be chosen, at least one genre must be ticked, and a
  country must be selected.
If everything is correct, a success message is shown and the form
is cleared. No data is sent anywhere.

Booking validation (booking.html)
- Full name, email, phone, movie, screening date and time, number
  of tickets and payment method are required.
- Email must be valid. Phone must be at least 10 digits.
- The screening date and time cannot be in the past. The script
  compares the chosen time with the current time.
- Number of tickets must be greater than 0.
- Voucher payment: a 12-digit voucher code is required.
- Online payment: the card number must be digits only, 16 digits for
  Visa and Mastercard, 15 digits for American Express.
- The billing email must be valid.
The form is only submitted (POST to the Mercury address) when every
check passes.

Dynamic booking behaviour
- Choosing a movie fills in its ticket price. The total booking cost
  is the price multiplied by the number of tickets.
- Choosing Voucher shows the voucher box. Choosing Online payment
  shows the card box. Only one is visible at a time.
- Choosing American Express limits the card box to 15 digits.
- Ticking "Same as email address" copies the email into the billing
  email box.

Carrying the movie to the booking page
Each Book This Movie link adds the movie name to the address, for
example booking.html?movie=Sky. The booking page reads this with
URLSearchParams and selects the matching movie in the dropdown. The
recommendation results use the same links, so both pages pre-fill
the movie. I chose this approach because it needs no storage and
works with an ordinary link.

Recommendation logic (recommend.html)
Each movie gets points. A genre match adds 3 points, a viewing
preference match adds 2 points, and the age group adds 1 or 2
points depending on the movie's age rating. Movies rated M are
excluded for the Child group. The highest scoring movie is shown as
the top pick and the second highest as another suggestion, so
different choices give different results.

4. KNOWN ISSUES AND LIMITATIONS
-----------------------------------------------------
- Ticket type (Adult, Child, Student) does not change the price. The
  price is fixed for each movie.
- The screening picker accepts any future date and time, not only
  the sessions listed on the movies page.
- Card and voucher numbers are only checked for format. No payment
  is processed.
- The movie details are stored in both the HTML pages and in
  script.js (for the recommendations), so changes must be made in
  both places.
- Movie titles and descriptions are fictional.
home-banner.jpg: By Wernerredilich (n.d.) Empty red cinema seats. Available at: https://pixabay.com/get/g9ee4d3dc3e1c2d835b194f92c2de72c65dfaa5b2e1e10e7cc02cc5fa4a0f1121496ea60431ffa5e10436c15e52877694b9b5d966c53beb7e51afd8086e0614d1c83c22c9f33c32d50dcac791fcdb6c5f_1920.jpg?attachment= (Accessed: 28 October 2026)
movie1.jpg (Sky): by dexmac (n.d.) Clouds in a blue sky. Available at:https://pixabay.com/get/gd2f4ef4bbe5b1634bebd8cedab181038fe12f417adf19d43389c20ea43e5fcd93434d793d214c40edf9c6d04299261de0b338ec17999bd8f29b1ac5c635f26ab34ce472b6e039b9edbba212bcff7956b_1920.jpg?attachment= (Accessed: 28 October 2026).
movie2.jpg (21 Home): by MAKY_OREL (2020) Brick house with dormer windows. Available at: https://pixabay.com/get/ge8a3364b12684d075aea424e7d16c246d792d7b73187c0af095637b0373e7859a84f4dd4115d66ee9b7ad907808e5d69f89261780cfc55c3b4c371195f5142f24bd4f3c98febb9dfde3be9cb9a67fb8c_1920.jpg?attachment= (Accessed: 28 October 2026).
movie3.jpg (Limitless): by Pexels (2016) City skyline at night. Available at:https://pixabay.com/get/g6616314c9dee5165e0b53b5b147dfba1d14c3447fd296582d56569eaec055de21b250cc4b21c3e56251d519c295d7e9ae215f1232cac593bd7d242f25cf0bd5a3aa49744751a396504b666cbc808b23f_1920.jpg?attachment= Accessed: 28 October 2026).
movie4.jpg (Waterman): by anythelion (2019) Surfer on a large wave. Available at: https://pixabay.com/get/g3aee9fdb82abaf54138d16c7ed2e03569a6e5942374f0147cda64780cd039c5f412790055af20d60d4ab2d5f61de5b6fe2537eabddb47a8de533de4c545fe3fb134eeabe60aaf18c7e3be97aa0257e95_1920.jpg?attachment= (Accessed: 28 October 2026).
movie5.jpg (The Dream): by kailingpiano (2016) Grand piano on a concert hall stage. Available at:https://pixabay.com/get/gdce82236141edefe678fde045b70fbfce9ef8664a347070aaecdfbf5ec4c6a698b90e47fa4821d7fa0422cc0b8e70b997f4490a021d281e02f44b7f035882d2cce8e2c40879adc9237f68fca7cf8c7f6_1920.jpg?attachment=  (Accessed: 28 October 2026).
movie6.jpg (Stargaze): by Felix-Mittermeier (2017) Starry night sky through trees. Available at:https://pixabay.com/get/ga0636e0e5578e2ad959ada439b0981549695a4fb5e480f9d502142eb057c24f63739970732cb11b5956b41ef8324c26098636e37d5ff476f54c532282f96c11cf2152ff79f442b3c152931ade0cf5c7a_1920.jpg?attachment= (Accessed: 28 October 2026).
