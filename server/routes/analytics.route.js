// analytic.route.js
const express = require('express');
const analyticRoutes = express.Router();
const path = require('path');
const fs = require('fs');

// Require Song model in our routes module
let Song = require('../schemas/song.model.js');

const projectRoot = path.resolve(__dirname + '/../../')

// Produce the information about a song
analyticRoutes.post('/played/', function (req, res) {
    Song.findOne({name: req.body.name, category: req.body.category}, function(err, song) {
        if(song) {
            // If the song is found, increment the play_count by 1
            song.increment_play_count();

            // Save the song
            song.save()
            .then(song => {
                res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " added successfully");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });

        } else {
            // Validate that the unique song is acceptable by attempting to find the associated sample *.mp3
            if(fs.existsSync(projectRoot + '/src/assets/audio/samples/' + req.body.category + "/" +  req.body.name)) {
                // If valid, create a new song with the associated sku and set play_count to 1 and all other counts to 0
                let new_song = new Song({name: req.body.name, category: req.body.category, play_count: 1, add_to_cart_count: 0, checkout_count: 0, purchase_count: 0});

                // Save the new song to the database
                new_song.save()
                .then(song => {
                    res.status(200).json({'song': song.name + ' added successfully'});
                })
                .catch(err => {
                    res.status(400).send("Unable to save to database");
                });

            } else {
                res.status(400).send("Invalid song request.");
            }


        }
    })

});

// Update the database when a song is played
analyticRoutes.post('/played/:sku', function (req, res) {

});

// Update the database when a song is added to cart
analyticRoutes.post('/cart_add_item/:sku', function (req, res) {

});

// Update the database when a song is added to checkout
analyticRoutes.post('/checkout_item/:sku', function (req, res) {

});

// Update the database when a song is purchased
analyticRoutes.post('/purchase_item/:sku', function (req, res) {

});



module.exports = analyticRoutes;