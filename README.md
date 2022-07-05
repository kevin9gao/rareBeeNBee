_For a live version of RareBeeNBee, click here: [RareBeeNBee](https://rarebeenbee.herokuapp.com/)._

RareBeeNBee is an AirBNB clone that allows its users to browse, discover, upload, and book reservations for rare and common bees across the world.

_For a link to the RareBeeNBee wiki, click here: [Wiki](https://github.com/kevin9gao/rareBeeNBee/wiki)._


## Features and Implementation


### Backend

_Express Based Router_

RareBeeNBee's backend is Express based, using Express based route handlers to handle all backend requests. Express is used to handle CRUD routes, asynchronicity, and backend validations.

_Sequelize Based Database and Models_

RareBeeNBee's database is handled by Sequelize. Sequelize is used to generate the models and associations, and to create new entries in the database.


### Frontend

_React-Redux Based Frontend_

RareBeeNBee is a React based app, utilizing React components, React context, and Redux to handle application state.


### Authentication

_Session-Based Authentication_

RareBeeNBee uses Express session to store and restore user login state, using Express and JWT tokens in the backend to validate and restore logins, and Redux in the frontend to restore login state in the Redux store.

_Features Available Without Logging In_

A user that is not logged in may browse the catalogs of bees that other users have posted. They may view details about the bees, such as name, location, pricing of beecatching sessions, and images of the bees. They may also access the "About" tab, which has information regarding the developer.

_Features Available to Logged In Users_

A logged in user is able to browse different bees, schedule reservations for beecatching sessions (price will vary based on length of stay), and upload their own beecatching spots. Users are able to adjust details for their own bee spots, as well as pricing.


## Notable Features


### Dynamic Reservations


![Dynamic Calendar](./images/rarebeenbee%20dynamic%20reservations.png)

When a user clicks on the start date or end date inputs on the page of a specific bee, a calendar pop up appears that allows the user to select dates while viewing a calendar that is accurate to real time. Based on how long the user's scheduled stay is, the price calculations for the cost of the stay change. If a user sets the start date to before the current date, an error will pop up, saying that that is impossible. Likewise, a similar error appears if a user sets an end date before their start date.


_BookingSidebar Component_

![BookingSidebar Component](./images/rarebeenbee%20bookingsidebar%20component.png)

The _BookingSidebar_ component accomplishes this dynamic rendering of the user's subtotal by using a useEffect that calculates the length of the stay using attributes of the booking, and similarly uses another useEffect that validates the start and end dates, along with whether or not the user is currently logged in.


### Dynamic Previews of Uploaded Bees


![Dynamic Previews](./images/rarebeenbee%20dynamic%20previews.png)

When a logged in user tries to upload a bee, the preview of the bee on the right side of the page will shift from the default image to the uploaded image, if the image link follows the correct format. This image change is dynamic, and will continue to change if the image link changes again.


_NewBeeForm Component_

![NewBeeForm Component 1](./images/rarebeenbee%20newbeeform%20component%201.png)

![NewBeeForm Component 2](./images/rarebeenbee%20newbeeform%20component%202.png)

The _NewBeeForm_ component produces this dynamic rendering of the uploaded bee image by using a useEffect that activates whenever the state variable, _imageUrl_, changes. It checks if the image is in an acceptable format first, then it checks if the field is empty, in which case the default image is restored. The JSX in the return statement of the component renders the image with the source of _sidebarImg_, which is the state variable that changes each time the _imageUrl_ state variable changes.
