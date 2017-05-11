$(document).ready(function() {
  var methods = {
     init : function( options ) {
       return this.each(function() {
         let $this = $(this),
             data = {
               $box: $this.find('.d-events-box'),
               $rowL: $this.find('.d-events-row[data-dir="left"]'),
               $rowR: $this.find('.d-events-row[data-dir="right"]'),
               $fDate: $this.find('.d-foot-date'),
               $rowR: $this.find('.d-events-row[data-dir="right"]'),
               thisOff: $this.find('.d-events-inner').offset()
             };

         data.$lEvents = data.$rowL.find('.d-events-cel');
         data.$rEvents = data.$rowR.find('.d-events-cel');
         data.rowRP = parseInt(data.$rowR.css('padding-left'));
         data.firstEW = data.$lEvents.first().outerWidth(true);
         data.lastEW = data.$rEvents.last().outerWidth(true);
         data.rowW = data.$rowL.outerWidth(true);

         data.changePosEl = function(arr,$el) {
           let data = $el.data('data');
           data.dRange = arr[3]-arr[0];
           data.dateInProc = [0, getProc(arr[1]-arr[0], data.dRange), getProc(arr[2]-arr[0], data.dRange), 100];

           let diffFirst = getProc(data.dateInProc[1], 66),
               diffSecond = getProc(data.dateInProc[2]-33, 66),
               rowRP = data.rowRP+((diffFirst-50));

           data.$lEvents.eq(0).css('width', data.firstEW+((diffSecond-50)));

           let firstEW = data.$lEvents.first().outerWidth(true);

           data.$rowR.css('padding-left', rowRP);
           data.$fDate.eq(0).css('width', rowRP);
           data.$fDate.eq(1).css('width', firstEW-rowRP);
           data.$fDate.eq(2).css('width', data.rowW-(firstEW+data.lastEW)+10);

           let nextDateI = getNext(arr);
           if (nextDateI) {

             let posPrev = data.$fDate.eq(nextDateI-1).offset().left - data.thisOff.left,
                 posThis = data.$fDate.eq(nextDateI).offset().left - data.thisOff.left,
                 blockBias = getPrMonth(arr,data,nextDateI);

            data.$newBlock = $('<div class="d-new-month"></div>').insertBefore($el.find('.d-events-inner').children().first());

             data.$newBlock.css('left', (posThis-posPrev)/2+posPrev+blockBias+5);
           } else {
             data.$newBlock.remove();
           }
         }

         $this.data('data', data);
         data.changePosEl(options, $this);

         function getPrMonth(arr, data, i) {
           var fullD = [new Date(arr[i-1]), new Date(arr[i])],
               dateSize = daysInMonth(fullD[0].getFullYear(), fullD[0].getMonth()+1)-fullD[0].getDate()+fullD[1].getDate(),
               thisProc = getProc(fullD[1].getDate(), dateSize);
           return 50-thisProc;
         }

         function getNext(dates) {

           for (var i = 0; i < dates.length; i++) {
             if (i+1 == dates.length) return;
             if (new Date(dates[i]).getMonth() < new Date(dates[i+1]).getMonth()) return i+1;
           }
         }
         function daysInMonth(month,year) {
              return new Date(year, month, 0).getDate();
          }
       });
     },
     update : function( options ) {

       return this.each(function() {
         $(this).data('data').changePosEl(options, $(this));
        })
     }
   };

   $.fn.dateEvents = function( method ) {

     // логика вызова метода
     if ( methods[method] ) {
       return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
     } else if ( typeof method === 'object' || ! method ) {
       return methods.init.apply( this, arguments );
     } else {
       $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
     }
   };

  let arr = [new Date(2017, 4,15,5).getTime(),new Date(2017, 4,20,5).getTime(),new Date(2017, 4,29,5).getTime(),new Date(2017, 5,5,5).getTime()]
  // let dEvents = new dateEvents($('.d-events'), arr);

  $('.d-events').dateEvents(arr);

  function getProc(num1, num2) {
    return parseInt(num1*100/num2);
  }
});
