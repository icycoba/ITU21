function showMenu(){
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onlick = function(event){
    if(!event.target.matches('.menu')){
        var dropdowns = document.getElementsByClassName("dropdownctnt");
        var i;
        for(i=0; i<dropdowns.length;i++){
            var openDropdown=dropdowns[i];
            if(openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
}