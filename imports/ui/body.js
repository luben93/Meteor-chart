import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { HTTP } from 'meteor/http';
import './task.js';
import './body.html';


Template.body.helpers({
    tasks() {
        return Tasks.find({},{ sort:{createdAt: -1} });
    },
});

Template.body.events({
    'submit .new-task'(event){
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;
        let file = target.file.value;
        HTTP.call("GET", file, {params:{}},function(err,result){
            if(!err){
                console.log("GETted");
                result.toString.split('#').foreach(function(row){
                    console.log("row: "+row)
                })
            }
        });


        Tasks.insert({
            text,
            createdAt: new Date(),
            file,
        });
    },
});
