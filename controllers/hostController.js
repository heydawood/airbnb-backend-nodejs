const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', { pageTitle: 'Add Home to airbnb', currentPage: 'addHome', editing: false });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId, home => {
    if (!home) {
      console.log('Home not found')
      return res.redirect('/host/host-home-list')
    }
    console.log(homeId, editing, home)
    res.render('host/edit-home', { home: home, pageTitle: 'Edit Home', currentPage: 'host-homes', editing: editing });
  })
}


exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, ratings, photoUrl } = req.body;  //destructure
  const home = new Home(houseName, price, location, ratings, photoUrl)
  home.save();
  res.redirect('host/host-home-list');
}

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, ratings, photoUrl } = req.body;  //destructure
  const home = new Home(houseName, price, location, ratings, photoUrl)
  home.id = id;
  home.save();

  res.redirect('/host/host-home-list');
}
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId
  console.log('came to delete', homeId)
  Home.deleteById(homeId, error => {
    if (error) {
      console.log('Error while deleting', error)
    }
    res.redirect('/host/host-home-list');
  })
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


