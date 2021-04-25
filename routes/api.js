const db = require("../models");
const router = require("express").Router();

//This route allows users to get all workouts
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        // console.log("ALL WORKOUTS");
        // console.log(dbWorkout);
        dbWorkout.forEach(workout => { //loop through each workout
            var total = 0;
            workout.exercises.forEach(e => { //loop through exercises in each workout
                total += e.duration; //append total workout num to duration of exercise
            });
            workout.totalDuration = total; //the total duration of exercise 

        });

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// This route allows users to add an exercise
router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findOneAndUpdate(
        { _id: req.params.id }, //find workout at specific id
        {
            $inc: { totalDuration: req.body.duration }, //include total duration
            $push: { exercises: req.body } //push exercise to the json object
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});

//This route allows users to create their workout
router.post("/api/workouts", ({ body }, res) => {
  
    db.Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});


router.get("/api/workouts/range", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});
module.exports = router;