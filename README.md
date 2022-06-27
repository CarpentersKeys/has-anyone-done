[![Logo](public/favicon.svg)](https://github.com/CarpentersKeys/greed-game)

### Has Anyone Done..?
A small app that displays a small idea once a day. It uses a simple admin section, exclusively authenticated, to submit those ideas to a database. Every day the client side is statically generated on first visit. At that timing a, hopefully fresh, idea is pulled from the database. On hover the time until the next idea is displayed.
  
[View Demo](https://github.com/CarpentersKeys/greed-game) · [Report Bug](https://github.com/CarpentersKeys/greed-game/issues)

## About The Project 
![Image](public/greed1.png)

([back to top](#top))

### Built With 
* [Next.js](https://nextjs.org/) 
* [React.js](https://reactjs.org/) 
* [Javascript](https://javascript.info/) 
* [MongoDB](https://www.mongodb.com/)

([back to top](#top))

## Check it out!
The [site](https://hasanyonedone.vercel.app/) is hosted on Vercel so please go ahead and take a look around.

## Current State
### Frontend
Very simple, just displays an entry once every day. You can hover to see when the next entry is due.
![Image]()
### Datafetching
After midnight anytime a user makes a request to the site a new entry will be fetched and the page rebuilt in the background. A Temporal polyfill is used to manage the schedule so it's consistent across time zones.
([back to top](#top))
### Admin
Next-Auth secures the admin section and verifies that only registered users are authenticated using middleware. Once authorized a user can access the full list of paginated entries and submit new ones.
### Backend
Next provides a serverless function API in it's framework. These functions appear very similar to a nodejs express app. There is some initial startup time and they can go dormant so cold starts can occur.
### Database
Mongoose provides a client for the MongoDB database. There are a host of different methods to create, read, update, delete the hosted collections.
### Design 
CSS3-variables are leveraged to allow for easy consistent colour branding.
## Future
Improvements could be made to the fetching experience. As it stands, since a user needs to request the page to start the build the first user every day will get a buggy page.

([back to top](#top))

## Contact Joshua - 
joneilltechnical@gmail.com

([back to top](#top))

License Distributed under the MIT License.