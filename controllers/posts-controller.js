import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userIdParam = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    // change this sql query to get all posts
    const q =
      typeof userIdParam !== "undefined"
        ? `SELECT p.*, u.userId AS userId, username,email FROM posts AS p JOIN users AS u ON (u.userId = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.userId AS userId, username,email FROM posts AS p JOIN users AS u ON (u.userId = p.userId) WHERE p.userId =?
      ORDER BY p.createdAt DESC`;
    // userId !== "undefined"
    //   ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
    //   : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) p.userId =?
    // ORDER BY p.createdAt DESC`;
    // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR
    // console.log(userIdParam);
    // var values
    // if (userIdParam !== undefined) {
    //   console.log("tyson not undefined ");
    //   values = [userIdParam];
    // } if (userIdParam === undefined) {
    //   console.log("tyson undefined ");
    //   values = [userInfo.userId];
    // }

    // const values =
    //   userIdParam !== undefined ? [userIdParam] : [userInfo.userId];
    // or
    const values =
      typeof userIdParam !== "undefined" ? [userIdParam] : [userInfo.userId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
  // const q = `SELECT * FROM posts`;
  // db.query(q, (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   return res.status(200).json(data);
  // });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `postImg`,`userId`,`createdAt`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.image,
      userInfo.userId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};
export const updatePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE posts SET `title`=?,`postImg`=? WHERE postId=? AND userId=? ";
    // const values = [
    //   req.body.title,
    //   req.params.postId,
    //   // userInfo.userId,
    //   // moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), updated At 
    // ];

    db.query(
      q,
      [req.body.title,req.body.image, req.params.postId, userInfo.userId],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0)
          return res.status(200).json("Post has been updated.");
        return res.status(403).json("You can update only your post");
      }
    );
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `postId`= ? AND `userId` = ?";

    db.query(q, [req.params.postId, userInfo.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
