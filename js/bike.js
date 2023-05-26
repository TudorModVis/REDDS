const page = new fullpage('#fullpage', {
    autoScrolling:true,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['FIRST', 'SECOND', 'THIRD'],
    showActiveTooltip: true,
    licenseKey: 'gplv3-license',
    verticalCentered: false,
    onLeave: function(origin, destination, direction, trigger){
        origin.item.classList.add('active');
    }
});