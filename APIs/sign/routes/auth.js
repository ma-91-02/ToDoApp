const express = require("express");
const authController = require("../controllers/auth"); // import auth controller
const { body } = require("express-validator");
const User = require("../models/user");
const router = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *     User:
 *        type: object
 *        required:
 *           - email
 *           - password
 *           - name
 *        properties:
 *          email:
 *            type: string
 *            description: The email to user
 *          password:
 *            type: string
 *            description: The password more than 5
 *          name:
 *            type: string
 *            description: The name can't empty
 *          status:
 *            type: string
 *            description: " I am New "
 *          posts:
 *            type: Schema.Types.ObjectId
 *            ref: Post
 *        example:
 *          email: test@gmail.com
 *          password: 123456
 *          name: mohamed
 */
/**
 * @swagger
 * components:
 *    schemas:
 *     SignupReq:
 *        type: object
 *        required:
 *           - email
 *           - password
 *           - name
 *        properties:
 *          email:
 *            type: string
 *            description: The email to user
 *          password:
 *            type: string
 *            description: The password more than 5
 *          name:
 *            type: string
 *            description: The name can't empty
 *        example:
 *          email: test@gmail.com
 *          password: 123456
 *          name: mohamed
 */
/**
 * @swagger
 * components:
 *    schemas:
 *     SignupRes:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: User created!
 *          userId:
 *            type: string
 *            description: The User Id
 *        example:
 *          message: User created!
 *          userId: 63821171be4468e7f18fc183
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginReq:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email to login
 *         password:
 *           type: string
 *           description: The password to login
 *       example:
 *         email: test@gmail.com
 *         password: 123456
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRes:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The token
 *         userId:
 *           type: string
 *           description: The user Id
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWRAdGVzdC5jb20iLCJ1c2VySWQiOiI2MzdkNjIzZTdiZTA0NWNkZDhmNmMwNWYiLCJpYXQiOjE2Njk0NjkzNjgsImV4cCI6MTY2OTQ3Mjk2OH0.6Mn8TU-JfmPTi40osQV4WoFn9y-3tepGozPSmB0MHvU
 *         userId: 637d623e7be045cdd8f6c05f
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The User to login and sign up API
  */




/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: Add new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SignupReq'
 *    responses:
 *      201:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SignupRes'
 *      500:
 *        description: Some error happened
 */
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginReq'
 *     responses:
 *       200:
 *         description: You are login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginRes'
 *       500:
 *         description: Some server error
 */
router.post("/login", authController.login);
module.exports = router;
