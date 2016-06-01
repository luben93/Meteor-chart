import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { Files } from '../api/files.js';
import { HTTP } from 'meteor/http';
//import Chart from 'chart:chart'
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
        if( file == "" ){
            file="https://cdn.filestackcontent.com/WnCefCcfQf29qyc3tYNg"
        }

        let id = Tasks.insert({
            text,
            createdAt: new Date(),
            file,
        });

        let array= HTTP.call("GET", file,{},function(err,result){
            if(err){
                console.log(err);
            }else{
                let out = {}
                result.content.toString().split("#").forEach(function (row){
                    const str=row.toString();
                    const col = str.split(" ")[0];
                    if(!out[col]){
                        out[col]=Array();
                    }
                    out[col].push(str);
                    console.log(col)
                });
                let data = [];
                let data2= [];
                for (row in out){
                    row= row.replace('\n','');
                    row= row.replace('\r','');
                    length = row.length + 1;
                    data.push([row,length,"#"]);
                    data2.push([row,length]);
                    //console.log(row);
                }
                Tasks.update({_id: id},{$set: {data}});

                drawer(id,data2);

            }
        });
    },
});

