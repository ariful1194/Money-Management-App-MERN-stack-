const Transaction = require("../model/Transaction");
const passport = require("passport");
const validateTransactionInput = require("../validation/transactionValidation");

const User = require("../model/User");

module.exports = {
  create: (req, res) => {
    let { amount, note, type } = req.body;

    const { errors, isValid } = validateTransactionInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let transaction = new Transaction({
      amount,
      note,
      type,
      owner: req.user._id
    });
    transaction
      .save()
      .then(tran => {
        // .then(tran => {
        //   User.findById(req.user._id)
        //     .then(usr => {
        //       if (type === "income") {
        //         usr.balance = parseInt(usr.balance) + parseInt(amount);
        //         usr.income = parseInt(usr.income) + parseInt(amount);
        //       } else if (type === "expense") {
        //         usr.balance = parseInt(usr.balance) - parseInt(amount);
        //         usr.expense = parseInt(usr.expense) + parseInt(amount);
        //       }
        //       console.log(usr);
        //       usr.transactions.unshift(tran._id);
        //       User.findByIdAndUpdate(usr._id, { $set: usr }, { new: true })
        //         .then(result => {
        //           return res.status(200).json(tran);
        //         })
        //         .catch(err => {
        //           return res.status(400).json(err);
        //         });
        //     })
        //     .catch();
        return res.status(200).json(tran);
      })
      .catch();
  },
  getAll: (req, res) => {
    Transaction.find({ owner: req.user._id })
      .sort({ date: -1 })
      .then(trans => {
        if (trans.length === 0) {
          return res.status(200).json(trans);
        }
        return res.status(200).json(trans);
      })
      .catch();
  },
  getSingleTransation: (req, res) => {
    const id = req.params.transactionId;
    Transaction.findById(id).then(trn => {
      if (!trn) {
        return res.status(201).json({ msg: "Invalid Transaction" });
      }
      return res.status(200).json(trn);
    });
  },
  update: (req, res) => {
    // Ekhane just Transaction ta update hocche but sathe
    // sathe user is income, expanse , balance update hocche na !
    console.log(req.params.transactionId);
    Transaction.findByIdAndUpdate(
      req.params.transactionId,
      { $set: req.body },
      { new: true }
    )
      .then(trans => {
        // console.log(trans);
        return res.status(200).json(trans);
      })
      .catch(err => {
        return res.json(400).json(err);
      });
  },
  remove: (req, res) => {
    let { transactionId } = req.params;
    //console.log(transactionId);
    Transaction.find({ _id: transactionId, owner: req.user.id })
      .then(trans => {
        if (trans.length === 0) {
          return res.status(400).json({ msg: "No Transaction found" });
        }
        Transaction.findByIdAndDelete(transactionId)
          .then(trn => {
            if (!trn) {
              return res.status(400).json({ msg: "Delete wasn't successfull" });
            }
            return res.json(trn);
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  }
};
