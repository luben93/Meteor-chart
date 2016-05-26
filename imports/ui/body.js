import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { HTTP } from 'meteor/http';
//import Chart from 'chart:chart'
import './task.js';
import './body.html';


Template.body.helpers({
    charts(){
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
    hello(text){console.log("hello"+text)},
    tasks() {
        tmp= Tasks.find({},{ sort:{createdAt: -1} });

       // for (row in tmp){
       //     drawer(tmp.id,tmp.data);
       // }

        return tmp;
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
        console.log(file)

        let id = Tasks.insert({
            text,
            createdAt: new Date(),
            file,
        });
        console.log(id);






        let array= HTTP.call("GET", file,{},function(err,result){
            if(err){
                console.log(err);
            }else{
                //"abc".split("b");
                let str=result.content;
                //console.log("got: "+str);a
                let out = {}
                str.toString().split("#").forEach(function (row){
                    const str = row.toString();
                    const first=str.split(" ")[0];
                    if(!out[first]){
                        //console.log("empty")
                        out[first]=[];
                    }
                    out[first].push(str);
                });
                console.log(out);
                let data = [];
                // out.forEach(function (row){
                //Object.keys(out).forEach(function (row){
                for (row in out){
                    row= row.replace('\n','');
                    row= row.replace('\r','');
                    data.push([row,row.length,"#"]);
                    //data[row]=row.length;
                }
                Tasks.update({_id: id},{$set: {data}});
                console.log(data);
            }
        });



    },
});

// recursive function for counting ver{ with subrecords  } no time to implement, would look in to promise
function recurse(row,index,array) {
    console.log("row: "+row);
    let i=index;
    let tmp=row;

    if(row.indexOf("\n{") > -1 && false){
        let arr=[row];
        while (array[i].indexOf("\n}") < -1 ){
            i++;
            arr.append(array[i]);
        }
        tmp = recurse(arr);
    }
    const name = tmp.toString().split(" ")[0];
    const back= JSON.parse('{"'+name+'":"'+tmp+'"}');
    console.log(back);
    return back;

}

