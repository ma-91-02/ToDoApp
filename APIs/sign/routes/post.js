const express = require("express");
const { body } = require("express-validator");
const postControllers = require("../controllers/post");
const isAuth = require("../middleware/is-auth");
const router = express.Router();


/**
 * @swagger
 * components:
 *    schemas:
 *     PostsGet:
 *        type: object
 *        example:
 *          message: Fetched Posts successfully!
 *          posts:
 *            _id: 637e7f81a01f6e9c8a62ca9f
 *            title: First post
 *            creator: 637e7f81a01f6e9c8a62ca9f
 *            createdAt: 2022-11-24T11:28:33.565Z
 *            updatedAt: 2022-11-24T11:28:33.565Z
 *      
 */

/**
 * @swagger
 * components:
 *    schemas:
 *     PostsReq:
 *        type: object
 *        example:
 *            title: First post
 *      
 */
/**
 * @swagger
 * components:
 *    schemas:
 *     PostsRes:
 *        type: object
 *        example:
 *          message: Post created successfully!
 *          posts:
 *            title: First post
 *            creator: 637e7f81a01f6e9c8a62ca9f
 *            _id: 637e7f81a01f6e9c8a62ca9f
 *            createdAt: 2022-11-24T11:28:33.565Z
 *            updatedAt: 2022-11-24T11:28:33.565Z    
 */
/**
 * @swagger
 * components:
 *    schemas:
 *     PostsUpdateRes:
 *        type: object
 *        example:
 *          message: Post updated!!
 *          posts:
 *            _id: 637e7f81a01f6e9c8a62ca9f
 *            title: First post
 *            creator: 637e7f81a01f6e9c8a62ca9f
 *            createdAt: 2022-11-24T11:28:33.565Z
 *            updatedAt: 2022-11-24T11:28:33.565Z    
 */
/**
 * @swagger
 * components:
 *    schemas:
 *     PostDeleteRes:
 *        type: object
 *        example:
 *          message: Deleted post.   
 */


 /**
  * @swagger
  * tags:
  *   name: Posts
  *   description: The Posts managing Get, Delete, Update, and Create API
  */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get All Posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *          description: Fetched Posts
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostsGet'
 *         
 *       404:
 *         description: The post was not found
 */


router.get("/posts", isAuth, postControllers.getPosts);

/**
 * @swagger
 * /posts:
 *  post:
 *    summary: Add new post
 *    tags: [Posts]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostsReq'
 *    responses:
 *      201:
 *        description: Post created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostsRes'
 *      500:
 *        description: Some error happened
 */
router.post(
  "/posts",isAuth,
  [body("title").trim().isLength({ min: 4 })],
  postControllers.createPost
);
/**
 * @swagger
 * /post/{postId}:
 *  put:
 *    summary: Update the Post by the id
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: postId
 *        schema:
 *          type: string
 *        required: true
 *        description: The Post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostsReq'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostsUpdateRes'
 *      404:
 *        description: The post not found
 *      500:
 *        description: Some error happened
 */
router.put(
  '/post/:postId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
  ],
  postControllers.updatePost
);
/**
 * @swagger
 * /post/{postId}:
 *   delete:
 *     summary: Remove the Post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Post id
 * 
 *     responses:
 *       200:
 *         description: The Post was deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostDeleteRes'
 *       404:
 *         description: The Post was not found
 */
router.delete("/post/:postId",isAuth, postControllers.deletePost);

module.exports = router;
