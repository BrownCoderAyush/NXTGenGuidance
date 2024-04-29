
const axios = require('axios');
const { User }= require("../models/index");

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} = require('../config/serverConfig');
const UserService = require('../service/user.service');

const authInitializer =  (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
}

const authCallback = async (req, res) => {
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

      const user = await UserService.getUser({email});

      if(user){
        
      }else{
        
      }

  
      console.log(profile, user);
  
      // Code to handle user authentication and retrieval using the profile data
  
      res.redirect('/');
    } catch (error) {
      console.error('Error:', error.response.data.error);
      res.redirect('/login');
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