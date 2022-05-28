const dbConnect = require('./Mongodb');


const insert = async () => {
    let db = await dbConnect();
    let res = await db.insert(
        [{ name: "Imran", age: 30 },
        { name: "khan", age: 20 }
        ]
    );
    // if (res.acknowledged) {
    //     console.log("inserted");

    // }

    console.log(res);
}

insert(); 