const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render('host/addHome', { pageTitle: 'Add Home to airbnb', currentPage: 'addHome' });
}


exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, ratings, photoUrl } = req.body;  //destructure
  const home = new Home(houseName, price, location, ratings, photoUrl)
  home.save();

  res.render('host/home-added', { pageTitle: 'Home Added Successfully', currentPage: 'homeAdded' });
}

exports.getHostHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
}


