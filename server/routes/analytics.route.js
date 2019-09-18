// analytic.route.js
const express = require('express');
const analyticRoutes = express.Router();
const path = require('path');
const fs = require('fs');

// Require Song model in our routes module
let Song = require('../schemas/song.model.js');

const projectRoot = path.resolve(__dirname + '/../../')

// Produce the information for all the songs in a human-readable format
analyticRoutes.get('/all_pretty', function (req, res) {
    Song.find({play_count: {$gt: 0}}, function (err, songs) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(songs, null, 3));
    });
});

// Produces the information for all the songs in a way that's easily readable by the React front-end
analyticRoutes.get('/all', function (req, res) {
    Song.find({play_count: {$gt: 0}}, function (err, songs) {
        res.json(songs);
    });
});

// Produce the information about a song
analyticRoutes.post('/played', function (req, res) {
    Song.findOne({name: req.body.name, category: req.body.category}, function(err, song) {
        if(song) {
            // If the song is found, increment the play_count by 1
            song.increment_play_count();

            // Save the song
            song.save()
            .then(song => {
                res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " song played event saved successfully.");
            })
            .catch(err => {
                res.status(400).send("Unable to save song played event to database.");
            });
        } else {
            // Validate that the unique song is acceptable by attempting to find the associated sample *.mp3
            if(fs.existsSync(projectRoot + '/src/assets/audio/samples/' + req.body.category + "/" +  req.body.name)) {
                // If valid, create a new song with the associated sku and set play_count to 1 and all other counts to 0
                let new_song = new Song({name: req.body.name, category: req.body.category, play_count: 1, add_to_cart_count: 0, checkout_count: 0, purchase_count: 0});

                // Save the new song to the database
                new_song.save()
                .then(song => {
                    res.status(400).send("Unable to save song played event to database.");
                })
                .catch(err => {
                    res.status(400).send("Unable to save song played event to database.");
                });
            } else {
                res.status(400).send("Song Played Event: Invalid song request.");
            }
        }
    })
});

// Update the database when a song is added to cart
analyticRoutes.post('/added_to_cart', function (req, res) {
    Song.findOne({name: req.body.name, category: req.body.category}, function(err, song) {
        if(song) {
            // If the song is found, increment the play_count by 1
            song.increment_add_to_cart_count();

            // Save the song
            song.save()
            .then(song => {
                res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " add to cart event saved successfully.");
            })
            .catch(err => {
                res.status(400).send("Unable to save add to cart event to database.");
            });
        } else {
            // Validate that the unique song is acceptable by attempting to find the associated sample *.mp3
            if(fs.existsSync(projectRoot + '/src/assets/audio/samples/' + req.body.category + "/" +  req.body.name)) {
                // If valid, create a new song with the associated sku and set play_count to 1 and all other counts to 0
                let new_song = new Song({name: req.body.name, category: req.body.category, play_count: 0, add_to_cart_count: 1, checkout_count: 0, purchase_count: 0});

                // Save the new song to the database
                new_song.save()
                .then(song => {
                    res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " add to cart event saved successfully.");
                })
                .catch(err => {
                    res.status(400).send("Unable to save add to cart event to database.");
                });
            } else {
                res.status(400).send("Add to Cart Event: Invalid song request.");
            }
        }
    })
});

// Update the database when a song is added to checkout
analyticRoutes.post('/added_to_checkout', function (req, res) {
    Song.findOne({name: req.body.name, category: req.body.category}, function(err, song) {
        if(song) {
            // If the song is found, increment the play_count by 1
            song.increment_add_to_checkout_count();

            // Save the song
            song.save()
            .then(song => {
                res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " add to checkout event saved successfully.");
            })
            .catch(err => {
                res.status(400).send("Unable to save add to checkout event to database.");
            });
        } else {
            // Validate that the unique song is acceptable by attempting to find the associated sample *.mp3
            if(fs.existsSync(projectRoot + '/src/assets/audio/samples/' + req.body.category + "/" +  req.body.name)) {
                // If valid, create a new song with the associated sku and set play_count to 1 and all other counts to 0
                let new_song = new Song({name: req.body.name, category: req.body.category, play_count: 0, add_to_cart_count: 0, checkout_count: 1, purchase_count: 0});

                // Save the new song to the database
                new_song.save()
                .then(song => {
                    res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " add to checkout event saved successfully.");
                })
                .catch(err => {
                    res.status(400).send("Unable to save add to checkout event to database.");
                });
            } else {
                res.status(400).send("Add to Checkout Event: Invalid song request.");
            }
        }
    })
});

// Update the database when a song is purchased
analyticRoutes.post('/purchased', function (req, res) {
    Song.findOne({name: req.body.name, category: req.body.category}, function(err, song) {
        if(song) {
            // If the song is found, increment the play_count by 1
            song.increment_purchase_count();

            // Save the song
            song.save()
            .then(song => {
                res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " purchase event saved successfully.");
            })
            .catch(err => {
                res.status(400).send("Unable to save purchase event to database.");
            });
        } else {
            // Validate that the unique song is acceptable by attempting to find the associated sample *.mp3
            if(fs.existsSync(projectRoot + '/src/assets/audio/samples/' + req.body.category + "/" +  req.body.name)) {
                // If valid, create a new song with the associated sku and set play_count to 1 and all other counts to 0
                let new_song = new Song({name: req.body.name, category: req.body.category, play_count: 0, add_to_cart_count: 0, checkout_count: 0, purchase_count: 1});

                // Save the new song to the database
                new_song.save()
                .then(song => {
                    res.status(200).send("Category:" + song.category + " Song Name: " + song.name + " purchase event saved successfully.");
                })
                .catch(err => {
                    res.status(400).send("Unable to save purchase event to database.");
                });
            } else {
                res.status(400).send("Purchase Event: Invalid song request.");
            }
        }
    })
});

module.exports = analyticRoutes;