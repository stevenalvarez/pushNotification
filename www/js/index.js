/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        var pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            alert("Register called android");
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"629734064389","ecb":"app.onNotificationGCM"});
        }
        else {
            alert("Register called ios");
            pushNotification.register(this.successHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
        
        //notificaion local TEST
/*var d = new Date();
    d = d.getTime() + 30*1000; //60 seconds from now
    d = new Date(d);

window.plugins.localNotification.add({
    date: d, // your set date object
    alertBody: 'Hello world!',
    repeat: 'weekly', // will fire every week on this day
    badge: 1,
    foreground:'foreground',
    background:'background',
    sound:'sub.caf'
});

function foreground(id){
    alert("foreground");
    console.log("I WAS RUNNING ID="+id);
}
function background(id){
    alert("background");
    console.log("I WAS IN THE BACKGROUND ID="+id)
}*/

// Schedules a local notification to be triggered after 5 seconds
window.plugins.localNotification.add({
    fireDate        : Math.round(new Date().getTime()/1000 + 30),
    alertBody       : "Hola mundo como estas???",
    action          : "View",
    repeatInterval  : "daily",
    soundName       : "beep.caf",
    badge           : 0,
    notificationId  : 123,
    foreground      : function(notificationId){ 
        alert("Hello World! This alert was triggered by notification " + notificationId); 
    },
    background  : function(notificationId){
        alert("Hello World! This alert was triggered by notification " + notificationId);
    }           
});

// cancel notificationId = 1234
window.plugins.localNotification.cancel(123, callback);

// cancel all notifications
window.plugins.localNotification.cancelAll(callback);

// set badge number to 3
window.plugins.localNotification.setBadgeNumber(3);


        //notificaion local TEST
        
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        console.log("Regid " + result);
        alert('Callback Success! Result = '+result);
    },
    errorHandler:function(error) {
        alert(error);
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    },
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        alert("Running in JS - onNotificationAPN - Received a notification! " + event.alert);
        
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    onPause : function(){
        alert("pause");
        setTimeout(function(){alert("Hello")},10000);
    },
    onResume : function(){
        alert("resume");
    }
};
