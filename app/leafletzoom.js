/*See file leafletzoom.LICENSE.txt for copyright information*/L.TileLayer.Zoomify=L.TileLayer.extend({options:{width:-1,height:-1,tileGroupPrefix:"",tilesPerTileGroup:1e3},initialize:function(e,t){if(L.TileLayer.prototype.initialize.call(this,e,t),this.options.width<0||this.options.height<0)throw new Error("The user must set the Width and Height of the Zoomify image")},beforeAdd:function(e){var t=L.point(this.options.width,this.options.height);for(this._imageSize=[t],this._gridSize=[this._getGridSize(t)];t.x>this.options.tileSize||t.y>this.options.tileSize;)t=t.divideBy(2).ceil(),this._imageSize.push(t),this._gridSize.push(this._getGridSize(t));this._imageSize.reverse(),this._gridSize.reverse();var i=this._gridSize.length-1;this.options.maxNativeZoom=i;var o=this._gridSize[i],r=o.x*this.options.tileSize,n=o.y*this.options.tileSize,a=e.unproject([0,0],i),l=e.unproject([r,n],i);this.options.bounds=new L.LatLngBounds([a,l]),L.TileLayer.prototype.beforeAdd.call(this,e)},_getGridSize:function(e){var t=this.options.tileSize;return L.point(Math.ceil(e.x/t),Math.ceil(e.y/t))},_addTile:function(e,t){L.TileLayer.prototype._addTile.call(this,e,t);var i=this._imageSize[this._getZoomForUrl()],o=this._gridSize[this._getZoomForUrl()],r=L.GridLayer.prototype.getTileSize.call(this),n=L.TileLayer.prototype.getTileSize.call(this),a=this._tileCoordsToKey(e),l=this._tiles[a].el,s=L.point(i.x%r.x,i.y%r.y).unscaleBy(r);i.x%r.x>0&&e.x===o.x-1&&(l.style.width=n.scaleBy(s).x+"px"),i.y%r.y>0&&e.y===o.y-1&&(l.style.height=n.scaleBy(s).y+"px")},getTileUrl:function(e){return this.options.g=this.options.tileGroupPrefix+this._getTileGroup(e),L.TileLayer.prototype.getTileUrl.call(this,e)},_getTileGroup:function(e){for(var t,i=this._getZoomForUrl(),o=0,r=0;r<i;r++)o+=(t=this._gridSize[r]).x*t.y;return o+=e.y*this._gridSize[i].x+e.x,Math.floor(o/this.options.tilesPerTileGroup)},getBounds:function(){return this.options.bounds}}),L.tileLayer.zoomify=function(e,t){return new L.TileLayer.Zoomify(e,t)},ShowAndreaMosaic=function(e,t,i,o,r){var a=Math.ceil(Math.log2(Math.max(i,o)/256)),l={crs:L.CRS.Simple,fullscreenControl:r.fullscreenControl,zoomControl:r.zoomControl};null!==r.panInertia&&(l.inertia=r.panInertia),null!==r.panInertiaDeceleration&&(l.inertiaDeceleration=r.panInertiaDeceleration);var s=L.map(e,l);att=atob("PGEgaHJlZj0iaHR0cDovL3d3dy5BbmRyZWFQbGFuZXQuY29tIiB0aXRsZT0iQSBQaG90b2dyYXBoaWMgTW9zYWljIFNvZnR3YXJlIj5BbmRyZWFNb3NhaWM8L2E+"),r.attribution&&(att+=" | "+r.attribution);var h=L.tileLayer.zoomify(t+"{g}/{z}-{x}-{y}.jpg",{width:i,height:o,attribution:att,maxZoom:a+2}).addTo(s);if(s.fitBounds(h.getBounds()),null!=r.getHelpText){var p=r.getHelpText(),u=p.maxWidth,c=p.minWidth,d=L.popup({maxWidth:u,minWidth:c}).setContent(p.popUpText);L.easyButton("&#63;",function(e,t){d.setLatLng(t.getCenter()).openOn(t)},"Help").addTo(s)}if(null!==r.getSearchText){var g=r.getSearchText();if(null!==g){var y=g.length,x=new Array(y);for(n=0;n<y;++n)tileInfo=g[n],x[n]={loc:s.unproject([tileInfo[0],tileInfo[1]],a),title:tileInfo[2]};var T={sourceData:function(e,t){return t(x),{abort:function(){console.log("aborted request:"+e)}}},text:r.searchText,textErr:r.searchTextError,textCancel:r.searchTextCancel,textPlaceholder:r.searchTextPlaceholder,initial:!r.searchMiddleOfText,casesensitive:!r.searchCaseInsensitive,autoType:r.searchAutocomplete,hideMarkerOnCollapse:r.searchAutoHideMarker,container:r.searchContainer};null!==r.searchMarkerFound&&(T.marker=r.searchMarkerFound),s.addControl(new L.Control.Search(T))}}function f(e,t){null===e||null===e.popUpText||e.popUpText.length<=1||L.popup({maxWidth:e.maxWidth,keepInView:r.keepPopUpInView}).setLatLng(t).setContent(e.popUpText).openOn(s)}null!==r.getPopUpText&&s.on("contextmenu",e=>{var t=s.project(e.latlng,a);r.getPopUpText(t.x,t.y,{showPopUp:f,args:e.latlng})})};