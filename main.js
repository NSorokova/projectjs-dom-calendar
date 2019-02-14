class Month {
    constructor(name,numberOfDays){
        if( name != undefined && numberOfDays != undefined && name != null && numberOfDays != null  ){
            this.name =  name;
            this.numberOfDays =  numberOfDays;
        }
    }
}

var months =
            [ 
                new Month('January',31),new Month('February',28),new Month('March',31)
                ,new Month('April',30),new Month('May',31),new Month('June',30)
                ,new Month('July',31),new Month('August',31),new Month('September',30)
                ,new Month('October',31),new Month('November',30),new Month('December',31) 
            ];
var currentMonth = months[new Date().getMonth()];
var currentYear  = new Date().getFullYear();


$('#CurrentYear').modify({ 'innerHTML' :  '<span class="prev">&#10094;</span>'+ currentMonth.name+  '<span class="next">&#10095;</span><br><span style="font-size:18px"> <i id="decrY" >&#6132;</i> '+currentYear+'<i id="incrY">&#6129;</i></span>'    })    

$('.prev').setElementsEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) - 1]; rebuildCalendar(); } })
$('.next').setElementsEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) + 1]; rebuildCalendar(); }  })

$('#mainTable').appendToElement('ul',{class:'weekdays'});

$('#mainTableHead').appendToElement('th',{innerText : 'Su'})
                    .appendToElement('th',{innerText : 'Mo'})
                    .appendToElement('th',{innerText : 'Tu'})
                    .appendToElement('th',{innerText : 'We'})
                    .appendToElement('th',{innerText : 'Th'})
                    .appendToElement('th',{innerText : 'Fr'})
                    .appendToElement('th',{innerText : 'Sa'});

var isCurrent = (day) =>{
   return day == new Date().getDate() && months.indexOf(currentMonth) == new Date().getMonth() && currentYear == new Date().getFullYear();
}

var day = 1;
var subDay = 1;
var startingDay =  new Date( months.indexOf(currentMonth)+1 +'-1-'+ currentYear ).getDay();
for(var r = 0;  r < 6 ; r++ ){
    $('#mainTableBody').appendToElement('tr', {id:"r"+r});
    for(var j = 1; j <= 7 ;j++){
        if (subDay <= currentMonth.numberOfDays && ( day > startingDay)) {
            $('#r'+r).appendToElement('td',{ class: isCurrent(subDay)  ? 'active':'' , innerHTML:subDay})
            subDay++;
        }
        else{
            $('#r'+r).appendToElement('td',{ innerHTML: '&nbsp;'})
        }
        day++;
    }
}



$('#incrY').setElementsEventHandler({onclick: () => { currentYear++ ; rebuildCalendar();  } });
$('#decrY').setElementsEventHandler({onclick: () => { currentYear-- ; rebuildCalendar();  } });

$('.liDays').setElementsEventHandler({onclick : (event) => onDayClick(event) } );   



var rebuildCalendar = () => {
    $('#CurrentYear').modify({ 'innerHTML' :  '<span class="prev">&#10094;</span>'+ currentMonth.name+  '<span class="next">&#10095;</span><br><span style="font-size:18px"> <i id="decrY" >&#6132;</i> '+currentYear+'<i id="incrY">&#6129;</i></span>'    })    
    $('#mainTableBody').modify({innerHTML: ''})
    var day = 1;
    var subDay = 1;
    startingDay =  new Date( months.indexOf(currentMonth)+1 +'-1-'+ currentYear ).getDay();
    for(var r = 0;  r < 6 ; r++ ){
        $('#mainTableBody').appendToElement('tr', {id:"r"+r});
        for(var j = 1; j <= 7 ;j++){
            if (subDay <= currentMonth.numberOfDays && ( day > startingDay)) {
                $('#r'+r).appendToElement('td',{ class: isCurrent(subDay) ? 'active':'' , innerHTML:subDay})
                subDay++;
            }
            else{
                $('#r'+r).appendToElement('td',{ innerHTML: '&nbsp;'})
            }
            day++;
        }
    }
    
$('.prev').setElementsEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) - 1]; rebuildCalendar(); } });
$('.next').setElementsEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) + 1]; rebuildCalendar(); }  });

$('#incrY').setElementsEventHandler({onclick: () => { currentYear++ ; rebuildCalendar();  } });
$('#decrY').setElementsEventHandler({onclick: () => { currentYear-- ; rebuildCalendar();  } });
}
