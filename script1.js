// /* ==========================================================================
//    STUDY SPOT — SMART LIBRARY SEAT BOOKING SYSTEM
//    Core JavaScript Application Engine: script.js (Stage 3)
//    Architecture: Vanilla JS, LocalStorage State Management, Event Delegation
//    ========================================================================== */

// document.addEventListener('DOMContentLoaded', () => {

//     /* --------------------------------------------------------------------------
//        1. DATA STRUCTURES & STATIC MOCK DATA
//        -------------------------------------------------------------------------- */
//     const STAGE_QUOTES = [
//         {
//             text: "Small steps every day lead to extraordinary achievements.",
//             author: "Academic Focus Archive"
//         },
//         {
//             text: "Focus is a muscle. The more you practice eliminating distractions, the stronger it gets.",
//             author: "Library Research Insights"
//         },
//         {
//             text: "An investment in knowledge pays the best interest.",
//             author: "Benjamin Franklin"
//         },
//         {
//             text: "Excellence is not an act, but a habit. Make your study session count today.",
//             author: "Scholarly Discipline Code"
//         },
//         {
//             text: "The expert in anything was once a beginner who refused to quit.",
//             author: "Helen Hayes"
//         }
//     ];

//     // Curated Floor 3 Desk Inventory (24 Desks across 3 Zones)
//     const INITIAL_SEATS = [
//         { id: "S-01", code: "01", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
//         { id: "S-02", code: "02", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
//         { id: "S-03", code: "03", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: true },
//         { id: "S-04", code: "04", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
//         { id: "S-05", code: "05", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
//         { id: "S-06", code: "06", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: true },

//         { id: "S-07", code: "07", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
//         { id: "S-08", code: "08", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
//         { id: "S-09", code: "09", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
//         { id: "S-10", code: "10", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: true },
//         { id: "S-11", code: "11", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
//         { id: "S-12", code: "12", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },

//         { id: "S-13", code: "13", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
//         { id: "S-14", code: "14", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: true },
//         { id: "S-15", code: "15", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
//         { id: "S-16", code: "16", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
//         { id: "S-17", code: "17", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
//         { id: "S-18", code: "18", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },

//         { id: "S-19", code: "19", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
//         { id: "S-20", code: "20", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
//         { id: "S-21", code: "21", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
//         { id: "S-22", code: "22", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: true },
//         { id: "S-23", code: "23", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
//         { id: "S-24", code: "24", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false }
//     ];

//     /* --------------------------------------------------------------------------
//        2. APPLICATION STATE
//        -------------------------------------------------------------------------- */
//     let appState = {
//         currentUser: null, // { identifier, name, isGuest }
//         seats: loadSeatsState(),
//         bookings: loadBookingsState(),
//         selectedSeatId: null,
//         currentQuoteIndex: 0
//     };

//     function loadSeatsState() {
//         const saved = localStorage.getItem('study_spot_seats_v1');
//         if (saved) {
//             try { return JSON.parse(saved); } catch (e) { console.error(e); }
//         }
//         return INITIAL_SEATS;
//     }

//     function saveSeatsState() {
//         localStorage.setItem('study_spot_seats_v1', JSON.stringify(appState.seats));
//     }

//     function loadBookingsState() {
//         const saved = localStorage.getItem('study_spot_bookings_v1');
//         if (saved) {
//             try { return JSON.parse(saved); } catch (e) { console.error(e); }
//         }
//         return [];
//     }

//     function saveBookingsState() {
//         localStorage.setItem('study_spot_bookings_v1', JSON.stringify(appState.bookings));
//     }

//     /* --------------------------------------------------------------------------
//        3. DOM ELEMENT REFERENCES
//        -------------------------------------------------------------------------- */
//     const authScreen = document.getElementById('auth-screen');
//     const appRoot = document.getElementById('app-root');
//     const loginForm = document.getElementById('login-form');
//     const loginIdentifierInput = document.getElementById('login-identifier');
//     const loginPasswordInput = document.getElementById('login-password');
//     const togglePasswordBtn = document.getElementById('toggle-password-btn');
//     const togglePasswordIcon = document.getElementById('toggle-password-icon');
//     const guestAccessBtn = document.getElementById('guest-access-btn');
//     const forgotPasswordLink = document.getElementById('forgot-password-link');
//     const authAlertBox = document.getElementById('auth-alert-box');
    
//     const authQuoteText = document.getElementById('auth-quote-text');
//     const authQuoteAuthor = document.getElementById('auth-quote-author');
//     const authQuoteRefreshBtn = document.getElementById('auth-quote-refresh-btn');
    
//     const dashboardQuoteText = document.getElementById('dashboard-quote-text');
//     const dashboardQuoteRefreshBtn = document.getElementById('dashboard-quote-refresh-btn');
    
//     const logoutBtn = document.getElementById('logout-btn');
//     const userDisplayName = document.getElementById('user-display-name');
//     const userAvatarInitials = document.getElementById('user-avatar-initials');
    
//     const navBookingBadge = document.getElementById('nav-booking-badge');
//     const metricAvailableSeats = document.getElementById('metric-available-seats');
//     const metricTotalSeats = document.getElementById('metric-total-seats');
//     const metricUserReservations = document.getElementById('metric-user-reservations');
    
//     const reservationDateInput = document.getElementById('reservation-date');
//     const reservationSlotSelect = document.getElementById('reservation-slot');
//     const zoneFilterSelect = document.getElementById('zone-filter');
//     const seatGridContainer = document.getElementById('seat-grid-container');
    
//     const selectionEmptyState = document.getElementById('selection-empty-state');
//     const selectionDetailsState = document.getElementById('selection-details-state');
//     const ticketSeatNumber = document.getElementById('ticket-seat-number');
//     const ticketZoneName = document.getElementById('ticket-zone-name');
//     const ticketAmenityText = document.getElementById('ticket-amenity-text');
//     const ticketDateText = document.getElementById('ticket-date-text');
//     const ticketSlotText = document.getElementById('ticket-slot-text');
//     const bookingPolicyCheck = document.getElementById('booking-policy-check');
//     const confirmBookingBtn = document.getElementById('confirm-booking-btn');
    
//     const noBookingsPlaceholder = document.getElementById('no-bookings-placeholder');
//     const activePassesGrid = document.getElementById('active-passes-grid');
//     const toastContainer = document.getElementById('toast-container');
//     const navLinks = document.querySelectorAll('.nav-link');

//     /* --------------------------------------------------------------------------
//        4. INITIALIZATION & EVENT LISTENERS
//        -------------------------------------------------------------------------- */
//     function init() {
//         setDefaultDate();
//         renderQuotes();
//         setupEventListeners();
//         checkExistingSession();
//     }

//     function setDefaultDate() {
//         const today = new Date().toISOString().split('T')[0];
//         if (reservationDateInput) {
//             reservationDateInput.value = today;
//             reservationDateInput.min = today;
//         }
//     }

//     function setupEventListeners() {
//         // Quote Refresh
//         if (authQuoteRefreshBtn) authQuoteRefreshBtn.addEventListener('click', cycleQuote);
//         if (dashboardQuoteRefreshBtn) dashboardQuoteRefreshBtn.addEventListener('click', cycleQuote);

//         // Password Show/Hide
//         if (togglePasswordBtn) {
//             togglePasswordBtn.addEventListener('click', () => {
//                 const isPassword = loginPasswordInput.type === 'password';
//                 loginPasswordInput.type = isPassword ? 'text' : 'password';
//                 togglePasswordIcon.textContent = isPassword ? '🙈' : '👁️';
//             });
//         }

//         // Login Form Submission
//         if (loginForm) {
//             loginForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 handleLoginSubmit();
//             });
//         }

//         // Guest Access
//         if (guestAccessBtn) {
//             guestAccessBtn.addEventListener('click', () => {
//                 handleGuestLogin();
//             });
//         }

//         // Forgot Password Demo Alert
//         if (forgotPasswordLink) {
//             forgotPasswordLink.addEventListener('click', () => {
//                 showToast("Demo Mode: Password recovery is simulated. Use any demo password (e.g. 'demo123') or Explore as Guest.", "error");
//             });
//         }

//         // Logout
//         if (logoutBtn) {
//             logoutBtn.addEventListener('click', handleLogout);
//         }

//         // Seat Filters & Controls
//         if (zoneFilterSelect) {
//             zoneFilterSelect.addEventListener('change', renderSeatGrid);
//         }
//         if (reservationDateInput) {
//             reservationDateInput.addEventListener('change', updateTicketPreviewDates);
//         }
//         if (reservationSlotSelect) {
//             reservationSlotSelect.addEventListener('change', updateTicketPreviewDates);
//         }

//         // Confirm Booking Button
//         if (confirmBookingBtn) {
//             confirmBookingBtn.addEventListener('click', handleConfirmBooking);
//         }

//         // Smooth Navigation Scrolling
//         navLinks.forEach(link => {
//             link.addEventListener('click', (e) => {
//                 const targetId = link.getAttribute('data-target');
//                 const targetEl = document.getElementById(targetId);
//                 if (targetEl) {
//                     e.preventDefault();
//                     navLinks.forEach(l => l.classList.remove('active'));
//                     link.classList.add('active');
//                     targetEl.scrollIntoView({ behavior: 'smooth' });
//                 }
//             });
//         });
//     }

//     /* --------------------------------------------------------------------------
//        5. AUTHENTICATION CONTROLLER
//        -------------------------------------------------------------------------- */
//     function checkExistingSession() {
//         const savedUser = sessionStorage.getItem('study_spot_user_v1');
//         if (savedUser) {
//             try {
//                 appState.currentUser = JSON.parse(savedUser);
//                 transitionToDashboard();
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//     }

//     function handleLoginSubmit() {
//         const identifier = loginIdentifierInput.value.trim();
//         const password = loginPasswordInput.value.trim();
//         const identifierError = document.getElementById('identifier-error');
//         const passwordError = document.getElementById('password-error');

//         // Reset errors
//         identifierError.textContent = '';
//         passwordError.textContent = '';
//         authAlertBox.classList.add('hidden');

//         let isValid = true;
//         if (!identifier) {
//             identifierError.textContent = 'Please enter your Registration ID or Email.';
//             isValid = false;
//         }
//         if (!password) {
//             passwordError.textContent = 'Please enter your password.';
//             isValid = false;
//         } else if (password.length < 5) {
//             passwordError.textContent = 'Password must be at least 5 characters for demo.';
//             isValid = false;
//         }

//         if (!isValid) return;

//         // Simulate successful authentication for demo
//         const displayName = identifier.includes('@') ? identifier.split('@')[0].toUpperCase() : `Student (${identifier})`;
//         appState.currentUser = {
//             identifier: identifier,
//             name: displayName.charAt(0) + displayName.slice(1).toLowerCase(),
//             isGuest: false
//         };

//         sessionStorage.setItem('study_spot_user_v1', JSON.stringify(appState.currentUser));
//         showToast(`Welcome back, ${appState.currentUser.name}!`, "success");
//         transitionToDashboard();
//     }

//     function handleGuestLogin() {
//         appState.currentUser = {
//             identifier: "guest@study.spot",
//             name: "Guest Scholar",
//             isGuest: true
//         };
//         sessionStorage.setItem('study_spot_user_v1', JSON.stringify(appState.currentUser));
//         showToast("Logged in successfully as Guest Explorer.", "success");
//         transitionToDashboard();
//     }

//     function handleLogout() {
//         appState.currentUser = null;
//         appState.selectedSeatId = null;
//         sessionStorage.removeItem('study_spot_user_v1');
        
//         appRoot.classList.add('hidden');
//         appRoot.setAttribute('aria-hidden', 'true');
//         authScreen.classList.remove('hidden');
//         document.body.classList.add('auth-active');
        
//         loginForm.reset();
//         showToast("Signed out securely.", "success");
//     }

//     function transitionToDashboard() {
//         authScreen.classList.add('hidden');
//         document.body.classList.remove('auth-active');
//         appRoot.classList.remove('hidden');
//         appRoot.setAttribute('aria-hidden', 'false');

//         // Populate User UI
//         if (userDisplayName) userDisplayName.textContent = appState.currentUser.name;
//         if (userAvatarInitials) {
//             const initials = appState.currentUser.name
//                 .split(' ')
//                 .map(n => n[0])
//                 .join('')
//                 .substring(0, 2)
//                 .toUpperCase();
//             userAvatarInitials.textContent = initials;
//         }

//         renderDashboardMetrics();
//         renderSeatGrid();
//         renderUserBookings();
//     }

//     /* --------------------------------------------------------------------------
//        6. QUOTES ENGINE
//        -------------------------------------------------------------------------- */
//     function cycleQuote() {
//         appState.currentQuoteIndex = (appState.currentQuoteIndex + 1) % STAGE_QUOTES.length;
//         renderQuotes();
//     }

//     function renderQuotes() {
//         const q = STAGE_QUOTES[appState.currentQuoteIndex];
//         if (authQuoteText) authQuoteText.textContent = `“${q.text}”`;
//         if (authQuoteAuthor) authQuoteAuthor.textContent = `— ${q.author}`;
//         if (dashboardQuoteText) dashboardQuoteText.textContent = `“${q.text}”`;
//     }

//     /* --------------------------------------------------------------------------
//        7. SEAT GRID & MAP ENGINE
//        -------------------------------------------------------------------------- */
//     function renderSeatGrid() {
//         if (!seatGridContainer) return;

//         const selectedZone = zoneFilterSelect ? zoneFilterSelect.value : 'all';
//         seatGridContainer.innerHTML = '';

//         const filteredSeats = appState.seats.filter(seat => {
//             if (selectedZone === 'all') return true;
//             return seat.zone === selectedZone;
//         });

//         if (filteredSeats.length === 0) {
//             seatGridContainer.innerHTML = `<p class="empty-hint" style="grid-column: span 6; text-align: center; padding: 20px;">No desks found in this specific zone category.</p>`;
//             return;
//         }

//         filteredSeats.forEach(seat => {
//             const isSelected = appState.selectedSeatId === seat.id;
//             const tile = document.createElement('div');
            
//             let statusClass = 'seat-tile--available';
//             let statusText = 'Available';
//             let iconSymbol = '🪑';

//             if (seat.isBooked) {
//                 statusClass = 'seat-tile--booked';
//                 statusText = 'Reserved';
//                 iconSymbol = '🔒';
//             } else if (isSelected) {
//                 statusClass = 'seat-tile--selected';
//                 statusText = 'Selected';
//                 iconSymbol = '⭐';
//             }

//             tile.className = `seat-tile ${statusClass}`;
//             tile.setAttribute('role', 'radio');
//             tile.setAttribute('aria-checked', isSelected ? 'true' : 'false');
//             tile.setAttribute('tabindex', seat.isBooked ? '-1' : '0');
//             tile.setAttribute('data-seat-id', seat.id);

//             tile.innerHTML = `
//                 <span class="seat-tile-icon" aria-hidden="true">${iconSymbol}</span>
//                 <span class="seat-tile-code">Desk ${seat.code}</span>
//                 <span class="seat-tile-status">${statusText}</span>
//                 <span class="seat-tile-zone">${seat.zone === 'silent' ? 'Silent' : seat.zone === 'pod' ? 'Pod' : 'Collab'}</span>
//             `;

//             if (!seat.isBooked) {
//                 tile.addEventListener('click', () => {
//                     selectSeat(seat.id);
//                 });
//                 tile.addEventListener('keydown', (e) => {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                         e.preventDefault();
//                         selectSeat(seat.id);
//                     }
//                 });
//             }

//             seatGridContainer.appendChild(tile);
//         });

//         renderDashboardMetrics();
//     }

//     function selectSeat(seatId) {
//         const seat = appState.seats.find(s => s.id === seatId);
//         if (!seat || seat.isBooked) return;

//         appState.selectedSeatId = seatId;
//         renderSeatGrid();
//         showBookingSummary(seat);
//     }

//     function showBookingSummary(seat) {
//         if (!selectionEmptyState || !selectionDetailsState) return;

//         selectionEmptyState.classList.add('hidden');
//         selectionDetailsState.classList.remove('hidden');

//         if (ticketSeatNumber) ticketSeatNumber.textContent = `Desk ${seat.code}`;
//         if (ticketZoneName) ticketZoneName.textContent = seat.zoneName;
//         if (ticketAmenityText) ticketAmenityText.textContent = seat.amenity;
        
//         updateTicketPreviewDates();
//     }

//     function updateTicketPreviewDates() {
//         if (!ticketDateText || !ticketSlotText) return;
        
//         const dateVal = reservationDateInput ? reservationDateInput.value : new Date().toISOString().split('T')[0];
//         const slotVal = reservationSlotSelect ? reservationSlotSelect.options[reservationSlotSelect.selectedIndex].text : 'Afternoon Slot';

//         // Format date nicely
//         try {
//             const formattedDate = new Date(dateVal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//             ticketDateText.textContent = formattedDate;
//         } catch (e) {
//             ticketDateText.textContent = dateVal;
//         }

//         ticketSlotText.textContent = slotVal.split(' ')[0] + ' ' + slotVal.split(' ')[1];
//     }

//     /* --------------------------------------------------------------------------
//        8. BOOKING CONFIRMATION & PASS MANAGEMENT
//        -------------------------------------------------------------------------- */
//     function handleConfirmBooking() {
//         if (!appState.selectedSeatId) {
//             showToast("Please select an available desk first.", "error");
//             return;
//         }

//         if (bookingPolicyCheck && !bookingPolicyCheck.checked) {
//             showToast("You must agree to the Library Code of Conduct to proceed.", "error");
//             return;
//         }

//         const seat = appState.seats.find(s => s.id === appState.selectedSeatId);
//         if (!seat || seat.isBooked) {
//             showToast("This desk is no longer available. Please select another.", "error");
//             return;
//         }

//         const dateVal = reservationDateInput ? reservationDateInput.value : new Date().toISOString().split('T')[0];
//         const slotKey = reservationSlotSelect ? reservationSlotSelect.value : 'afternoon';
//         const slotText = reservationSlotSelect ? reservationSlotSelect.options[reservationSlotSelect.selectedIndex].text : 'Afternoon';

//         // Generate unique reference ID
//         const refCode = `LPU-LIB-${Math.floor(100000 + Math.random() * 900000)}`;

//         const newBooking = {
//             id: refCode,
//             seatId: seat.id,
//             seatCode: seat.code,
//             zoneName: seat.zoneName,
//             amenity: seat.amenity,
//             date: dateVal,
//             slotKey: slotKey,
//             slotText: slotText,
//             timestamp: new Date().toISOString()
//         };

//         // Mark seat as booked in current session
//         seat.isBooked = true;
//         saveSeatsState();

//         // Add to user bookings
//         appState.bookings.unshift(newBooking);
//         saveBookingsState();

//         // Reset Selection
//         appState.selectedSeatId = null;
//         selectionDetailsState.classList.add('hidden');
//         selectionEmptyState.classList.remove('hidden');

//         renderSeatGrid();
//         renderUserBookings();
//         renderDashboardMetrics();

//         showToast(`Pass Confirmed! Ref: ${refCode}`, "success");
//     }

//     function cancelBooking(bookingId) {
//         const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
//         if (bookingIndex === -1) return;

//         const booking = appState.bookings[bookingIndex];

//         // Free up the seat in inventory
//         const seat = appState.seats.find(s => s.id === booking.seatId);
//         if (seat) {
//             seat.isBooked = false;
//             saveSeatsState();
//         }

//         // Remove booking
//         appState.bookings.splice(bookingIndex, 1);
//         saveBookingsState();

//         renderSeatGrid();
//         renderUserBookings();
//         renderDashboardMetrics();

//         showToast(`Pass ${booking.id} cancelled successfully.`, "success");
//     }

//     function renderUserBookings() {
//         if (!activePassesGrid || !noBookingsPlaceholder) return;

//         const totalUserBookings = appState.bookings.length;
//         if (navBookingBadge) navBookingBadge.textContent = totalUserBookings;
//         if (metricUserReservations) metricUserReservations.textContent = totalUserBookings;

//         if (totalUserBookings === 0) {
//             noBookingsPlaceholder.classList.remove('hidden');
//             activePassesGrid.classList.add('hidden');
//             activePassesGrid.innerHTML = '';
//             return;
//         }

//         noBookingsPlaceholder.classList.add('hidden');
//         activePassesGrid.classList.remove('hidden');
//         activePassesGrid.innerHTML = '';

//         appState.bookings.forEach(booking => {
//             const card = document.createElement('div');
//             card.className = 'pass-card';

//             card.innerHTML = `
//                 <div>
//                     <div class="pass-card-header">
//                         <span class="pass-ref-code">${booking.id}</span>
//                         <span class="pass-status-pill">Active Pass</span>
//                     </div>
//                     <h3 class="pass-seat-title">Desk ${booking.seatCode}</h3>
//                     <ul class="pass-meta-list">
//                         <li><strong>Zone:</strong> ${booking.zoneName}</li>
//                         <li><strong>Date:</strong> ${booking.date}</li>
//                         <li><strong>Slot:</strong> ${booking.slotText}</li>
//                         <li><strong>Tech:</strong> ${booking.amenity}</li>
//                     </ul>
//                 </div>
//                 <div class="pass-card-actions">
//                     <button type="button" class="btn--cancel-pass" data-booking-id="${booking.id}">
//                         Cancel Pass
//                     </button>
//                 </div>
//             `;

//             const cancelBtn = card.querySelector('.btn--cancel-pass');
//             cancelBtn.addEventListener('click', () => {
//                 cancelBooking(booking.id);
//             });

//             activePassesGrid.appendChild(card);
//         });
//     }

//     function renderDashboardMetrics() {
//         const availableCount = appState.seats.filter(s => !s.isBooked).length;
//         const totalCount = appState.seats.length;

//         if (metricAvailableSeats) metricAvailableSeats.textContent = availableCount;
//         if (metricTotalSeats) metricTotalSeats.textContent = totalCount;
//     }

//     /* --------------------------------------------------------------------------
//        9. NOTIFICATION TOAST SYSTEM
//        -------------------------------------------------------------------------- */
//     function showToast(message, type = 'success') {
//         if (!toastContainer) return;

//         const toast = document.createElement('div');
//         toast.className = `toast toast--${type}`;
        
//         const icon = type === 'success' ? '✅' : '⚠️';
//         toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

//         toastContainer.appendChild(toast);

//         setTimeout(() => {
//             toast.style.opacity = '0';
//             toast.style.transform = 'translateX(100%)';
//             toast.style.transition = 'all 0.3s ease';
//             setTimeout(() => toast.remove(), 300);
//         }, 4000);
//     }

//     // Run Initialization
//     init();
// });


/* ==========================================================================
   STUDY SPOT — SMART LIBRARY SEAT BOOKING SYSTEM
   Core JavaScript Application Engine: script.js (Stage 3)
   Architecture: Vanilla JS, LocalStorage State Management, Event Delegation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. DATA STRUCTURES & STATIC MOCK DATA
       -------------------------------------------------------------------------- */
    const STAGE_QUOTES = [
        {
            text: "Small steps every day lead to extraordinary achievements.",
            author: "Academic Focus Archive"
        },
        {
            text: "Focus is a muscle. The more you practice eliminating distractions, the stronger it gets.",
            author: "Library Research Insights"
        },
        {
            text: "An investment in knowledge pays the best interest.",
            author: "Benjamin Franklin"
        },
        {
            text: "Excellence is not an act, but a habit. Make your study session count today.",
            author: "Scholarly Discipline Code"
        },
        {
            text: "The expert in anything was once a beginner who refused to quit.",
            author: "Helen Hayes"
        }
    ];

    // Curated Floor 3 Desk Inventory (24 Desks across 3 Zones)
    const INITIAL_SEATS = [
        { id: "S-01", code: "01", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
        { id: "S-02", code: "02", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
        { id: "S-03", code: "03", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: true },
        { id: "S-04", code: "04", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
        { id: "S-05", code: "05", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
        { id: "S-06", code: "06", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: true },

        { id: "S-07", code: "07", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
        { id: "S-08", code: "08", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
        { id: "S-09", code: "09", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
        { id: "S-10", code: "10", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: true },
        { id: "S-11", code: "11", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
        { id: "S-12", code: "12", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },

        { id: "S-13", code: "13", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
        { id: "S-14", code: "14", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: true },
        { id: "S-15", code: "15", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
        { id: "S-16", code: "16", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
        { id: "S-17", code: "17", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
        { id: "S-18", code: "18", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },

        { id: "S-19", code: "19", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
        { id: "S-20", code: "20", zone: "silent", zoneName: "Deep Silent Zone (Window)", amenity: "Dual 230V + USB-C Hub", isBooked: false },
        { id: "S-21", code: "21", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: false },
        { id: "S-22", code: "22", zone: "pod", zoneName: "Individual Focus Pod", amenity: "Ergonomic Mesh Chair + Desk Lamp", isBooked: true },
        { id: "S-23", code: "23", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false },
        { id: "S-24", code: "24", zone: "collab", zoneName: "Collaborative Cubicle", amenity: "Shared Whiteboard + LAN Port", isBooked: false }
    ];

    /* --------------------------------------------------------------------------
       2. APPLICATION STATE
       -------------------------------------------------------------------------- */
    let appState = {
        currentUser: null, // { identifier, name, isGuest }
        seats: loadSeatsState(),
        bookings: loadBookingsState(),
        selectedSeatId: null,
        currentQuoteIndex: 0
    };

    function loadSeatsState() {
        const saved = localStorage.getItem('study_spot_seats_v1');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return INITIAL_SEATS;
    }

    function saveSeatsState() {
        localStorage.setItem('study_spot_seats_v1', JSON.stringify(appState.seats));
    }

    function loadBookingsState() {
        const saved = localStorage.getItem('study_spot_bookings_v1');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return [];
    }

    function saveBookingsState() {
        localStorage.setItem('study_spot_bookings_v1', JSON.stringify(appState.bookings));
    }

    /* --------------------------------------------------------------------------
       3. DOM ELEMENT REFERENCES
       -------------------------------------------------------------------------- */
    const authScreen = document.getElementById('auth-screen');
    const appRoot = document.getElementById('app-root');
    const loginForm = document.getElementById('login-form');
    const loginIdentifierInput = document.getElementById('login-identifier');
    const loginPasswordInput = document.getElementById('login-password');
    const togglePasswordBtn = document.getElementById('toggle-password-btn');
    const togglePasswordIcon = document.getElementById('toggle-password-icon');
    const guestAccessBtn = document.getElementById('guest-access-btn');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const authAlertBox = document.getElementById('auth-alert-box');
    
    const authQuoteText = document.getElementById('auth-quote-text');
    const authQuoteAuthor = document.getElementById('auth-quote-author');
    const authQuoteRefreshBtn = document.getElementById('auth-quote-refresh-btn');
    
    const dashboardQuoteText = document.getElementById('dashboard-quote-text');
    const dashboardQuoteRefreshBtn = document.getElementById('dashboard-quote-refresh-btn');
    
    const logoutBtn = document.getElementById('logout-btn');
    const userDisplayName = document.getElementById('user-display-name');
    const userAvatarInitials = document.getElementById('user-avatar-initials');
    
    const navBookingBadge = document.getElementById('nav-booking-badge');
    const metricAvailableSeats = document.getElementById('metric-available-seats');
    const metricTotalSeats = document.getElementById('metric-total-seats');
    const metricUserReservations = document.getElementById('metric-user-reservations');
    
    const reservationDateInput = document.getElementById('reservation-date');
    const reservationSlotSelect = document.getElementById('reservation-slot');
    const zoneFilterSelect = document.getElementById('zone-filter');
    const seatGridContainer = document.getElementById('seat-grid-container');
    
    const selectionEmptyState = document.getElementById('selection-empty-state');
    const selectionDetailsState = document.getElementById('selection-details-state');
    const ticketSeatNumber = document.getElementById('ticket-seat-number');
    const ticketZoneName = document.getElementById('ticket-zone-name');
    const ticketAmenityText = document.getElementById('ticket-amenity-text');
    const ticketDateText = document.getElementById('ticket-date-text');
    const ticketSlotText = document.getElementById('ticket-slot-text');
    const bookingPolicyCheck = document.getElementById('booking-policy-check');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');
    
    const noBookingsPlaceholder = document.getElementById('no-bookings-placeholder');
    const activePassesGrid = document.getElementById('active-passes-grid');
    const toastContainer = document.getElementById('toast-container');
    const navLinks = document.querySelectorAll('.nav-link');

    // View Switching Elements
    const mapView = document.getElementById('seat-map-view');
    const formView = document.getElementById('booking-form-view');
    const proceedToFormBtn = document.getElementById('proceed-to-form-btn');
    const backToMapBtn = document.getElementById('backToMapBtn');
    const formSelectedDeskLabel = document.getElementById('form-selected-desk-label');

    /* --------------------------------------------------------------------------
       4. INITIALIZATION & EVENT LISTENERS
       -------------------------------------------------------------------------- */
    function init() {
        setDefaultDate();
        renderQuotes();
        setupEventListeners();
        checkExistingSession();
    }

    function setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        if (reservationDateInput) {
            reservationDateInput.value = today;
            reservationDateInput.min = today;
        }
    }

    function setupEventListeners() {
        // Quote Refresh
        if (authQuoteRefreshBtn) authQuoteRefreshBtn.addEventListener('click', cycleQuote);
        if (dashboardQuoteRefreshBtn) dashboardQuoteRefreshBtn.addEventListener('click', cycleQuote);

        // Password Show/Hide
        if (togglePasswordBtn) {
            togglePasswordBtn.addEventListener('click', () => {
                const isPassword = loginPasswordInput.type === 'password';
                loginPasswordInput.type = isPassword ? 'text' : 'password';
                togglePasswordIcon.textContent = isPassword ? '🙈' : '👁️';
            });
        }

        // Login Form Submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleLoginSubmit();
            });
        }

        // Guest Access
        if (guestAccessBtn) {
            guestAccessBtn.addEventListener('click', () => {
                handleGuestLogin();
            });
        }

        // Forgot Password Demo Alert
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', () => {
                showToast("Demo Mode: Password recovery is simulated. Use any demo password (e.g. 'demo123') or Explore as Guest.", "error");
            });
        }

        // Logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

        // Seat Filters & Controls
        if (zoneFilterSelect) {
            zoneFilterSelect.addEventListener('change', renderSeatGrid);
        }
        if (reservationDateInput) {
            reservationDateInput.addEventListener('change', updateTicketPreviewDates);
        }
        if (reservationSlotSelect) {
            reservationSlotSelect.addEventListener('change', updateTicketPreviewDates);
        }

        // View Switching: Proceed to Form
        if (proceedToFormBtn && mapView && formView) {
            proceedToFormBtn.addEventListener('click', () => {
                mapView.classList.add('hidden');
                formView.classList.remove('hidden');
            });
        }

        // View Switching: Back to Map
        if (backToMapBtn && mapView && formView) {
            backToMapBtn.addEventListener('click', () => {
                formView.classList.add('hidden');
                mapView.classList.remove('hidden');
            });
        }

        // Confirm Booking Button
        if (confirmBookingBtn) {
            confirmBookingBtn.addEventListener('click', handleConfirmBooking);
        }

        // Smooth Navigation Scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('data-target');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. AUTHENTICATION CONTROLLER
       -------------------------------------------------------------------------- */
    function checkExistingSession() {
        const savedUser = sessionStorage.getItem('study_spot_user_v1');
        if (savedUser) {
            try {
                appState.currentUser = JSON.parse(savedUser);
                transitionToDashboard();
            } catch (e) {
                console.error(e);
            }
        }
    }

    function handleLoginSubmit() {
        const identifier = loginIdentifierInput.value.trim();
        const password = loginPasswordInput.value.trim();
        const identifierError = document.getElementById('identifier-error');
        const passwordError = document.getElementById('password-error');

        identifierError.textContent = '';
        passwordError.textContent = '';
        authAlertBox.classList.add('hidden');

        let isValid = true;
        if (!identifier) {
            identifierError.textContent = 'Please enter your Registration ID or Email.';
            isValid = false;
        }
        if (!password) {
            passwordError.textContent = 'Please enter your password.';
            isValid = false;
        } else if (password.length < 5) {
            passwordError.textContent = 'Password must be at least 5 characters for demo.';
            isValid = false;
        }

        if (!isValid) return;

        const displayName = identifier.includes('@') ? identifier.split('@')[0].toUpperCase() : `Student (${identifier})`;
        appState.currentUser = {
            identifier: identifier,
            name: displayName.charAt(0) + displayName.slice(1).toLowerCase(),
            isGuest: false
        };

        sessionStorage.setItem('study_spot_user_v1', JSON.stringify(appState.currentUser));
        showToast(`Welcome back, ${appState.currentUser.name}!`, "success");
        transitionToDashboard();
    }

    function handleGuestLogin() {
        appState.currentUser = {
            identifier: "guest@study.spot",
            name: "Guest Scholar",
            isGuest: true
        };
        sessionStorage.setItem('study_spot_user_v1', JSON.stringify(appState.currentUser));
        showToast("Logged in successfully as Guest Explorer.", "success");
        transitionToDashboard();
    }

    function handleLogout() {
        appState.currentUser = null;
        appState.selectedSeatId = null;
        sessionStorage.removeItem('study_spot_user_v1');
        
        appRoot.classList.add('hidden');
        appRoot.setAttribute('aria-hidden', 'true');
        authScreen.classList.remove('hidden');
        document.body.classList.add('auth-active');
        
        loginForm.reset();
        showToast("Signed out securely.", "success");
    }

    function transitionToDashboard() {
        authScreen.classList.add('hidden');
        document.body.classList.remove('auth-active');
        appRoot.classList.remove('hidden');
        appRoot.setAttribute('aria-hidden', 'false');

        if (userDisplayName) userDisplayName.textContent = appState.currentUser.name;
        if (userAvatarInitials) {
            const initials = appState.currentUser.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();
            userAvatarInitials.textContent = initials;
        }

        renderDashboardMetrics();
        renderSeatGrid();
        renderUserBookings();
    }

    /* --------------------------------------------------------------------------
       6. QUOTES ENGINE
       -------------------------------------------------------------------------- */
    function cycleQuote() {
        appState.currentQuoteIndex = (appState.currentQuoteIndex + 1) % STAGE_QUOTES.length;
        renderQuotes();
    }

    function renderQuotes() {
        const q = STAGE_QUOTES[appState.currentQuoteIndex];
        if (authQuoteText) authQuoteText.textContent = `“${q.text}”`;
        if (authQuoteAuthor) authQuoteAuthor.textContent = `— ${q.author}`;
        if (dashboardQuoteText) dashboardQuoteText.textContent = `“${q.text}”`;
    }

    /* --------------------------------------------------------------------------
       7. SEAT GRID & MAP ENGINE
       -------------------------------------------------------------------------- */
    function renderSeatGrid() {
        if (!seatGridContainer) return;

        const selectedZone = zoneFilterSelect ? zoneFilterSelect.value : 'all';
        seatGridContainer.innerHTML = '';

        const filteredSeats = appState.seats.filter(seat => {
            if (selectedZone === 'all') return true;
            return seat.zone === selectedZone;
        });

        if (filteredSeats.length === 0) {
            seatGridContainer.innerHTML = `<p class="empty-hint" style="grid-column: span 6; text-align: center; padding: 20px;">No desks found in this specific zone category.</p>`;
            return;
        }

        filteredSeats.forEach(seat => {
            const isSelected = appState.selectedSeatId === seat.id;
            const tile = document.createElement('div');
            
            let statusClass = 'seat-tile--available';
            let statusText = 'Available';
            let iconSymbol = '🪑';

            if (seat.isBooked) {
                statusClass = 'seat-tile--booked';
                statusText = 'Reserved';
                iconSymbol = '🔒';
            } else if (isSelected) {
                statusClass = 'seat-tile--selected';
                statusText = 'Selected';
                iconSymbol = '⭐';
            }

            tile.className = `seat-tile ${statusClass}`;
            tile.setAttribute('role', 'radio');
            tile.setAttribute('aria-checked', isSelected ? 'true' : 'false');
            tile.setAttribute('tabindex', seat.isBooked ? '-1' : '0');
            tile.setAttribute('data-seat-id', seat.id);

            tile.innerHTML = `
                <span class="seat-tile-icon" aria-hidden="true">${iconSymbol}</span>
                <span class="seat-tile-code">Desk ${seat.code}</span>
                <span class="seat-tile-status">${statusText}</span>
                <span class="seat-tile-zone">${seat.zone === 'silent' ? 'Silent' : seat.zone === 'pod' ? 'Pod' : 'Collab'}</span>
            `;

            if (!seat.isBooked) {
                tile.addEventListener('click', () => {
                    selectSeat(seat.id);
                });
                tile.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectSeat(seat.id);
                    }
                });
            }

            seatGridContainer.appendChild(tile);
        });

        renderDashboardMetrics();
    }

    function selectSeat(seatId) {
        const seat = appState.seats.find(s => s.id === seatId);
        if (!seat || seat.isBooked) return;

        appState.selectedSeatId = seatId;
        renderSeatGrid();
        showBookingSummary(seat);

        // Update desk label for booking form view
        if (formSelectedDeskLabel) {
            formSelectedDeskLabel.textContent = `Desk ${seat.code}`;
        }
    }

    function showBookingSummary(seat) {
        if (!selectionEmptyState || !selectionDetailsState) return;

        selectionEmptyState.classList.add('hidden');
        selectionDetailsState.classList.remove('hidden');

        if (ticketSeatNumber) ticketSeatNumber.textContent = `Desk ${seat.code}`;
        if (ticketZoneName) ticketZoneName.textContent = seat.zoneName;
        if (ticketAmenityText) ticketAmenityText.textContent = seat.amenity;
        
        updateTicketPreviewDates();
    }

    function updateTicketPreviewDates() {
        if (!ticketDateText || !ticketSlotText) return;
        
        const dateVal = reservationDateInput ? reservationDateInput.value : new Date().toISOString().split('T')[0];
        const slotVal = reservationSlotSelect ? reservationSlotSelect.options[reservationSlotSelect.selectedIndex].text : 'Afternoon Slot';

        try {
            const formattedDate = new Date(dateVal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            ticketDateText.textContent = formattedDate;
        } catch (e) {
            ticketDateText.textContent = dateVal;
        }

        ticketSlotText.textContent = slotVal.split(' ')[0] + ' ' + slotVal.split(' ')[1];
    }

    /* --------------------------------------------------------------------------
       8. BOOKING CONFIRMATION & SUCCESS ANIMATION MODAL
       -------------------------------------------------------------------------- */
    function handleConfirmBooking() {
        if (!appState.selectedSeatId) {
            showToast("Please select an available desk first.", "error");
            return;
        }

        if (bookingPolicyCheck && !bookingPolicyCheck.checked) {
            showToast("You must agree to the Library Code of Conduct to proceed.", "error");
            return;
        }

        const seat = appState.seats.find(s => s.id === appState.selectedSeatId);
        if (!seat || seat.isBooked) {
            showToast("This desk is no longer available. Please select another.", "error");
            return;
        }

        const dateVal = reservationDateInput ? reservationDateInput.value : new Date().toISOString().split('T')[0];
        const slotKey = reservationSlotSelect ? reservationSlotSelect.value : 'afternoon';
        const slotText = reservationSlotSelect ? reservationSlotSelect.options[reservationSlotSelect.selectedIndex].text : 'Afternoon';

        const refCode = `LPU-LIB-${Math.floor(100000 + Math.random() * 900000)}`;

        const newBooking = {
            id: refCode,
            seatId: seat.id,
            seatCode: seat.code,
            zoneName: seat.zoneName,
            amenity: seat.amenity,
            date: dateVal,
            slotKey: slotKey,
            slotText: slotText,
            timestamp: new Date().toISOString()
        };

        seat.isBooked = true;
        saveSeatsState();

        appState.bookings.unshift(newBooking);
        saveBookingsState();

        appState.selectedSeatId = null;
        if (selectionDetailsState) selectionDetailsState.classList.add('hidden');
        if (selectionEmptyState) selectionEmptyState.classList.remove('hidden');

        renderSeatGrid();
        renderUserBookings();
        renderDashboardMetrics();

        // Switch back to map view & reset form
        if (formView && mapView) {
            formView.classList.add('hidden');
            mapView.classList.remove('hidden');
        }

        // Trigger Success Animation Modal
        showSuccessAnimationModal(refCode, seat.code);
    }

    function showSuccessAnimationModal(refCode, seatCode) {
        const existingModal = document.getElementById('successModalOverlay');
        if (existingModal) existingModal.remove();

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'successModalOverlay';
        modalOverlay.className = 'success-modal-overlay';

        modalOverlay.innerHTML = `
            <div class="success-modal-card">
                <div class="success-checkmark-circle">🎉</div>
                <h3 class="success-modal-title">Seat Booked Successfully!</h3>
                <p class="success-modal-desc">Your pass for <strong>Desk ${seatCode}</strong> has been confirmed.<br>Reference ID: <span style="color: var(--color-burgundy-primary); font-weight: 700;">${refCode}</span></p>
                <button type="button" id="closeSuccessModalBtn" class="btn btn--primary btn--full">View My Passes</button>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        const closeBtn = document.getElementById('closeSuccessModalBtn');
        closeBtn.addEventListener('click', () => {
            modalOverlay.remove();
            const myBookingsSection = document.getElementById('my-bookings');
            if (myBookingsSection) {
                myBookingsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    function cancelBooking(bookingId) {
        const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) return;

        const booking = appState.bookings[bookingIndex];

        const seat = appState.seats.find(s => s.id === booking.seatId);
        if (seat) {
            seat.isBooked = false;
            saveSeatsState();
        }

        appState.bookings.splice(bookingIndex, 1);
        saveBookingsState();

        renderSeatGrid();
        renderUserBookings();
        renderDashboardMetrics();

        showToast(`Pass ${booking.id} cancelled successfully.`, "success");
    }

    function renderUserBookings() {
        if (!activePassesGrid || !noBookingsPlaceholder) return;

        const totalUserBookings = appState.bookings.length;
        if (navBookingBadge) navBookingBadge.textContent = totalUserBookings;
        if (metricUserReservations) metricUserReservations.textContent = totalUserBookings;

        if (totalUserBookings === 0) {
            noBookingsPlaceholder.classList.remove('hidden');
            activePassesGrid.classList.add('hidden');
            activePassesGrid.innerHTML = '';
            return;
        }

        noBookingsPlaceholder.classList.add('hidden');
        activePassesGrid.classList.remove('hidden');
        activePassesGrid.innerHTML = '';

        appState.bookings.forEach(booking => {
            const card = document.createElement('div');
            card.className = 'pass-card';

            card.innerHTML = `
                <div>
                    <div class="pass-card-header">
                        <span class="pass-ref-code">${booking.id}</span>
                        <span class="pass-status-pill">Active Pass</span>
                    </div>
                    <h3 class="pass-seat-title">Desk ${booking.seatCode}</h3>
                    <ul class="pass-meta-list">
                        <li><strong>Zone:</strong> ${booking.zoneName}</li>
                        <li><strong>Date:</strong> ${booking.date}</li>
                        <li><strong>Slot:</strong> ${booking.slotText}</li>
                        <li><strong>Tech:</strong> ${booking.amenity}</li>
                    </ul>
                </div>
                <div class="pass-card-actions">
                    <button type="button" class="btn--cancel-pass" data-booking-id="${booking.id}">
                        Cancel Pass
                    </button>
                </div>
            `;

            const cancelBtn = card.querySelector('.btn--cancel-pass');
            cancelBtn.addEventListener('click', () => {
                cancelBooking(booking.id);
            });

            activePassesGrid.appendChild(card);
        });
    }

    function renderDashboardMetrics() {
        const availableCount = appState.seats.filter(s => !s.isBooked).length;
        const totalCount = appState.seats.length;

        if (metricAvailableSeats) metricAvailableSeats.textContent = availableCount;
        if (metricTotalSeats) metricTotalSeats.textContent = totalCount;
    }

    /* --------------------------------------------------------------------------
       9. NOTIFICATION TOAST SYSTEM
       -------------------------------------------------------------------------- */
    function showToast(message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        
        const icon = type === 'success' ? '✅' : '⚠️';
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Run Initialization
    init();
});