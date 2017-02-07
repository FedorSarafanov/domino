problemCount=12
var active='.peoples';
var peoples = [
  // {
  //   name: 'Князев', 
  //   class: 9,
  //   bonus: 0,
  //   problems: [1,1,1,3,1,1,0,1,3,1,1,1]
  // },
  // {
  //   name: 'Романов', 
  //   class: 8,
  //   bonus: 0,
  //   problems: [1,1,1,3,1,1,9,1,-3,1,1,1]
  // },
  // {
  //   name: 'Царев', 
  //   class: 8,
  //   bonus: 0,
  //   problems: [1,1,1,3,1,1,9,1,-3,1,1,1]
  // },
  // {
  //   name: 'Королев', 
  //   class: 8,
  //   bonus: 0,
  //   problems: [1,1,1,3,1,1,9,1,-3,1,1,1]
  // }
];

function tableSumm(){
  _.each(peoples, function(element, index, list){
    var summ=0;
    _.each(element.problems, function(problem){
       summ+=problem;
    });
    summ+=element.bonus;
    element.summ=summ;
  });

}

// $('body').on('click', '.create', function(event) {
//   event.preventDefault();

//  $('html, body').animate({
//     scrollTop: $(".table").offset().top,
//     easing: 'linear'
//  }, 600);

// });

function tableDom(){
  _.each(peoples, function(element, index, list){
    $el=$('<tr></tr>');
    $el.append('<th>'+element.class+'</th>');
    $el.append('<th>'+element.name+'</th>');
     $el.append('<td class="bonus" contenteditable index="'+index+'">'+element.bonus+'</td>');
    _.each(element.problems, function(problem, key){
      if (problem<0){
        var cls='bad'
      }else{
        var cls=''
      }
       $el.append('<td contenteditable class="'+cls+'" key="'+key+'" index="'+index+'">'+problem+'</td>');
    })
    $el.append('<th>'+element.summ+'</th>');
    $('tbody').prepend($el);
  })
}


$('body').on('blur', '[contenteditable]', function(){
  if (isNaN(parseInt($(this).text()))){
    var num=0;
  }else{
    var num=parseInt($(this).text());
  }
  if($(this).hasClass('bonus')){
    peoples[$(this).attr('index')].bonus=num;
  }else{
    peoples[$(this).attr('index')].problems[$(this).attr('key')]=num;    
  }
    
  $('tbody').empty();
    tableSumm();
    peoples=_.sortBy(peoples, 'summ');
    tableDom();

})

function $cellSelector($this, keyUp, indexUp){
  var keySelector = '[key='+String(Number($this.attr('key'))+keyUp)+']';
  var indexSelector = '[index='+String(Number($this.attr('index'))+indexUp)+']';  
  if (keyUp===null){
    var keySelector = '[key=0]';    
  }
  if (indexUp===null){
    var indexSelector = '[index=0]';    
  }  
  if (keyUp==='end'){
    var keySelector = '[key="'+(problemCount-1)+'"]';    
  }
  if (indexUp==='first'){
    var indexSelector = '[index="'+(peoples.length-1)+'"]'; 
  }    
  if (indexUp==='end'){
    var indexSelector = '[index=0]';    
  }    
  return $(keySelector+indexSelector);
}


$('body').on('keydown', '[contenteditable]', function(eventObject){

  if (eventObject.which===68){//d
    if ($cellSelector($(this),1,0).length){
      $cellSelector($(this),1,0).trigger('focus')
      $cellSelector($(this),1,0).focus();
    }else{
      $cellSelector($(this),null,-1).trigger('focus')
      $cellSelector($(this),null,-1).focus();
    }    
    return false;
  } else
  if (eventObject.which===65){//a
    if ($cellSelector($(this),-1,0).length){
      $cellSelector($(this),-1,0).trigger('focus')
      $cellSelector($(this),-1,0).focus();
    }else{
      $cellSelector($(this),'end',1).trigger('focus')
      $cellSelector($(this),'end',1).focus();
    }    
    return false;
  } else
  if (eventObject.which===83){//s
    if ($cellSelector($(this),0,-1).length){
      $cellSelector($(this),0,-1).trigger('focus')
      $cellSelector($(this),0,-1).focus();
    }else{
      $cellSelector($(this),0,'first').trigger('focus')
      $cellSelector($(this),0,'first').focus();
    }    
    return false;
  } else
  if (eventObject.which===87){//w
    if ($cellSelector($(this),0,1).length){
      $cellSelector($(this),0,1).trigger('focus')
      $cellSelector($(this),0,1).focus();
    }else{
      $cellSelector($(this),0,'end').trigger('focus')
      $cellSelector($(this),0,'end').focus();
    }    
    return false;
  } 
//   if (eventObject.which===46){//delete
//     $cellSelector($(this),0,0).empty();    
//     return false;
//   }  
  if (eventObject.which===27){//escape
    $(this).blur()
    return false;
  }   
//   if ((eventObject.which===108)||(eventObject.which===189)){//-
//     if ($(this).text()[0]!='-'){
//       $(this).text('-'+$(this).text());
//     }
//     return false;
//   }    
  if (!([48,49,50,51,52,53,54,55,56,57,109,108,189,37,38,39,40,8,46].includes(eventObject.which))){
//   console.log('Клавиша клавиатуры приведена в нажатое состояние. Код вводимого символа - ' + eventObject.which);
    return false;
  }
});

$('#problems').attr('colspan', problemCount);

for (var i = 1; i <= problemCount; i++) {
  $('table thead tr:last-of-type').append('<th>'+i+'</th>');
}

function arrr(len){
  var arr=[]
  for (var i = 1; i <= len; i++) {
    arr.push(0);
  }
  return arr;
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

$('body').on('click', '#add', function(event) {
  if ((!isBlank( $('#name').val()))&&(!isBlank( $('#class').val()))){


  $('#peoples').append('<li><span>'+$('#name').val()+'</span><div class="remove">Удалить</div></li>')
  peoples.push({
    name: $('#name').val(), 
    class: $('#class').val(),
    bonus: 0,
    problems: arrr(problemCount)
  })
  $('#name').val('');
  $('#class').val('');  
  }  
});

$('body').on('click', '#create', function(event) {
  tableSumm();
  peoples=_.sortBy(peoples, 'summ');
  tableDom();
  active='.table';
 $('html, body').animate({
    scrollTop: $(".table").offset().top,
    easing: 'swing'
 }, 400);    
});


$('body').on('click', '.remove', function(event) {
  var namee = $(this).parent().children(":first").text();
  // console.log(namee)
  peoples = _.reject(peoples, {name: namee});
  // console.log(peoples)
   $(this).parent().hide(400, function(){ $(this).remove(); });
});




$(window).on('resize', function(){
 $('html, body').animate({
    scrollTop: $(active).offset().top,
    easing: 'swing'
 }, 400);  
})