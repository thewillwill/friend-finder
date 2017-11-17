// ===============================================================================
// LOAD DATA
// ===============================================================================
var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {

    // API GET Requests

    //A GET route with the url `/api/friends`. Used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // API POST Requests

    //POST route `/api/friends`. Used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
    app.post("/api/friends", function(req, res) {

        //get the scores array from the body object
        var scores = req.body["scores[]"];

        //create a new user object
        var newUser = {
            name: req.body.name,
            photo: req.body.photo,
            scores: scores
        }

        //push a new user to the friendsData array
        friendsData.push(newUser);

        //iterate through the friendsData array (except the last user)

        var leastDiff = 100;
        var bestMatch = 100;
        for (var i = 0; i < friendsData.length - 1; i++) {
            var scoreDiff = 0;
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                scoreDiff += Math.abs(friendsData[i].scores[j] - newUser.scores[j]);

            }

            console.log('scoreDiff', scoreDiff)
            //check if closer match
            if (scoreDiff < leastDiff) {
                //record the new closest score
                leastDiff = scoreDiff;

                //record the new closest match
                bestMatch = friendsData[i];
                console.log('bestMatch', bestMatch.name)

            }

        }

        //return the closest matching friend object to the client side
        res.json(bestMatch);


    });
}