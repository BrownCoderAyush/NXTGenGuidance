
const axios = require('axios');
const { User } = require("../models/index");

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require('../config/serverConfig');
const UserService = require('../service/user.service');
const AuthService = require('../service/auth.service');

const authInitializer = (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
}

const authCallback = async (req, res, next) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });


    const email = profile.email;

    const user = await UserService.getUser({ email });

    if (user) {
      const token = AuthService.createToken(user.dataValues);
      res.redirect(`http://localhost:3000/auth/login/success?token=${token}`)
    }else {
      await UserService.createUser({ 
        roleId: 3, 
        email: profile.email, 
        picture: profile.picture,
        password : null 
      });
      const user = await UserService.getUser({ email });
      if (!user) {
        // In this case we will need to redirect to user to frontend and tell them something went wrong
        throw "Couldn't create user";
      }
      const token = AuthService.createToken(user.dataValues);
      res.redirect(`http://localhost:3000/auth/login/success?token=${token}`)
    }
    // Code to handle user authentication and retrieval using the profile data
  } catch (err) {
    res.redirect('/login');
    next(err);
  }
}

const logout = (req, res) => {
  // Code to handle user logout
  res.redirect('/login');
};

module.exports = {
  authCallback,
  authInitializer,
  logout
}