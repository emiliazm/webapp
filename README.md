![](https://img.shields.io/badge/Microverse-blueviolet)

# Filmer

> Hello!
Filmer is a website that gives you information about the latest films and shows. Re-creating this website you will see how to give some functionality to your sections and make your website more user-interactive. Also you will see how to use callbacks and promises, proper ES6 syntax, webpack to bundle JavaScript, jest and API.


## Built With

- HTML
- CSS
- JavaScript
- Webpack
- Linters
- Jest

## Getting Started

Setting up this project locally:
#### On your terminal:
- Clone this repository to your computer: git clone git@github.com:emiliazm/leaderboard.git.
- Open the project on your code editor: "cd Todo-list" and "code ."
- Install npm package: npm install.
- Run website: npm run start.


## Live Demo (if available)

[Live Demo Link](https://emiliazm.github.io/webapp/)



### Prerequisites

#### Interfaces
Create your own web application based on an external API. The web app must contain:
- First, you need to find an API so you can base the development of the webapp around it. The API should allow you to:
  - Get a list of items with a unique item id (or generate the unique id).
  - For a given item, get detailed information about it.
- Follow the layout of the wireframes provided. You should personalize the rest of the design including colors, typographies, spacings, etc.
- You should build these interfaces:
  - The home page.
    - When the page loads, the webapp retrieves data from:
    - The selected API and shows the list of items on screen.
    - The Involvement API to show the item likes.
    -  Remember that your page should make only 2 requests:
    -  One to the base API.
    -  And one to the Involvement API.
    -  When the user clicks on the Like button of an item, the interaction is recorded in the Involvement API and the screen is updated.
    -  When the user clicks on the "Comments" button, the Comments popup appears.
    -  When the user clicks on the "Reservations" button, the Reservations popup appears (only for the groups of 3 students).
    -  Home page header and navigation similar to the given mockup.
    -  Home page footer similar to the given mockup.
  - The comments popup.
    -  When the popup loads, the webapp retrieves data from:
      -  The selected API and shows details about the selected item.
      -  The Involvement API to show the item comments.
      -  When the user clicks on the "Comment" button, the data is recorded in the Involvement API and the screen is updated.
- We have counters in all the interfaces that show:
  - The number of items (home).
  - The number of comments (comments popup).

#### Technical set up
 - Set up the repository on GitHub and use Gitflow.
 - Set up webpack.
 - Set up a JavaScript testing library (Jest).


## Authors

👤 **Emilia Zambrano**

- GitHub: [@emiliazm](https://github.com/emiliazm)
- Twitter: [@emilia_zm](https://twitter.com/emilia_zm)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/emilia-zambrano-montero-aa30a611b/)

👤 **Illia Dobrovic**

- GitHub: [@aliveGUY](https://github.com/aliveGUY)
- Twitter: [@Sciborskyy](https://twitter.com/Sciborskyy)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/illia-dubrovin-921a2721b/)


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/emiliazm/webapp/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Microverse README template.

## 📝 License

This project is [MIT](./MIT.md) licensed.
