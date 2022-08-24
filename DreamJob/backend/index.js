const express = require('express')
const app = express();
const server = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const config = require("./utils/config")
const socket = require("socket.io");
const http = require("http");


global.appRoot = path.resolve(__dirname);
server.use(config.apiPath, app);

const userRoutes = require("./routes/userRoutes");
const authenticateRoutes = require("./routes/authenticateRoutes");
const resetPasswordRoutes = require("./routes/resetPasswordRoutes");
const cloudRoutes = require("./routes/cloudinary-upload");
const userInfoRoutes = require("./routes/userInfoRoutes");
const jobRoutes = require("./routes/jobRoutes");
const chatRoutes = require("./routes/chatRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const authentication = require("./middleware/authenticate");





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "512kb" }));
app.use(compression());
app.use(express.static("public"));
app.use(cookieParser());

app.use(cors());

app.use(function(req, res, next) {
    if (req.headers["x-forwarded-proto"] && req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
});


app.use(authentication());
app.use("/user",userRoutes);
app.use("/authenticate",authenticateRoutes);
app.use("/reset-password",resetPasswordRoutes);
app.use("/uploads",cloudRoutes);
app.use("/user-info",userInfoRoutes);
app.use("/jobs",jobRoutes);
app.use("/chat",chatRoutes);
app.use("/application",applicationRoutes);




// server.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// });



// const serverChat = http.createServer(app);

const socketServer = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

const io = require('socket.io').listen(socketServer);

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
    });
});



module.exports = app;