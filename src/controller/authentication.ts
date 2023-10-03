import express from "express";
import {createUser, getUserByEmail} from "../db/user";
import {authentication, random} from "../helper";

/**
 * Handles user registration.
 *
 * @param {express.Request} req - The Express request object containing user data.
 * @param {express.Response} res - The Express response object for sending a response.
 * @returns {Promise<void>} A Promise representing the registration process.
 */
export const register = async (req: express.Request, res: express.Response) => {
  try {
    // Extract user data from the request body
    const { email, password, userName } = req.body;

    // Check for missing fields in the request body
    if (!email || !password || !userName) {
      return res.status(400).json('Missing field');
    }

    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json('User already exists');
    }

    // Generate a random salt for password hashing
    const salt = random();

    // Create a new user with hashed password and salt
    const user = await createUser({
      email,
      userName,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Send a successful registration response with the user object
    return res.status(200).json(user);
  } catch (error) {
    // Handle any errors that occur during registration
    return res.status(400).json('Registration failed');
  }
}


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("field is missing")
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) res.status(400).json("User don't exist");
        if (user.authentication.salt && user.authentication.password) {
          const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) res.status(403).json("password is not correct")
            let salt = random();
            user.authentication.sessionToken = authentication(salt, user._id.toString());
          await user.save();
          res.cookie("SESSIONTOKEN", user.authentication.sessionToken, { domain: "localhost",path:"/" });
          return res.status(200).json(user).end();
        }
    }
    catch (error) {
        return res.status(400);
  }


}