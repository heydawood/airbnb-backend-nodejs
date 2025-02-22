const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', { pageTitle: 'Add Home to airbnb', currentPage: 'addHome', editing: false });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId)
    .then(home => {
      if (!home) {
        console.log('Home not found')
        return res.redirect('/host/host-home-list')
      }
      console.log(homeId, editing, home)
      res.render('host/edit-home', { home: home, pageTitle: 'Edit Home', currentPage: 'host-homes', editing: editing });
    })
}


exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, ratings, photoUrl, description } = req.body;  //destructure
  const home = new Home(houseName, price, location, ratings, photoUrl, description)
  home.save().then(()=>{
    console.log('Home saved sucessfully')
  });
  res.redirect('host-home-list');
}

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, ratings, photoUrl, description } = req.body;  //destructure
  const home = new Home(houseName, price, location, ratings, photoUrl, description, id)
  home.save().then(result =>{
    console.log('Home Updated ',result)
  });

  res.redirect('/host/host-home-list');
}
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId
  console.log('came to delete', homeId)
  Home.deleteById(homeId)
    .then(() => {
      res.redirect('/host/host-home-list');
    }).catch(error=>{
      console.log('Failed to delete house ', error)
    })
}

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll()
    .then(registeredHomes => {
      res.render("host/host-home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Host Homes List",
        currentPage: "host-homes",
      })
    });
}


