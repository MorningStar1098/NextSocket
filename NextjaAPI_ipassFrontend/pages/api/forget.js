import jwt from 'jsonwebtoken';
import connectMongo from '../../connect/db1'
import customeruser from'../../model/demoAccount'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
const { EMAIL, APP_PASS } = process.env;

// forgot password

export default async function handler(req, res) {
  try {
    await connectMongo();
    if(req.method === 'GET'){

    }
    if (req.method === 'POST') {
      if (req.body.action === 'ForgotPassword') {
        const email = req.body.email;
        const data = await User.findOne({ email }); 
        // console.log("data", data);
        const token = data?.token;

        const mailTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'mailto:rarsh390@gmail.com',
            pass: "xjzn omzb tisl qeku",
          },
        });

        const mailDetails = {
          from: email,
          to: 'mailto:arshrana@csdevhub.com',   
          subject: 'Reset account password', 
          text: 'Node.js testing mail for GeeksforGeeks',
          html: `  
            <html>
              <head>
                <title>Reset account password</title>   
              </head>
              <body>
                <h1>Reset account password</h1>
                <p>This is a friendly notification that you have to change your account password. If you requested this change, click the button below and set a new password.</p>
                <a href="http://localhost:3000/api/forgotpassword?token=${token}">Reset Password</a>
              </body>
            </html>
          `,
        };

        const info = await mailTransporter.sendMail(mailDetails);
        console.log('Email sent successfully', info);
        res.send('Email sent successfully');
      } 
    }
     
    if (req.method === 'POST') {
      if (req.body.action === 'ResetPassword') {
    const { token, password } = req.body;
    console.log( "req",req.body);
      if (token) {

        // let parsToken=token.substring(7,token.length);
        //     const decoded = jwt.decode(parsToken);
        //   console.log("decoded",decoded)
        //   req.user = decoded;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("yyyy", decoded);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.changepassword = true;
        user.changepasswordbydate = Date();
        await user.save();
  
        return res.status(200).json({ message: 'Your password has been changed' });
      } else {
        return res.status(401).json({ error: 'Authentication error' });
      }
    } 
      // else {
      //   return res.status(400).json({ message: 'Invalid action' });
      // }
    }

    if (req.method === 'POST') {
      if (req.body.action === 'UpdatePassword') {
    const { Id, password } = req.body;
    const user = await User.findByIdAndUpdate(Id, {});
    // console.log("user",user);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    await user.save();
    console.log('Password updated successfully');
    res.status(200).json({ message: 'Password updated successfully' });
  } 
  else {
    return res.status(400).json({ message: 'Invalid action' });
  }
    }
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }
   catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

    

