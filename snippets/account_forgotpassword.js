var forgotPassword = function(email, resetPasswordUrl, callback) {
  var user = Account.findOne({email: email}, function findAccount(err, doc){
    if (err) {
      // Email address is not a valid user
      callback(false);
    } else {
      var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
      resetPasswordUrl += '?account=' + doc._id;
      smtpTransport.sendMail({
        from: 'thisapp@example.com',
        to: doc.email,
        subject: 'Password Request',
        text: 'нажми на меня ^_^ =>: ' + resetPasswordUrl
      }, function forgotPasswordResult(err) {
        if (err) {
          callback(false);
        } else {
          callback(true);
        }
      });
    }
  });
};