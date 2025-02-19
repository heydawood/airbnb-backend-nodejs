const Favourite = require("../models/favourites");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  const registeredHomes =
    res.render("store/bookings", {
      pageTitle: "My Bookings",
      currentPage: "bookings",
    })
};


exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes= registeredHomes.filter(home => favourites.includes(home.id))
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })
}



exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log('Something went wrong ', error)
    }
  })
  res.redirect("/favourites")
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error =>{
    if(error){
      console.log('Failed to remove from favourites', error)
    }
    res.redirect('/favourites')
  })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId
  Home.findById(homeId, home => {
    if (!home) {
      console.log('Home not found')
      res.redirect('/homes');
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
      })
    }
  })
};
