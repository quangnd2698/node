var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  auth: {
    user: 'quangnd02061998@gmail.com',
    pass: 'ns02061998'
  }
});

var mailOptions = {
  from: 'quangnd02061998@gmail.com',
  to: 'quangnd2698@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});