# ticketBooking
## Everest Engineering coding challenge

### Functionality of the app:
- This console-based bus ticket booking app takes the input including number of passengers, each passenger details and payment method, in the following format:
```
1
A 21 F
B 22 F
card
```
It gives the following output on successful seat booking:
```
Total Amount: 517.4
Seats alloted: S10 S11
```
Following output when unsuccessful:
```
Sorry, seats not available
```
### Features:
- books consecutive seats for groups if available
- books seat adjacent to same gender, and if not possible, asks for confirmation with non-confirming seat

### Tools:
- nodeJS, Javascript

### Development practices:
- TDD using Jest
