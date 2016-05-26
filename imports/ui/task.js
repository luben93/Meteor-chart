import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.html';

Template.task.events({
    'click .toggle-checked'(){
        Tasks.update(this._id,{
            $set: { checked: ! this.checked },
        });
    },
    'click .delete'(){
        Tasks.remove(this._id);
    },
});

//Template.task.helpers({console.log(Tasks.find({_id:this._id}));},);
//drawer(this._id,this.data)


function drawer(id,data){
drawChart({
             target: id,
     type: 'BarChart',
     columns: [
       ['string', 'Topping'],
       ['number', 'Slices']
     ],
     rows:data,
     options: {
       'title':'How Much Pizza I Ate Last Night',
       'width':400,
       'height':300
     }
   });
} //*/
