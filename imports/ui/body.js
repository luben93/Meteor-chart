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

        target.text.value = '';//clear form
        target.file.value = '';

        //download file from "the cloud" and log errors or parse the file into nested arrays
        let array= HTTP.call("GET", file,{},function(err,result){
            if(err){
                console.log(err);
            }else{
                let out = {}
                result.content.toString().split("#").forEach(function (row){ //create a element for every #
                    const word = row.toString().split(" ")[0].replace("\n","").replace("\r","");// take first word
                    if(word ==""){
                        return // remove empty lines
                    }
                    if(!out[word]){// if first occurrence of word
                        out[word]=0;
                    }
                    out[word]++;// increase count of for that word
                });
                let data=[];
                for(row in out){//create nested array
                    data.push([row,out[row]]);
                }
               Items.update({_id: id},{$set: {data}});//save parsed file to DB
               drawer(id,data);//draw uploaded files when paresed
            }
        });
    },
});

