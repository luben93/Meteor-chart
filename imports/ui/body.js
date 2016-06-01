import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { Files } from '../api/files.js';
import { HTTP } from 'meteor/http';
//import Chart from 'chart:chart'
import './task.js';
import './body.html';


Template.body.helpers({
    /*charts(){
         chart = {
     target: 'chart1',
     type: 'BarChart',
     columns: [
       ['string', 'Topping'],
       ['number', 'Slices']
     ],
     rows: [
       ['Mushrooms', 3],
       ['Onions', 1],
       ['Olives', 1],
       ['Zucchini', 1],
       ['Pepperoni', 2]
     ],
     options: {
       'title':'How Much Pizza I Ate Last Night',
       'width':400,
       'height':300
     }
   };
    console.log("chart: "+chart)
   drawChart(chart);

    },
    hello(text){console.log("hello"+text)},*/
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
            file="https://cdn.filestackcontent.com/0W6Ij5YTT3KNAINSfTAO";
        }
        //console.log(file)

        let id = Tasks.insert({
            text,
            createdAt: new Date(),
            file,
        });
        //console.log(id);

        let array= HTTP.call("GET", file,{},function(err,result){
            if(err){
                console.log(err);
            }else{
                let str=result.content;
                let out = {}
                str.toString().split("#").forEach(function (row){
                    const str = row.toString();
                    const first=str.split(" ")[0];
                    if(!out[first]){
                        out[first]=[];
                    }
                    out[first].push(str);
                });
                let data = [];
                let data2= [];
                for (row in out){
                    row= row.replace('\n','');
                    row= row.replace('\r','');
                    data.push([row,row.length,"#"]);
                    data2.push([row,row.length]);
                    console.log(row);
                }
                Tasks.update({_id: id},{$set: {data}});
                console.log(data);

                drawer(id,data2);

            }
        });
    },
});

