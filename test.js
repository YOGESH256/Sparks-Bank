const mongoose = require("mongoose");
const Customer = require("./models/user");

mongoose.connect("mongodb+srv://admin-khatri25:Jatin123@cluster0.haoz3.mongodb.net/bankDB", { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("error", err);
    });
const v = async () => {
    await Customer.deleteMany({});
    await Customer.insertMany([{
        username: "Yogesh Khatri", email: "yoge123@gmail.com", Balance: 500,  contact: 4567891231, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ."
    }, {
        username: "Shyam singh", email: "shyam.singgmail.com", Balance: 500, contact: 7712400440, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    }, {
        username: "Vatsu sharma", email: "karmaana@gmail.com", Balance: 500,  contact: 8823324064, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    },
    {
        username: "varun saxena", email: "saxena123@gmail.com", Balance: 500,  contact: 7790422189, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam."
    },
    {
        username: "Jeet Patel", email: "Jeet_Patel@gmail.com", Balance: 500,  contact: 6631123098, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    },
    {
        username: "Dhiraj Shri", email: "Dhiraj12.shri@gmail.com", Balance: 500,  contact: 8234580971, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam ipsum."
    },
    {
        username: "raman mehul", email: "raman56mehul@gmail.com", Balance: 500, contact: 2098453187, about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam molestias, ab temporibus natus maiores soluta quis inventore debitis modi nesciunt? Nam ullam."
    }]);
};

v();
