import jwt from "jsonwebtoken";

export const genToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    }
    catch (error) {
        console.log(error)

    }
}