const User = require('../model/User.js')
const env = require('../DB')
const jwt = require('jsonwebtoken')

exports.GetAllUser = (req,res)=>{
  User.find({},(err,data)=>{
      if(err) throw err;
          
          res.json(data);
  
      })
}

exports.AddUser =(req,res)=>{
  let us = new User({
      username:req.body.username,
      email:req.body.email,
      password:req.body.password
  });
  us.save((err,result)=>{
      if(err) {
          res.json({"msg":"This User existed, try another email"})
      } else {
          res.json({"msg":"Record user successfully"})
      }
  })
}
exports.DeleteUser = (req,res) =>{ //dont use any in header and body, delete all such as content-type or application.json
  var deleteUser = req.params.email;
  User.deleteOne({email:deleteUser},(err,result)=>{
      if(err) throw err;
      if(result.deletedCount > 0) {
          res.json({"msg":"Delete User successfully"});
      } else {
         res.json({"msg":"Delete User Failed"});
      }
  })
}
exports.UpdateUser = (req,res) =>{
    var updateId = req.body._id;
    var updateUsername = req.body.username;
    var updateEmail = req.body.email;
    User.update({_id:updateId},{$set:{username:updateUsername, email:updateEmail}},(err,result) =>{
        if(err) throw err;
        if(result.nModified > 0) {
            res.json({"msg":"Update User successfully"});
        } else {
            res.json({"msg":"Update User Failed"});
        }
    });
}
exports.register = function (req, res) {
  const { username, email, password, passwordConfirmation } = req.body
  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        username, email, password
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
 }
exports.login = function (req, res) { 
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Invalid user' })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'Wrong email or password' })
    }
  })
}

exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  try {
    if (json_token) {
      const user = parseToken(json_token)
      User.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Not authorized user' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Not authorized user' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err
    })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], env.secret)
}