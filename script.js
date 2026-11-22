
// 1. GET FORM ELEMENTS

const nameInput = document.getElementById('nameInput');
const ticketInput = document.getElementById('ticketInput');
const standInput = document.getElementById('standInput');
const venueInput = document.getElementById('venueInput');


// 2. GET SUMMARY ELEMENTS

const sumName = document.getElementById('sumName');
const sumTickets = document.getElementById('sumTickets');
const sumStand = document.getElementById('sumStand');
const sumVenue = document.getElementById('sumVenue');
const sumTotal = document.getElementById('sumTotal');


// 3. UPDATE BOOKING SUMMARY

function updateSummary() {

    sumName.innerText = nameInput.value.trim() || '-';

    sumVenue.innerText = venueInput.value.trim() || '-';

    let tickets = Number(ticketInput.value);

    if (ticketInput.value.trim() === '' || !Number.isFinite(tickets)) {
        tickets = 1;
    }

    sumTickets.innerText = tickets;

    let selectedStandText =
        standInput.options[standInput.selectedIndex].text;

    sumStand.innerText = selectedStandText.split('(')[0].trim();

    let standPrice = Number(standInput.value);

    sumTotal.innerText = standPrice * tickets;

}


// 4. LIVE SUMMARY UPDATE

nameInput.addEventListener('input', updateSummary);

ticketInput.addEventListener('input', updateSummary);

standInput.addEventListener('change', updateSummary);

venueInput.addEventListener('input', updateSummary);

updateSummary();


// 5. CLEAR PREVIOUS ERRORS

function clearErrors() {

    document.getElementById('nameError').innerText = '';

    document.getElementById('ticketError').innerText = '';

    document.getElementById('venueError').innerText = '';

    nameInput.classList.remove('input-error');

    ticketInput.classList.remove('input-error');

    venueInput.classList.remove('input-error');

}


// 6. FULL CLIENT-SIDE VALIDATION

function confirmBooking() {

    let isValid = true;

    clearErrors();

    // NAME VALIDATION

    if (nameInput.value.trim().length < 3) {

        document.getElementById('nameError').innerText =
            'Name must be at least 3 characters long.';

        nameInput.classList.add('input-error');

        isValid = false;

    }


    // TICKET QUANTITY VALIDATION

    let tickets = Number(ticketInput.value);

    if (
        ticketInput.value.trim() === '' ||
        !Number.isInteger(tickets) ||
        tickets < 1 ||
        tickets > 10
    ) {

        document.getElementById('ticketError').innerText =
            'Please enter a valid number of tickets (1-10).';

        ticketInput.classList.add('input-error');

        isValid = false;

    }


    // VENUE VALIDATION

    if (venueInput.value.trim() === '') {

        document.getElementById('venueError').innerText =
            'Venue cannot be empty.';

        venueInput.classList.add('input-error');

        isValid = false;

    }


    // SUCCESSFUL BOOKING

    if (isValid) {

        alert('🎉 Ticket Booked Successfully!');

        document.getElementById('bookingForm').reset();

        clearErrors();

        updateSummary();

    }

}


// 7. BOOK BUTTON EVENT

document.getElementById('bookButton').addEventListener(
    'click',
    confirmBooking
);
