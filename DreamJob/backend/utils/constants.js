module.exports ={
    // databaseName: "findmyjob_test",
    databaseName: "findmyjob",

    userCollection: "user",
    userInfoCollection: "user-info",
    jobCollection:"job",
    chatCollection:"chat",
    applicationCollection:'application',

    uriDatabase: "mongodb+srv://admin:admin@cluster0.ttu0a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

    userPendingStatus:"pending",
    userActiveStatus:"active",

    frontendUrl: "http://localhost:3000"
    // frontendUrl: "https://frontend-omega-sepia.vercel.app"
}