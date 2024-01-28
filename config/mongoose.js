const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://xamdamovdavron6:j24xt200@cluster0.nq6rhoe.mongodb.net/",).then(() => {
    console.log("Connected to mongodb");
}).catch(err => {
    console.log(err);
})
