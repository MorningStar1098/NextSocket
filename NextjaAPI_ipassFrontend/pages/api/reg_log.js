import connectMongo from '../../connect/db1'
import users from '../../model/user'
import customeruser from'../../model/demoAccount'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export default async function Login(req, res) {
    try {
        await connectMongo();

        if (req.method === "POST") {
            const { email, password, firstname, lastname } = req.body;

            if (req.body.action === "register") {
                if (!email || !password || !firstname || !lastname) {
                    return res.status(400).send("All input is required");
                }

                const user = await users.findOne({ email });

                if (user) {
                    return res.status(409).send("User already exists");
                }
                // if (!user || !(await bcrypt.compare(password, user.password))) {
                //   return res.status(401).send("Invalid credentials");
                // }
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new users({ email, password: hashedPassword, firstname, lastname });
                await newUser.save();
                return res.status(201).json(newUser);
            }

            if (req.body.action === "Login") {
        
        const { email, password } = req.body;
        //console.log('work',password)
        // const updateKey = await users.findOneAndUpdate({ email }, key, { new: true });
        const user = await users.findOne({ email });
        const Customer = await customeruser.findOne({ email });
            // console.log('ddd')
          if(user!==null){
        if(user.isSupAdmin=="0"){  
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ user_id: user.id, email, key: secret }, secret,);
                const user2 = user.toObject()
    
                delete user2.password;

                const updateUser=await users.findByIdAndUpdate(user. _id,{
                    temp_token:token   
                },{ useFindAndModify: true, new: true })
                // console.log("dd",updateUser);
                res.status(200).json({ message: updateUser, token: token });
            } else {
                res.status(400).json({ messege: "Invalid Credentials" });
            }
    
        }
    }else{
        // console.log('ccc',Customer.password);
        if(Customer.isSupAdmin=="1"){
            // console.log('ff');
            if(Customer?.issuspended=="1"){
                // console.log('sss');
                res.status(200).json({ message: "Your account is suspended" });
               }else{
            if (Customer && (await bcrypt.compare(password, Customer.password))) {
                const token = jwt.sign({  email, key: process.env.TOKEN_KEY }, process.env.TOKEN_KEY,);
                const Customer2 = Customer.toObject()
    
                delete Customer2.password;
                res.status(200).json({ message: Customer2, token: token });
            } else {
                res.status(400).json({ messege: "Invalid Credentials" });
            }
        }
        }
    }
            }

            return res.status(400).send("Invalid action");
        }

        if (req.method === "PUT") {
            let updateData
            if (req.body.action === "Update") {

                updateData = await users.findByIdAndUpdate(req.query.id, {
                    firstname: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    lastname: req.body.lastname,
                },
                    { useFindAndModify: true, new: true })
                // const updateData = await User.findByIdAndUpdate(req.query.id, req.body, {
                // updateData = await User.updateOne({ _id: req.query.id }, { $set: req.body });

                
                if (updateData) {
                    return res.status(200).json({ message: "Data updated" });
                } else {
                    return res.status(404).json({ message: "Data not found or not updated" });
                }
            }
            return res.status(400).json({ message: "Invalid action" });
        }

        if (req.method === "DELETE") {
            // console.log("id",req.query.id);
            // console.log("action",req.body);    
            if (req.body.action === "Delete") {
                const deletedata = await users.findByIdAndDelete(req.query.id);

                if (deletedata) {
                    return res.status(200).json({
                        data: deletedata,
                        message: "Data deleted",
                    });
                } else {
                    return res.status(404).json({
                        message: "Data not found or not deleted",
                    });
                }
            }

            return res.status(400).json({ message: "Invalid action" });
        }

        return res.status(405).send("Method not allowed");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}