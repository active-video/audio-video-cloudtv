document.addEventListener('DOMContentLoaded', function(){

    var navItems;
    var KEYS = {
        8: 'BACK',
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN',
        13: 'OK'
    };

    //Update list of items, and focus 1st if nothing has focus
    function init(){
        //convert NodeList to Array
        navItems = [].slice.call(document.querySelectorAll('button:not([disabled]),input:not([disabled]),a:not([disabled])'));

        if(document.activeElement === document.body) {
            navItems[0].focus();
        }
    }


    document.addEventListener("DOMNodeInserted", init);

    function doNav (evt){
        var next;
        switch(KEYS[evt.keyCode]) {
            case 'DOWN':
            case 'RIGHT':
                next = navItems[navItems.indexOf(evt.target)+1];
                break;
            case 'LEFT':
            case 'UP':
                next = navItems[navItems.indexOf(evt.target)-1];
                break;
        }

        if(next) {
            next.focus();
        }
    }


    window.addEventListener('keydown', doNav);
    init();

});
