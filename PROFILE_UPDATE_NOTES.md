# Profile / Cart / Booking Update

- Fixed direct Account Details opening so the saved address loads.
- Removed the unused React Router navigation import from AccountModal.
- Added saved-address selection before booking.
- Added a booking-review step before Razorpay opens.
- The selected address is verified server-side against the logged-in user.
- Orders now store a delivery-address snapshot.
- Razorpay checkout is prefilled with the saved name and phone.
- Existing Express/MongoDB API architecture is preserved.
- Existing Navbar Account Details wiring is preserved.

Validation:
- Server JavaScript files were syntax-checked with Node.
- The Vite production build could not be run because Vite was not installed in the uploaded project; dependency installation timed out in the environment.
