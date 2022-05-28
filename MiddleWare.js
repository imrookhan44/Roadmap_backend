//middleware in node js 

     module.exports =    filterData = (req, res, next) => {
        if (!req.query.age) {
            res.send("please enter age");
        } else if (req.query.age < 18) {
            res.send("you are not eligible to vote");
        }
        else {
            next();
        }
    }
