const express = require("express");
const path = require("path"); // path 모듈 추가

const app = express();
app.set("port", process.env.PORT || 3000);

const connectDB = require("./schemas");
const postRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/kim", (req, res) => {
res.sendFile(path.join(__dirname + "/public/kim.html"));
});

app.get("/chun", (req, res) => {
res.sendFile(path.join(__dirname + "/public/chun.html"));
});

app.get("/park", (req, res) => {
res.sendFile(path.join(__dirname + "/public/park.html"));
});

app.get("/shin", (req, res) => {
res.sendFile(path.join(__dirname + "/public/shin.html"));
});

app.use(express.json());
connectDB();

// public 디렉토리와의 연결을 위한 미들웨어 추가
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/post", postRouter);
app.use("/api/comment", commentsRouter);

app.listen(app.get("port"), () => {
console.log(app.get("port"), "번 포트에서 대기 중");
});