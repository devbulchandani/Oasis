import {check} from "express-validator"

export const registerValitor = [
    check("firstname", "Firstname is required").isString(),
    check("lastname", "Lastname is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({min : 6}),
]