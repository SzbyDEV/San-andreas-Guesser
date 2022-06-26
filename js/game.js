  function addMarker(e){
    if (userMarker != undefined){
      map.removeLayer(userMarker)
    }
    // Add marker to map at click location;
    if (e.latlng.lat > 0){
      return;
    }else if (e.latlng.lng < 0){
      return;
    }else if (e.latlng.lat < -6000){
      return;
    }else if (e.latlng.lng > 6000){
      return;
    }

    lat = e.latlng.lat;
    lng = e.latlng.lng;
    userMarker = new L.marker(e.latlng,{icon:hereIcon}).addTo(map);
    console.log(userMarker.getLatLng())
    // console.log(random_item(fixedMarkers))
  }
  function randomItem(fixedMarkers){
    return fixedMarkers[Math.floor(Math.random()*fixedMarkers.length)];
  }
  
  function mainFunction(){
    targetPos = randomItem(fixedMarkers);
    document.getElementById("imgLink").innerHTML= "<img src='img/"+ targetPos[2] + "' id='mainImg'>";
    if(!score){
      document.getElementById('score').innerHTML = 0;
    }
    if(!guess){
      document.getElementById('guess').innerHTML = 0;
    }else if(guess == 5){
      var myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
      document.getElementById('guess').innerHTML = sessionStorage.getItem("guess") + "/5";
      document.getElementById('score').innerHTML = sessionStorage.getItem("score");
      document.getElementById('scoreSummary').innerHTML = sessionStorage.getItem("score") + "/2500";
      sessionStorage.setItem("guess",parseInt(0));
    }
    else{
      document.getElementById('guess').innerHTML = sessionStorage.getItem("guess") + "/5";
      document.getElementById('score').innerHTML = sessionStorage.getItem("score");
    }
  }

  function calculate(e){
    score = sessionStorage.getItem("score");
    guess = sessionStorage.getItem("guess");
    if (userMarker == undefined){
      alert("Place your guess first!");
      return;
    }
    if (targetMarker != undefined){
      map.removeLayer(targetMarker);
      location.reload();
      return;
    }
    if(!score){
      score = 0;
    }
    targetMarker = new L.marker(targetPos,{icon:targetBlip}).addTo(map);
    var result = dist(lat,lng,targetPos[0],targetPos[1]);
    guess = ~~guess + 1;
    if(~~result<=500){
      score = ~~score + ~~(500 - result)
    }
    sessionStorage.setItem("score",parseInt(score))>
    sessionStorage.setItem("guess",parseInt(guess));
    document.getElementById('guess').innerHTML = (guess) + "/5";
    document.getElementById('score').innerHTML = (score);
    // console.log(dist(lat,lng,targetPos[0],targetPos[1]));
    var polylinePoints = [
      [lat, lng],
      [targetPos[0], targetPos[1]]
    ];
    var polyline = L.polyline(polylinePoints).addTo(map);
    document.getElementById('distance').innerHTML = (~~result + " meters away from the target");
    document.getElementById('submitButton').innerHTML = ("Next");

  }

  function diff (num1, num2) {
    if (num1 > num2) {
      return (num1 - num2);
    } else {
      return (num2 - num1);
    }
  }
  
  function dist (x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
  } 

  function newGame(){
    sessionStorage.clear();
    location.reload();
    return;
  }