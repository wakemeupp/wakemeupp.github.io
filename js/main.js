document.addEventListener("DOMContentLoaded", ready, false);

function ready() {

    var currentTime = document.getElementById("currentTime"),

        createAlarmBtn = document.getElementById("create-alarm-btn"),

        setAlarmModal = document.getElementById("set-alarm"),

        setAlarmCancelBtn = document.getElementById("set-alarm-cancel-btn"),

        setAlarmSaveBtn = document.getElementById("set-alarm-save-btn"),

        setAlarmHour = document.getElementById("set-alarm-hour"),

        setAlarmMinute = document.getElementById("set-alarm-minute"),

        setAlarmZone = document.getElementById("set-alarm-zone"),

        setAlarmHourContain = document.getElementById("set-alarm-hour-contain"),

        setAlarmMinuteConatin = document.getElementById("set-alarm-minute-contain"),

        setAlarmZoneContain = document.getElementById("set-alarm-zone-contain"),

        overlay = document.getElementById("overlay"),

        notification = document.getElementById("notification"),

        alarmInfo = document.getElementById("alarm-info"),

        editAlarmBtn = document.getElementById("edit-alarm-btn"),

        alarmContainer = document.getElementById("alarm-container"),

        collapseAlarmContain = document.getElementById("collapse-alarm"),

        editAlarmIcon = document.getElementById("edit-alarm-icon"),

        deleteAlarmIcon = document.getElementById("delete-alarm-icon"),

        alarmHour = document.getElementById("alarm-hour"),

        alarmMinute = document.getElementById("alarm-minute"),

        alarmZone = document.getElementById("alarm-zone"),

        deleteAlarmPopup = document.getElementById("delete-alarm-popup"),

        deleteAlarmAcceptBtn = document.getElementById("delete-alarm-accept"),

        deleteAlarmDeclineBtn = document.getElementById("delete-alarm-decline"),

        alarmTonePlay = document.getElementById("alarm-tone-play"),

        alarmName = document.getElementById("alarm-name"),

        alarmNameHint = document.getElementById("alarm-name-hint"),

        snoozeAlarmBtn = document.getElementById("snooze-alarm-btn"),

        stopAlarmBtn = document.getElementById("stop-alarm-btn"),

        alarmRingingPopup = document.getElementById("alarm-ringing-popup"),

        alarmRingingTime = document.getElementById("alarm-ringing-time"),

        alarmNameText = document.getElementById("alarm-name-text"),

        alarmTone = document.getElementById("alarm-tone"),

        alarmToneVolumeCtrl = document.getElementById("alarm-tone-volume-ctrl"),

        snoozeAlarm = document.getElementById("snooze-alarm"),

        alarmVolume = document.getElementById("alarm-volume"),

        alarmSettingsBtn = document.getElementById("alarm-settings-btn"),

        setAlarmSettingsCancelBtn = document.getElementById("set-alarm-settings-cancel-btn"),

        setAlarmSettingsSaveBtn = document.getElementById("set-alarm-settings-save-btn"),

        alarmSettingsPopup = document.getElementById("alarm-settings-popup"),

        greeting = document.getElementById("greeting"),

        quote = document.getElementById("quote"),

        quoteAuthor = document.getElementById("quote-author"),

        firebaseRef = document.getElementById("firebase"),

        downloadContain = document.querySelector(".download-container"),

        downloadBtn = document.querySelector(".download-btn"),

        googleAnalytic = document.getElementById("googleAnalytics"),

        userDate = new Date(),

        userHour = userDate.getHours(),

        userMinutes = userDate.getMinutes(),

        userSeconds = userDate.getSeconds(),

        amOrPm = "AM",

        time = null,

        alarmBool = false,

        ringingBool = false,

        hourChange = null,

        minuteChange = null,

        zoneChange = null,

        notificationAnimationEnd = false,

        alarmArray = null,

        alarmTimeUp = false,

        stopAlarm = false,

        alarmNameValue = null,

        snoozeAlarmDefaultTime = 5,

        snoozeAlarmTime = null,

        snoozeAlarmBool = false,

        alarmSettingsBool = false,

        defaultAlarmTone = "assets/audio/default_tone.mp3",

        currentAlarmMinute = null,

        alarmVolumeValue = "0.5",

        firebaseDb = null;

    if (navigator.onLine === true) {

        firebaseRef.src = "js/firebase.js";

        googleAnalytic.src = "js/google-analytics.js";

        firebaseRef.onload = function () {

            firebaseDb = new Firebase("https://crackling-inferno-105.firebaseio.com/");

        }


    } else {

        downloadContain.style.display = "none";

    }

    downloadBtn.addEventListener("click", function (evt) {

        var counter;

        firebaseDb.once("value", function (snapshot) {

            counter = snapshot.val();

            if (snapshot.val() === null) {

                firebaseDb.set({

                    counter: 1
                })

            } else {

                firebaseDb.set({

                    counter: snapshot.val().counter + 1

                })

            }
        });

    }, false);

    function initValuesInDOM() {

        "use strict";

        if (window.localStorage !== undefined) {

            if (localStorage.getItem("snoozeAlarmTime") === null) {

                snoozeAlarmDefaultTime = 5;

            }

            if (localStorage.getItem("currentAlarmMinute") !== null) {

                currentAlarmMinute = parseInt(localStorage.getItem("currentAlarmMinute"));

            }

            if (localStorage.getItem("snoozeAlarmTime") !== null) {

                snoozeAlarmDefaultTime = parseInt(localStorage.getItem("snoozeAlarmTime"));

                snoozeAlarm.value = parseInt(localStorage.getItem("snoozeAlarmTime"));

            }

            if (localStorage.getItem("alarmTone") !== null) {

                alarmTone.value = localStorage.getItem("alarmTone");

                alarmTonePlay.src = localStorage.getItem("alarmTone");

                defaultAlarmTone = localStorage.getItem("alarmTone");

            }

            if (localStorage.getItem("alarmVolume") !== null) {

                alarmTonePlay.volume = localStorage.getItem("alarmVolume");

                alarmToneVolumeCtrl.value = localStorage.getItem("alarmVolume");

                alarmVolumeValue = localStorage.getItem("alarmVolume");

                if (alarmVolumeValue == 0) {

                    alarmVolume.innerHTML = alarmVolumeValue.replace("0.", "") + "%";

                } else {

                    if (localStorage.getItem("alarmVolume") == "1") {

                        alarmVolume.innerHTML = alarmVolumeValue.replace("0.", "") + "00%";

                    } else {

                        alarmVolume.innerHTML = alarmVolumeValue.replace("0.", "") + "0%";
                    }

                }

            }

            if (localStorage.getItem("alarm") !== null) {

                alarmArray = localStorage.getItem("alarm").split(" ");

                if (parseInt(alarmArray[0]) < 10) {

                    alarmHour.innerHTML = "0" + parseInt(alarmArray[0]);

                }

                if (parseInt(alarmArray[1]) < 10) {

                    alarmMinute.innerHTML = "0" + parseInt(alarmArray[1]);
                }

                if (parseInt(alarmArray[1]) > 9) {

                    alarmMinute.innerHTML = parseInt(alarmArray[1]);
                }

                if (parseInt(alarmArray[0]) > 9) {

                    alarmHour.innerHTML = parseInt(alarmArray[0]);
                }

                alarmZone.innerHTML = alarmArray[2];

                collapseAlarmContain.style.display = "block";

            }

        }


        if (userMinutes < 10) {

            userMinutes = "0" + userMinutes;

        }

        if (userSeconds < 10) {

            userSeconds = "0" + userSeconds;

        }

        if (userHour >= 12) {

            amOrPm = "PM";

        } else {

            amOrPm = "AM";

        }

        if (userHour >= 12 && userHour < 17) {

            greeting.innerHTML = "Good Afternoon Gorgeous <span>&#9787;</span>";

        }

        if (userHour >= 5 && userHour < 12) {

            greeting.innerHTML = "Good Morning Achiever, Have A Great Day <span>&#9787;</span>";

        }

        if (userHour >= 17 && userHour <= 21) {

            greeting.innerHTML = "Hope You Are Having A Nice Evening Gorgeous <span>&#9787;</span>";

        }

        if (userHour >= 21 || userHour <= 4) {

            greeting.innerHTML = "It's Night, Have A Sound Sleep Beautiful <span>&#9787;</span>";

        }

        if (userHour > 12) {

            userHour = userHour - 24 / 2;

        }

        if (userHour === 0) {

            userHour = 12;

            amOrPm = "AM"

        }

        time = userHour + ":" + userMinutes + ":" + userSeconds + " " + amOrPm;

        currentTime.innerHTML = time;

        selectQuote();

    }

    initValuesInDOM();

    function timeUpdate() {

        "use strict";

        var alarmArray = null;

        userDate = new Date();

        userHour = userDate.getHours();

        userMinutes = userDate.getMinutes();

        userSeconds = userDate.getSeconds();


        if (userMinutes < 10) {

            userMinutes = "0" + userMinutes;

        }

        if (userSeconds < 10) {

            userSeconds = "0" + userSeconds;

        }

        if (userHour >= 12) {

            amOrPm = "PM";

        } else {

            amOrPm = "AM";

        }

        if (userHour >= 12 && userHour < 17) {

            greeting.innerHTML = "Good Afternoon Gorgeous <span>&#9787;</span>";

        }

        if (userHour >= 5 && userHour < 12) {

            greeting.innerHTML = "Good Morning Achiever, Have A Great Day <span>&#9787;</span>";

        }

        if (userHour >= 17 && userHour <= 21) {

            greeting.innerHTML = "Hope You Are Having A Nice Evening Gorgeous <span>&#9787;</span>";

        }

        if (userHour >= 21 || userHour <= 4) {

            greeting.innerHTML = "It's Night, Have A Sound Sleep Beautiful <span>&#9787;</span>";

        }

        if (userHour > 12) {

            userHour = userHour - 24 / 2;

        }

        if (userHour === 0) {

            userHour = 12;

            amOrPm = "AM"

        }

        if (snoozeAlarmBool === true) {

            if (snoozeAlarmTime === parseInt(userMinutes)) {

                if (window.getComputedStyle(alarmRingingPopup).display === "none") {

                    alarmRingingTime.innerHTML = userHour + ":" + userMinutes + " " + amOrPm;

                    alarmRingingModal();

                    alarmTonePlay.loop = true;

                    alarmTonePlay.play();

                    window.focus();

                } else {

                    alarmTonePlay.play();

                }

            } else {

                if (parseInt(userMinutes) === snoozeAlarmTime + 1) {

                    alarmTonePlay.loop = false;

                    alarmTonePlay.pause();

                    alarmTonePlay.currentTime = 0;

                    snoozeAlarmBool = false;

                    alarmRingingEnd();

                }
            }

        }

        if (window.localStorage !== undefined) {

            if (localStorage.getItem("alarm") !== null) {

                alarmArray = localStorage.getItem("alarm").split(" ");

                if (stopAlarm !== true) {

                    if (currentAlarmMinute != userMinutes) {

                        localStorage.removeItem("currentAlarmMinute");

                        if (parseInt(alarmArray[0]) === userHour && parseInt(alarmArray[1]) == userMinutes && alarmArray[2] === amOrPm) {

                            if (window.getComputedStyle(alarmRingingPopup).display === "none") {

                                if (parseInt(alarmArray[1]) < 10) {

                                    alarmRingingTime.innerHTML = alarmArray[0] + ":" + "0" + alarmArray[1] + " " + alarmArray[2];

                                }

                                if (parseInt(alarmArray[1]) > 10) {

                                    alarmRingingTime.innerHTML = alarmArray[0] + ":" + alarmArray[1] + " " + alarmArray[2];

                                }

                                if (localStorage.getItem("alarmName") !== null) {

                                    alarmNameText.innerHTML = localStorage.getItem("alarmName");
                                }


                                if (window.getComputedStyle(notification).display === "none") {

                                    window.focus();

                                    alarmRingingModal();

                                    alarmTonePlay.loop = true;

                                    alarmTonePlay.play();

                                }

                            } else {

                                alarmTonePlay.play();

                            }

                        } else {

                            if (window.getComputedStyle(alarmRingingPopup).display !== "none") {

                                alarmTonePlay.loop = false;

                                alarmTonePlay.pause();

                                alarmTonePlay.currentTime = 0;

                                alarmRingingEnd();

                            }

                        }

                    }

                }

            }

        }

        time = userHour + ":" + userMinutes + ":" + userSeconds + " " + amOrPm;

        currentTime.innerHTML = time;

    }

    window.setInterval(timeUpdate, 1000);

    function selectQuote() {

        "use strict";

        var randomQuote,
            quotes;

        randomQuote = Math.floor(Math.random() * 20);

        quotes = {

            0: {
                quote: "The best preparation for tomorrow is doing your best today.",
                author: "H.Jackson Brown"

            },
            1: {
                quote: "Start by doing what's necessary; then do what's possible, and suddenly you are doing the impossible.",
                author: "Francis of Assisi"

            },
            2: {
                quote: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
                author: "Vince Lombardi"

            },
            3: {
                quote: "If opportunity doesn't knock, build a door.",
                author: "Milton Berle"

            },
            4: {
                quote: "Put your heart, mind and soul into even your smallest acts. This is the secret of success.",
                author: "Swami Sivananda"

            },
            5: {
                quote: "The purpose of our lives is to be happy.",
                author: "Dalai Lama"

            },
            6: {
                quote: "Once you replace negative thought with positive ones, you'll start having positive positive results.",
                author: "Willie Nelson"

            },
            7: {
                quote: "Don't watch the clock,do what it does. Keep going.",
                author: "Sam Levenson"

            },
            8: {
                quote: "It does not matter how slowly you go as long as you don't stop.",
                author: "Confucius"

            },
            9: {
                quote: "If you can dream it, you can do it.",
                author: "Walt Disney"

            },
            10: {
                quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
                author: "Thomas A.Edison"

            },
            11: {
                quote: "Your talent is God's gift to you. What you do with it is your gift back to God.",
                author: "Leo Buscaglia"

            },
            12: {
                quote: "We are what our thoughts have made us, so take care about what you think. Words are secondary. Thoughts live, they travel far.",
                author: "Swami Vivekananda"

            },
            13: {
                quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
                author: "Ralph Waldo Emerson"

            },
            14: {
                quote: "It is better to keep your mouth closed and let people think you are a fool than to open it and remove all doubt.",
                author: "Mark Twain"

            },
            15: {
                quote: "Start where you are. Use what you have. Do what you can.",
                author: "Arthur Ashe"

            },
            16: {
                quote: "There is only one corner of the universe you can be certain of improving, and that's your own self.",
                author: "Aldous Huxley"

            },
            17: {
                quote: "Accept the challenges so that you can feel the exilaration of victory.",
                author: "George S. Patton"
            },
            18: {
                quote: "Life is 10% what happens to you and 90% how you react to it.",
                author: "Charles R. Swindoll"
            },
            19: {
                quote: "Yesterday is not ours to recover, but tomorrow is ours to win or lose.",
                author: "Lyndon B. Johnson"
            },
            20: {
                quote: "Perfection is attained not when there is nothing more to add, but when there is nothing more to take away.",
                author: "Antoine de Saint Exupéry"
            }

        }

        quote.innerHTML = quotes["" + randomQuote + ""].quote;

        quoteAuthor.innerHTML = "&#45; &nbsp;" + quotes["" + randomQuote + ""].author;

    }

    setInterval(selectQuote, 100000);

    function alarmSetModal() {

        "use strict";

        alarmBool = true;

        setAlarmHour.innerHTML = userHour;

        setAlarmMinute.innerHTML = userMinutes;

        setAlarmZone.innerHTML = amOrPm;

        hourChange = userHour;

        minuteChange = +userMinutes;

        zoneChange = amOrPm;

        overlay.style.display = "block";

        setAlarmModal.classList.add("downAnimate");

    }

    function alarmRingingModal() {

        "use strict";

        ringingBool = true;

        alarmRingingPopup.classList.add("downAnimate1");

    }

    function removeAlarmRingingModal() {

        "use strict";

        if (ringingBool !== false) {

            return;

        }

        alarmRingingPopup.classList.remove("downAnimate1");

        alarmRingingPopup.classList.remove("upAnimate1");

    }

    function alarmRingingEnd() {

        "use strict";

        ringingBool = false;

        alarmRingingPopup.classList.add("upAnimate1");

        alarmRingingPopup.addEventListener("webkitAnimationEnd", removeAlarmRingingModal);

        alarmRingingPopup.addEventListener("animationend", removeAlarmRingingModal);

    }

    function removeAlarmSetModal() {

        "use strict";

        if (alarmBool !== false) {

            return;

        }

        setAlarmModal.classList.remove("downAnimate");

        setAlarmModal.classList.remove("upAnimate");

    }

    function saveAlarm() {

        "use strict";

        var alarm = hourChange + " " + minuteChange + " " + zoneChange,

            setAlarmHour,

            setAlarmMinute,

            alarmAmOrPm,

            remainHour,

            remainMinute;

        stopAlarm = false;

        snoozeAlarmBool = false;

        localStorage.setItem("currentAlarmMinute", userMinutes);

        currentAlarmMinute = parseInt(localStorage.getItem("currentAlarmMinute"));

        if (alarmNameValue === "" || alarmNameValue === null) {

            localStorage.removeItem("alarmName");

        }

        if (alarmNameValue !== "" || alarmNameValue !== null) {

            localStorage.setItem("alarmName", alarmName.value);

        }

        localStorage.setItem("alarm", alarm);

        alarmArray = localStorage.getItem("alarm").split(" ");

        if (parseInt(alarmArray[0]) < 10) {

            alarmHour.innerHTML = "0" + parseInt(alarmArray[0]);

        }

        if (parseInt(alarmArray[1]) < 10) {

            alarmMinute.innerHTML = "0" + parseInt(alarmArray[1]);
        }

        if (parseInt(alarmArray[1]) > 9) {

            alarmMinute.innerHTML = parseInt(alarmArray[1]);
        }

        if (parseInt(alarmArray[0]) > 9) {

            alarmHour.innerHTML = parseInt(alarmArray[0]);
        }

        alarmZone.innerHTML = alarmArray[2];

        setAlarmHour = parseInt(alarmArray[0]);

        setAlarmMinute = parseInt(alarmArray[1]);

        alarmAmOrPm = alarmArray[2];

        if (setAlarmHour == 12 && parseInt(userHour) < 12 && alarmAmOrPm !== amOrPm) {

            remainHour = 12 - parseInt(userHour);

            remainMinute = setAlarmMinute - parseInt(userMinutes);

        } else if (alarmAmOrPm !== amOrPm) {

            remainHour = 12 - parseInt(userHour) + setAlarmHour;

            remainMinute = setAlarmMinute - parseInt(userMinutes);

        } else if (setAlarmHour == 12 && parseInt(userHour) < 12 && alarmAmOrPm === amOrPm) {

            remainHour = 12 - parseInt(userHour) + 12;

            remainMinute = setAlarmMinute - parseInt(userMinutes);

        } else if (setAlarmHour >= 1 && setAlarmHour <= 11 && userHour == 12 && alarmAmOrPm === amOrPm) {

            remainHour = 12 + setAlarmHour - parseInt(userHour);

            remainMinute = setAlarmMinute - parseInt(userMinutes);

        } else if (setAlarmHour === 12 && userHour == 1 && alarmAmOrPm === amOrPm) {

            remainHour = 25 - parseInt(userHour);

            remainMinute = setAlarmMinute - parseInt(userMinutes);

        } else {

            remainHour = setAlarmHour - parseInt(userHour);

            remainMinute = setAlarmMinute - parseInt(userMinutes);

        }

        if (remainHour > 0 && remainMinute > 0 && alarmAmOrPm === amOrPm) {

            if (remainHour > 1 && remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minutes" + " from now";

            } else if (remainHour === 1 && remainMinute === 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hour" + " " + remainMinute + " minute" + " from now";

            } else if (remainHour > 1 && remainMinute === 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minute" + " from now";

            } else if (remainHour === 1 && remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hour" + " " + remainMinute + " minutes" + " from now";

            }

        } else if (remainHour === 0 && remainMinute === 0 && alarmAmOrPm === amOrPm) {

            alarmInfo.innerHTML = "Alarm is set for 24 hours from now";

        } else if (remainHour > 0 && remainMinute === 0 && alarmAmOrPm === amOrPm) {

            if (remainHour > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours from now";

            } else {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hour from now";

            }

        } else if (remainHour === 0 && remainMinute > 0 && alarmAmOrPm === amOrPm) {

            if (remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainMinute + " minutes from now";

            } else {

                alarmInfo.innerHTML = "Alarm is set for " + remainMinute + " minute from now";

            }

        } else if (remainHour < 0 && remainMinute < 0 && alarmAmOrPm === amOrPm) {

            remainHour = 25 + remainHour;

            remainMinute = 60 + remainMinute;

            if (remainHour > 1 && remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minutes" + " from now";

            } else if (remainHour === 1 && remainMinute === 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hour" + " " + remainMinute + " minute" + " from now";

            } else if (remainHour > 1 && remainMinute === 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minute" + " from now";

            } else if (remainHour === 1 && remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hour" + " " + remainMinute + " minutes" + " from now";

            }

        } else if (remainHour < 0 && remainMinute === 0 && alarmAmOrPm === amOrPm) {

            remainHour = 25 + remainHour;

            if (remainHour > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours from now";

            } else {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hour from now";

            }

        } else if (remainHour === 0 && remainMinute < 0 && alarmAmOrPm === amOrPm) {

            remainMinute = 60 + remainMinute;

            if (remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for 24 hours " + remainMinute + " minutes from now";

            } else {

                alarmInfo.innerHTML = "Alarm is set for 24 hours " + remainMinute + " minute from now";

            }

        } else if (remainHour > 0 && remainMinute < 0 && alarmAmOrPm === amOrPm) {

            remainMinute = 60 + remainMinute;

            if (remainHour > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minutes" + " from now";

            } else {

                if (remainMinute > 1) {

                    alarmInfo.innerHTML = "Alarm is set for " + remainMinute + " minutes from now";

                } else {

                    alarmInfo.innerHTML = "Alarm is set for " + remainMinute + " minute from now";

                }

            }

        } else if (remainHour === 12 && remainMinute === 0 && alarmAmOrPm !== amOrPm) {

            alarmInfo.innerHTML = "Alarm is set for 12 hours from now";

        } else if (remainHour > 0 && remainMinute > 0 && alarmAmOrPm !== amOrPm) {

            if (remainHour > 1 && remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minutes" + " from now";

            } else if (remainHour > 1 && remainMinute === 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minute" + " from now";

            }

        } else if (remainHour > 0 && remainMinute === 0 && alarmAmOrPm !== amOrPm) {

            alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours from now";

        } else if (remainHour > 0 && remainMinute < 0 && alarmAmOrPm !== amOrPm) {

            remainMinute = 60 + remainMinute;

            if (remainHour > 1 && remainMinute > 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minutes" + " from now";

            } else if (remainHour > 1 && remainMinute === 1) {

                alarmInfo.innerHTML = "Alarm is set for " + remainHour + " hours" + " " + remainMinute + " minute" + " from now";

            }

        }
        cancelAlarmSet();

        notification.classList.add("rightAnimate");

        setTimeout(saveAlarmInfo, 3000);
    }

    function saveAlarmInfo() {

        notification.classList.add("leftAnimate");

        notificationAnimationEnd = true;

    }

    notification.addEventListener("webkitAnimationEnd", function () {

        if (notificationAnimationEnd === true) {

            notification.classList.remove("leftAnimate");

            notification.classList.remove("rightAnimate");

            notificationAnimationEnd = false;

            collapseAlarmContain.style.display = "block";

        }

    }, false);

    notification.addEventListener("animationend", function () {

        if (notificationAnimationEnd === true) {

            notification.classList.remove("leftAnimate");

            notification.classList.remove("rightAnimate");

            notificationAnimationEnd = false;

            collapseAlarmContain.style.display = "block";

        }

    }, false);

    function cancelAlarmSet() {

        alarmBool = false;

        overlay.style.display = "none";

        setAlarmModal.classList.add("upAnimate");

        setAlarmModal.addEventListener("webkitAnimationEnd", removeAlarmSetModal);

        setAlarmModal.addEventListener("animationend", removeAlarmSetModal);

    }

    function hourEventHandler(evt) {

        "use strict";

        if (evt.target.id === "hour-carat-up") {

            hourChange += 1;

            if (hourChange === 13) {

                hourChange = 1;

                setAlarmHour.innerHTML = hourChange;

            }

            setAlarmHour.innerHTML = hourChange;

        }

        if (evt.target.id === "hour-carat-down") {

            hourChange -= 1;

            if (hourChange === 0) {

                hourChange = 12;

                setAlarmHour.innerHTML = hourChange;

            }

            setAlarmHour.innerHTML = hourChange;
        }

    }


    function minuteEventHandler(evt) {

        "use strict";

        if (evt.target.id === "minute-carat-up") {

            minuteChange += 1;

            if (minuteChange === 60) {

                minuteChange = 0;

                setAlarmMinute.innerHTML = minuteChange;

            }

            if (minuteChange < 10) {

                minuteChange = "0" + minuteChange;

                setAlarmMinute.innerHTML = minuteChange;

                minuteChange = parseInt(minuteChange);

            } else {

                setAlarmMinute.innerHTML = minuteChange;

            }


        }

        if (evt.target.id === "minute-carat-down") {

            minuteChange -= 1;

            if (minuteChange < 10) {

                minuteChange = "0" + minuteChange;

                setAlarmMinute.innerHTML = minuteChange;

                minuteChange = parseInt(minuteChange);

                if (setAlarmMinute.innerHTML === "0-1") {

                    minuteChange = 59;

                    setAlarmMinute.innerHTML = minuteChange;

                }

            } else {

                setAlarmMinute.innerHTML = minuteChange;


            }

        }

    }

    function zoneEventHandler(evt) {

        "use strict";

        if (evt.target.id === "zone-carat-up") {

            if (setAlarmZone.innerHTML === "AM") {

                setAlarmZone.innerHTML = "PM";

                zoneChange = setAlarmZone.innerHTML;

            } else {

                setAlarmZone.innerHTML = "AM";

                zoneChange = setAlarmZone.innerHTML;

            }

        }

        if (evt.target.id === "zone-carat-down") {

            if (setAlarmZone.innerHTML === "AM") {

                setAlarmZone.innerHTML = "PM";

                zoneChange = setAlarmZone.innerHTML;

            } else {

                setAlarmZone.innerHTML = "AM";

                zoneChange = setAlarmZone.innerHTML;

            }

        }

    }

    function editAlarmBtnHandler() {

        "use strict";

        var thisContent = this.innerHTML;

        if (thisContent.indexOf("+") > -1) {

            this.innerHTML = thisContent.replace("+", "-");

            alarmContainer.style.display = "block";

        } else if (thisContent.indexOf("-") > -1) {

            this.innerHTML = thisContent.replace("-", "+");

            alarmContainer.style.display = "none";

        }

    }

    function editAlarmHandler() {

        "use strict";

        alarmBool = true;

        setAlarmHour.innerHTML = parseInt(alarmArray[0]);

        setAlarmMinute.innerHTML = parseInt(alarmArray[1]);

        setAlarmZone.innerHTML = alarmZone.innerHTML;

        hourChange = parseInt(alarmArray[0]);

        minuteChange = parseInt(alarmArray[1]);

        zoneChange = alarmArray[2];

        overlay.style.display = "block";

        setAlarmModal.classList.add("downAnimate");

    }

    function deleteAlarmHandler() {

        overlay.style.display = "block";

        deleteAlarmPopup.style.display = "block";

    }

    function deleteAlarmDeclineHandler() {

        overlay.style.display = "none";

        deleteAlarmPopup.style.display = "none";

    }

    function deleteAlarmAcceptHandler() {

        editAlarmBtn.innerHTML = editAlarmBtn.innerHTML.replace("-", "+");

        localStorage.removeItem("alarm");

        alarmContainer.style.display = "none";

        collapseAlarmContain.style.display = "none";

        overlay.style.display = "none";

        deleteAlarmPopup.style.display = "none";

    }

    function focusInHandler() {

        alarmNameHint.style.display = "block";

    }

    function focusOutHandler() {

        alarmNameHint.style.display = "none";

    }

    function stopAlarmHandler() {

        alarmTonePlay.pause();

        alarmTonePlay.currentTime = 0;

        stopAlarm = true;

        snoozeAlarmBool = false;

        ringingBool = false;

        alarmRingingPopup.classList.add("upAnimate1");

        alarmRingingPopup.addEventListener("webkitAnimationEnd", removeAlarmRingingModal);

        alarmRingingPopup.addEventListener("animationend", removeAlarmRingingModal);

    }

    function alarmNameHandler(evt) {

        alarmNameValue = evt.target.value;

    }

    function snoozeAlarmHandler() {

        alarmTonePlay.pause();

        alarmTonePlay.currentTime = 0;

        stopAlarm = true;

        snoozeAlarmBool = true;

        snoozeAlarmTime = parseInt(userMinutes) + snoozeAlarmDefaultTime;

        if (snoozeAlarmTime >= 60) {

            snoozeAlarmTime = snoozeAlarmTime - 60;

        }

        ringingBool = false;

        alarmRingingPopup.classList.add("upAnimate1");

        alarmRingingPopup.addEventListener("webkitAnimationEnd", removeAlarmRingingModal);

        alarmRingingPopup.addEventListener("animationend", removeAlarmRingingModal);

        alarmInfo.innerHTML = "Alarm snooze for " + snoozeAlarmDefaultTime + " minutes from now";

        notification.classList.add("rightAnimate");

        setTimeout(saveAlarmInfo, 3000);

    }

    function alarmToneVolumeCtrlHandler(evt) {

        alarmTonePlay.volume = evt.target.value;

        var alarmVolumeValue = evt.target.value.replace("0.", "");

        if (alarmVolumeValue == 0) {

            alarmVolume.innerHTML = alarmVolumeValue + "%";

        } else {

            if (evt.target.value == "1") {

                alarmVolume.innerHTML = alarmVolumeValue + "00%";

            } else {

                alarmVolume.innerHTML = alarmVolumeValue + "0%";
            }

        }

    }

    function alarmSettingsHandler() {

        "use strict";

        alarmSettingsBool = true;

        overlay.style.display = "block";

        alarmSettingsPopup.classList.add("downAnimate");

    }

    function cancelAlarmSettings() {

        alarmSettingsBool = false;

        overlay.style.display = "none";

        alarmTonePlay.src = defaultAlarmTone;

        alarmTone.value = defaultAlarmTone;

        alarmToneVolumeCtrl.value = alarmVolumeValue;

        alarmTonePlay.volume = alarmVolumeValue;

        snoozeAlarm.value = snoozeAlarmDefaultTime;

        if (alarmVolumeValue == 0) {

            alarmVolume.innerHTML = alarmVolumeValue.replace("0.", "") + "%";

        } else {

            if (alarmVolumeValue == "1") {

                alarmVolume.innerHTML = alarmVolumeValue.replace("0.", "") + "00%";

            } else {

                alarmVolume.innerHTML = alarmVolumeValue.replace("0.", "") + "0%";
            }

        }

        alarmSettingsPopup.classList.add("upAnimate");

        alarmSettingsPopup.addEventListener("webkitAnimationEnd", removeAlarmSettingsPopup);

        alarmSettingsPopup.addEventListener("animationend", removeAlarmSettingsPopup);

    }

    function removeAlarmSettingsPopup() {

        "use strict";

        if (alarmSettingsBool !== false) {

            return;

        }

        alarmSettingsPopup.classList.remove("downAnimate");

        alarmSettingsPopup.classList.remove("upAnimate");

    }

    function saveAlarmSettings() {

        localStorage.setItem("alarmTone", alarmTone.value);

        localStorage.setItem("snoozeAlarmTime", snoozeAlarm.value);

        localStorage.setItem("alarmVolume", alarmToneVolumeCtrl.value);

        defaultAlarmTone = localStorage.getItem("alarmTone");

        alarmVolumeValue = localStorage.getItem("alarmVolume");

        snoozeAlarmDefaultTime = localStorage.getItem("snoozeAlarmTime");


        cancelAlarmSettings();

    }

    function alarmToneHandler(evt) {

        alarmTonePlay.src = evt.target.value;

        alarmTonePlay.play();

    }

    createAlarmBtn.addEventListener("click", alarmSetModal, false);

    setAlarmCancelBtn.addEventListener("click", cancelAlarmSet, false);

    setAlarmSaveBtn.addEventListener("click", saveAlarm, false);

    setAlarmHourContain.addEventListener("click", hourEventHandler, false);

    setAlarmMinuteConatin.addEventListener("click", minuteEventHandler, false);

    setAlarmZoneContain.addEventListener("click", zoneEventHandler, false);

    editAlarmBtn.addEventListener("click", editAlarmBtnHandler, false);

    editAlarmIcon.addEventListener("click", editAlarmHandler, false);

    deleteAlarmIcon.addEventListener("click", deleteAlarmHandler, false);

    deleteAlarmDeclineBtn.addEventListener("click", deleteAlarmDeclineHandler, false);

    deleteAlarmAcceptBtn.addEventListener("click", deleteAlarmAcceptHandler, false);

    alarmName.addEventListener("focus", focusInHandler, false);

    alarmName.addEventListener("blur", focusOutHandler, false);

    stopAlarmBtn.addEventListener("click", stopAlarmHandler, false);

    alarmName.addEventListener("change", alarmNameHandler, false);

    snoozeAlarmBtn.addEventListener("click", snoozeAlarmHandler, false);

    alarmToneVolumeCtrl.addEventListener("input", alarmToneVolumeCtrlHandler, false);

    alarmSettingsBtn.addEventListener("click", alarmSettingsHandler, false);

    setAlarmSettingsCancelBtn.addEventListener("click", cancelAlarmSettings, false);

    setAlarmSettingsSaveBtn.addEventListener("click", saveAlarmSettings, false);

    alarmTone.addEventListener("click", alarmToneHandler, false);


}
