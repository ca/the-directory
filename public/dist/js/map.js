var markerClusterer = null;
            var map = null;
            var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&' +
              'chco=FFFFFF,008CFF,000000&ext=.png';

            function refreshMap() {
              if (markerClusterer) {
                markerClusterer.clearMarkers();
              }

              var markers = [];
              var infowindow = new google.maps.InfoWindow();
              options = {
                cssClass: 'custom-pin'
              };

              var markerImage = new google.maps.MarkerImage(imageUrl,
                new google.maps.Size(24, 32));

              for (var i = 0; i < 50; ++i) {
                var latLng = new google.maps.LatLng(data.photos[i].latitude,
                  data.photos[i].longitude)
                var marker = new google.maps.Marker({
                  position: latLng,
                  draggable: false,
                  icon: 'dist/images/pin-1.png' //markerImage
                });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                  return function() {
                    var content = '<div class="card lis-brd-light text-center text-lg-left lis-info lis-relative"><a href="#"><div class="lis-grediant grediant-tb-light lis-relative modImage rounded"><img src="' + data.photos[i].photo_file_url +
                      '" class="img-fluid rounded" width="300"></div><div class="lis-absolute lis-left-20 lis-top-20 lis-bg4 lis-icon lis-rounded-circle-50 text-center"><h4 class="text-white mb-0 lis-line-height-2_5"><i class="icofont icofont-fast-food"></i></h4></div></a><div class="hover-text lis-absolute lis-left-20 lis-bottom-20 lis-font-roboto text-white text-left"><h6 class="text-white mb-0">' +
                      data.photos[i].photo_title + '</h6></div></div>';
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                  }
                })(marker, i));

                markers.push(marker);
              }
              markerClusterer = new MarkerClusterer(map, markers, {
                maxZoom: 16,
                gridSize: 100,
                imagePath: 'dist/images/m'
              });
              google.maps.event.addListener(MarkerClusterer, 'clusterclick', function(cluster) {
                map.setCenter(cluster.getCenter());
                map.setZoom(map.getZoom() + 2);
              });

            }

            function initialize() {
              map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: new google.maps.LatLng(40.758896, -73.985130),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            },
                            {
                                "hue": "#ff0000"
                            }
                        ]
                    }
                ]
              });
              refreshMap();
            }

            function clearClusters(e) {
              e.preventDefault();
              e.stopPropagation();
              markerClusterer.clearMarkers();
            }

            google.maps.event.addDomListener(window, 'load', initialize);