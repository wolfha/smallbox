//
// Copyright (c) Wolfgang Hauptfleisch <dev@augmentedlogic.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
//
function SmallBox()
{

    this.makeid = function(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        var counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    this.add = function(content_id, open_class){

        var sbrand = this.makeid(5);
        var sb = "sb-" + sbrand;
        var body = document.querySelector("body");
        document.querySelector(content_id).style.display = "none";

        var modal_html = "<div id='"+ sb +"' class='smallbox-container smallbox-overlay'><div class='smallbox-display'>" +
            "<div class='smallbox-close-container'><div class='smallbox-close-button smallbox-close-"+ sbrand +"'></div></div>" +
            "<div id='sb-inner-" + sbrand + "' class='smallbox-inner'></div></div></div>";

        // appending the modal div with content
        var child = document.createElement("div");
        child.innerHTML = modal_html;
        body.appendChild(child);
        var modal_obj = document.querySelector("#" + sb);


        //
        //
        //
        //document.querySelector(open_class).addEventListener("click", (e) => {
        document.querySelector(open_class).addEventListener("click",function(e) {
                modal_obj.style.display = "flex";

                var content_div = document.getElementById(content_id.replace("#", ""));
                var sb_inner = document.getElementById("sb-inner-" + sbrand);
                sb_inner.innerHTML = content_div.innerHTML;

                var h = modal_obj.offsetHeight;
                var w = modal_obj.offsetWidth;

                //need to check
                body.classList.add("smallbox-stop-scrolling");
                body.addEventListener("touchmove", function(e){e.preventDefault()});
        });

        //
        //
        //
        document.querySelector(".smallbox-close-" + sbrand).addEventListener("click", function(e) {
                modal_obj.style.display = "none";
                document.querySelector(".smallbox-container").style.display = "none";

                // need to check that
                body.removeEventListener("touchmove", function(e){e.preventDefault()});
                body.classList.remove("smallbox-stop-scrolling");
        });


       document.querySelector("#" + sb).addEventListener("click", function(e) {
                              if (e.composedPath()[0] === this) {
                                //console.log("clicked " + sb);
                                document.querySelector("#" + sb).style.display = "none";
                                body.removeEventListener("touchmove", function(e){e.preventDefault()});
                                body.classList.remove("smallbox-stop-scrolling");
                              }
       });

    }

}

