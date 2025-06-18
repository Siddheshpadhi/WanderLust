let taxSwitch = document.querySelector("#switchCheckDefault");
    taxSwitch.addEventListener("click",() => {
        let taxInfo = document.querySelectorAll(".tax-switch")
        for(info of taxInfo){
            if(info.style.display != "inline"){
            info.style.display = "inline";
        } else {
            info.style.display = "none";
        }
    }
        
})