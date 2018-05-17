jQuery(document).ready(function() {
	//localStorage.clear();
		  jQuery('.toggle').click(function(){
        jQuery('.disable').toggle(function(){
          if(jQuery(this).css('display')=='none'){
  				      jQuery(this).css('display')=='block';
  			  }else{
                jQuery(this).css('display')=='none';
  			  }
        });
      });

      jQuery('.content-opener').click(function(e){
        e.preventDefault();
          jQuery('.main-content').siblings('div').not(jQuery(this).toggleClass('open').next('div').fadeToggle('slow')).fadeOut('fast');
      });

      jQuery('#list').change(
        function() {
            var source = document.getElementById("formula");
            var link = document.getElementById("image_maximizer_link");
            var value = jQuery('#list option:selected').val();
            
            jQuery('#formula').css("display", "block");
            jQuery('#image_maximizer_link').css("display", "inline-block");
            source.src = value;
            link.href = value;
        }
      );

	var count = 0, stored;
	//For storing a name of an HTML file
	var location = window.location.href.split('/').length - 1;
	
	if(window.location.href.split('/')[location] != "index.html" && window.location.href.split('/')[location] != "statistics.html"){
	    //TODO
		var date = new Date();
	    var timeObj = { sec:date.getSeconds(), min:date.getMinutes(), hr:date.getHours() };
	    var i;

	    //Checking if we have already assigned in sessionStorage urls(HTML files with its indexes, example (key:0, value: index.html))
	    //if not, assigning to an empty index its value

	    for(var urlCount = -1; urlCount < sessionStorage.length && urlCount != 6;){
	    	
	    	urlCount++;
	    	//if(sessionStorage.length == 6)

	    	if(sessionStorage.getItem(sessionStorage.key(urlCount)) == null || sessionStorage.getItem(sessionStorage.key(urlCount)) == '' || sessionStorage.getItem(sessionStorage.key(urlCount)) == 'undefined')
			{	
				sessionStorage.setItem(urlCount, window.location.href.split('/')[location]);
			}
			//if the page file(index.html) is equal to what the session storage has, then we assign an index of it to the localstorage to assign the timer values
			if(window.location.href.split('/')[location] == sessionStorage.getItem(sessionStorage.key(urlCount))){
		    	i = sessionStorage.key(urlCount);
		    	console.log('i = '+ i);
		    	console.log('page = '+ sessionStorage.getItem(sessionStorage.key(urlCount)));
		    	break;
		    }
		}

		localStorage.setItem('t1'+i, JSON.stringify(timeObj));
		console.log(localStorage.getItem('t1'+i));
	    
	    setInterval(function() {
		    count++;  
			console.log(count);
		}, 1000);

		jQuery('.right-nav, .left-nav').click(function(){
				date = new Date();
				timeObj = { sec:date.getSeconds(), min:date.getMinutes(), hr:date.getHours() };
		        localStorage.setItem('t2'+i, JSON.stringify(timeObj));
		        localStorage.setItem('seconds' + i, count);
		        console.log(localStorage.getItem('t2'+i));
		});
	}

	var time1, time2;

	if(window.location.href.split('/')[location] == "statistics.html")
	{
			for(var a=0; a < sessionStorage.length; a++){
				time1 = JSON.parse(localStorage.getItem('t1'+a));
				time2 = JSON.parse(localStorage.getItem('t2'+a));
				jQuery('.result')[a].append(localStorage.getItem(localStorage.key(a)) + ' секунд потрачено на контент ' + 'Тн = ' + time1.hr + ':' + time1.min + ':' + time1.sec + ' Тк = ' + time2.hr + ':' + time2.min + ':' + time2.sec);
			}
	}
});


