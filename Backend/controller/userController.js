const userModel = require('../model/userModel');

exports.ADD = async (req, res) => {
    try {
        const { Firstname,Surname,DateOfBirth,gender,email, password } = req.body;
        const checkEmail = await userModel.findOne({email:email})

        if(checkEmail){
            res.status(400).json({ message: "User Already Exist" });
            return
        }
        const addUser = new  userModel({
            Firstname,Surname,DateOfBirth,gender,email,password
        })
        await addUser.save()
        res.status(200).json("User added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during adding a user" });
    }
};


exports.getAll = async (req, res) => {
    try {
        const getAllUsers = await userModel.find().sort({ Firstname: 1 });
        
        if (getAllUsers.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        
        res.status(200).json(getAllUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred fetching all users data" });
    }
};



exports.updateByemail = async (req, res) => {
    const { Firstname, Surname, DateOfBirth, gender, email, password } = req.body; // New data to update

    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    Firstname: Firstname,
                    Surname: Surname,
                    DateOfBirth: DateOfBirth,
                    gender: gender,
                    password: password
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found with this email' });
        }
        res.status(200).json({message : "User Updated Successfully"})
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: "Can't Update the User" });
    }
};


exports.deleteUser = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOneAndDelete({ email });

        if (user) {
            res.status(200).json({ message: "User deleted successfully", user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the user" });
    }
};

exports.getUserByID = async (req,res) => {
    const {email} = req.body
    try {
        const user = await userModel.findOne({ email:email })
        res.status(200).json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred fetching user's data" });
    }
} 