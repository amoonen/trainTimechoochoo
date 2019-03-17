$(function(){

    const config = {
        apiKey: "AIzaSyCn6bxidmbH6601u0islr5_xyteVr41dLI",
        authDomain: "codersay-53fd9.firebaseapp.com",
        databaseURL: "https://codersay-53fd9.firebaseio.com",
        projectId: "codersay-53fd9",
        storageBucket: "codersay-53fd9.appspot.com",
        messagingSenderId: "878808016417"
    };
    firebase.initializeApp(config);

    const db = firebase.database();
    
    const dbRef = db.ref();

    
    const $tName = $('#name');
    const $tDest = $('#destination');
    const $tFirstTime = $('#firstTrainTime');
    const $tFreq = $('#frequency');
    const $submit = $('#formFill');
    const $tbody = $('tbody');
    let trainObj = {};

    
    const getValues = (e) => {
        e.preventDefault();
       
        let firstTimeConverted = moment($tFirstTime.val(), "hh:mm").subtract(1, "years");
        
        let currentTime = moment();
      
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
       
        let tRemainder = diffTime % $tFreq.val();
        
        let tMinsTillTrain = $tFreq.val() - tRemainder;
        
        let nextTrain = moment(moment().add(tMinsTillTrain, "minutes")).format("hh:mm");

        
        trainObj.tName = $tName.val();
        trainObj.tDest = $tDest.val();
        trainObj.tFreq = $tFreq.val();
        trainObj.tNextArr = nextTrain;
        trainObj.tMinsAway = tMinsTillTrain;

        
        $tName.val('');
        $tDest.val('');
        $tFirstTime.val('');
        $tFreq.val('');

        
        db.ref().push(trainObj);
    }

    dbRef.on('child_added', (snapshot) => 
}