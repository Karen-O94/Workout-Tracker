const db = require("../models");
const router = require("express").Router();

//get workouts
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
