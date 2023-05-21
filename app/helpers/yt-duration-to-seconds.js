function YTDurationToSeconds(duration) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
    match = match.slice(1).map(function(x) {
      if (x != null) {
          return x.replace(/\D/, '');
      }
    });
  
    var hours = (parseInt(match[0]) || 0);
    var minutes = (parseInt(match[1]) || 0);
    var seconds = (parseInt(match[2]) || 0);
    
    let retorno = '';
    if(hours>0){
        retorno+=hours+':';
    }
    if(minutes>0){
        retorno+=minutes+':';
    }
    if(seconds>0){
        if(seconds<10){
            seconds= '0'+seconds;
        }
        retorno+=seconds;
    }

    console.log(retorno);

    //return hours * 3600 + minutes * 60 + seconds;
    return retorno;
}

module.exports = YTDurationToSeconds;