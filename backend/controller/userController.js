import User from "../model/usermodel.js"




//Post user data API  //Add User
export const create = async (req,res) =>{
    try{
        const newUser = new User(req.body);
        const {email} = newUser;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(404).json({message : "User already exists"})
        }

       const savedData = await newUser.save();
    //    res.status(200).json(savedData); 
      res.status(200).json({message : "User created Successfully"}); 

       
    } catch(error){
        res.status(500).json({errorMessage:error.message})
    }
} 



//Get User data API
export const getAllUsers = async (req,res) =>{
    try{
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({message : "Userdata not found"})
        }
        res.status(200).json(userData);

    }catch(error){
        res.status(500).json({errorMessage:error.message})
    }
}




//Get User by id API
export const getUserById = async (req,res) =>{
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
              return res.status(404).json({message : "User not found"})
        }

        res.status(200).json(userExists);
    } catch (error) {
         res.status(500).json({errorMessage:error.message})
    }
}


//PUT api update user by id
export const update = async (req,res) =>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist || userExist.length === 0){
            return res.status(404).json({message:"user not found"})
        }
        const updatedData = await User.findByIdAndUpdate(id,req.body,{
            new : true
        })
        // res.status(200).json(updatedData);
         res.status(200).json({message : "User Updated Successfully"}); 
    }catch(error){
        res.status(500).json({errorMessage:error.message})
    }
}

// Delete user Api
export const deleteUser = async(req,res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message : "User not found"})
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message : "User deleted successfully"})
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}