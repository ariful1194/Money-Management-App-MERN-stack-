//login controller
const User = require("../model/User");
const Reset = require("../model/Reset");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");
const nodemailer = require("nodemailer");
const validateRegisterInput = require("../validation/registerValidation");
const validateLoginInput = require("../validation/loginValidation");
const validateEmailInput = require("../validation/passwordEmailValidation");
const validateConfirmInput = require("../validation/matchPasswordValidation");
module.exports = {
  login: (req, res) => {
    // Extract data from request
    // validate data
    // Check for user availablity
    // Compare given password
    // Genarate Token and response back

    let { email, password } = req.body;

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email })
      .then(user => {
        if (!user) {
          errors.email = "There Is No User Assigned By This Email!";
          return res.status(400).json(errors);
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              res.status(400).json(err);
            }
            if (!result) {
              errors.email = "Invalid email or password!";
              return res.status(400).json(errors);
            }
            let token = jwt.sign(
              {
                _id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance,
                income: user.income,
                expense: user.expense
              },
              require("../config/Keys").secretOrKey,
              { expiresIn: "2h" }
            );
            res.status(201).json({ token: `Bearer ${token}` });
          });
        }
      })
      .catch();
  },
  register: (req, res) => {
    //read client data

    let { name, email, password, password2 } = req.body;

    //validate user data

    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //check duplicate user
    User.findOne({ email })
      .then(user => {
        if (user) {
          errors.email = "Email Already Exists!";
          return res.status(400).json(errors);
        } else {
          bcrypt.hash(password, 11, (err, hash) => {
            if (err) {
              return res.status(500).json({ message: "server error occurd!" });
            } else {
              let newUser = new User({
                name,
                email,
                password: hash,
                balance: 0,
                expense: 0,
                income: 0,
                transaction: []
              });
              newUser
                .save()
                .then(user => {
                  return res.status(201).json(user);
                })
                .catch(err => res.json(500).json(err));
            }
          });
        }
      })
      .catch(err => res.json(500).json(err));
    //new user object
    //save to database
    //response back with new data
  },
  allUser: (req, res) => {
    User.find()
      .then(users => {
        if (!users) {
          return res.status(500).json({ msg: "No User Found!" });
        }
        return res.status(200).json(users);
      })
      .catch();
  },
  singleUser: (req, res) => {
    User.findById(req.params.id)
      .then(u => {
        if (u) {
          return res.status(200).json(u);
        }
      })
      .catch(err => console.log(err));
  },
  resetLink: (req, res) => {
    const { email } = req.body;
    User.find({ email })
      .then(usr => {
        if (usr.length === 0) {
          return res.status(400).json({ msg: "No User Found" });
        }
        const random = uuid();
        const resetLink = `http://localhost:3000/passwordreset/${random}`;
        const resetObj = new Reset({
          userId: usr[0]._id,
          random
        });
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "arif.softron@gmail.com",
            pass: require("../config/Keys").pass
          }
        });

        const mailOptions = {
          from: "arif.softron@gmail.com", // sender address
          to: usr[0].email, // list of receivers
          subject: "Password Reset", // Subject line
          html: `<p> <a href=${resetLink}>Your Password reset Link is</a></p>` // plain text body
        };
        transporter.sendMail(mailOptions, function(err, info) {
          console.log("gmail");
          if (err) console.log(err);
          else console.log(info);
        });

        resetObj
          .save()
          .then(rs => {
            if (!rs) {
              return res.status(400).json({ msg: "reset link not save" });
            }
            return res.status(200).json(rs);
          })
          .catch();
      })
      .catch();
  },
  reset: (req, res) => {
    let { new_password, confirm_new_passowrd } = req.body,
      body;
    console.log(new_password, confirm_new_passowrd);
  },
  getResetLink: (req, res) => {
    console.log(req.params.random);
  },
  check: (req, res) => {
    Reset.findOne({ random: req.params.random })
      .then(user => {
        let errors = {};
        if (!user) {
          errors.notfound = "NOT valid Url!";
          return res.status(400).json({ errors });
        }
        return res.status(200).json(user);
      })
      .catch();
  },
  resetEmail: (req, res) => {
    const { errors, isValid } = validateEmailInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          errors.email = "Not A Registired Email";
          return res.status(400).json(errors);
        }
        const random = uuid();
        const resetLink = `http://localhost:3000/passwordreset/${random}`;
        const resetObj = new Reset({
          userId: user._id,
          random
        });
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "arif.softron@gmail.com",
            pass: require("../config/Keys").pass
          }
        });

        const mailOptions = {
          from: "arif.softron@gmail.com", // sender address
          to: user.email, // list of receivers
          subject: "Password Reset", // Subject line
          html: `<p> <a href=${resetLink}> Click Here To Password Reset</a></p>` // plain text body
        };
        transporter.sendMail(mailOptions, function(err, info) {
          console.log("gmail");
          if (err) console.log(err);
          else console.log(info);
        });
        resetObj
          .save()
          .then(rs => {
            if (!rs) {
              return res.status(400).json({ msg: "reset link not save" });
            }
            return res.status(200).json(rs);
          })
          .catch();
      })
      .catch();
  },
  resetPassword: (req, res) => {
    const { errors, isValid } = validateConfirmInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Reset.findOne({ random: req.body.random })
      .then(reset => {
        if (!reset) {
          return res.status(400).json({ msg: "no reset link found" });
        }
        // return res.status(200).json(reset);
        User.findOne({ _id: reset.userId })
          .then(user => {
            if (!user) {
              return res.status(400).json({ msg: "no User found" });
            }
            bcrypt.hash(req.body.password, 11, (err, hash) => {
              console.log(hash);
              if (err) {
                return res
                  .status(500)
                  .json({ message: "server error occurd!" });
              } else {
                User.findByIdAndUpdate(
                  user._id,
                  { $set: { password: hash } },
                  { new: true }
                ).then(up => {
                  if (!up) {
                    return res.status(400).json({ msg: " not updated" });
                  }
                  Reset.findOneAndDelete({ random: req.body.random })
                    .then(dl => {
                      return res.status(200).json(up);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
              }
            });
          })
          .catch();
      })
      .catch();
  }
};
