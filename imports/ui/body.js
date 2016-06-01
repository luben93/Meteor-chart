import { Template } from 'meteor/templating';
import { Items } from '../api/items.js';
import { HTTP } from 'meteor/http';
//import Chart from 'chart:chart'
import './item.js';
import './body.html';


Template.body.helpers({
    items() {
        return Items.find({},{ sort:{createdAt: -1} });//list all se charts
    },
});


Template.body.events({
    'submit .new-item'(event){// on submit of form, to upload new se files to parse
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;
        let file = target.file.value;
        if( file == "" ){// if no file was uploaded use default
            file="https://cdn.filestackcontent.com/WnCefCcfQf29qyc3tYNg"
        }

        let id = Items.insert({//save file url to DB
            text,
            createdAt: new Date(),
            file,
        });

        //download file from "the cloud" and log errors or parse the file into nested arrays
        let array= HTTP.call("GET", file,{},function(err,result){
            if(err){
                console.log(err);
            }else{
                let out = {}
                result.content.toString().split("#").forEach(function (row){
                    const str=row.toString();
                    const col = str.split(" ")[0];
                    if(col ==""){
                        return
                    }
                    if(!out[col]){
                        out[col]=0;
                    }
                    out[col]++;
                });
                let data=[];
                for(row in out){
                    data.push([row,out[row]]);
                }
               Items.update({_id: id},{$set: {data}});//save parsed file to DB
               drawer(id,data);//draw uploaded files when paresed
            }
        });
    },
});

