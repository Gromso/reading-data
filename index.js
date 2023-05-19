
 

   /************************************************************************************* */



   const divFeed = document.querySelector("#feed");
   const tplfeed = document.querySelector("#tplfeed").innerHTML;







   function loadFeed(){

    if(this.status == 200 && this.readyState == 4){
        const feed = this.responseXML.querySelectorAll("item");
        for(let item of feed){
            console.log(item)
            const title = item.querySelector("title").textContent;
            const description = item.querySelector("description").textContent;
            const pubdate = item.querySelector("pubDate").textContent;
            const link = item.querySelector("link").textContent;

            divFeed.innerHTML += tplfeed.replace(/{{title}}/g, title)
                                        .replace(/{{pubDate}}/g,pubdate)
                                        .replace(/{{description}}/g,description)
                                        .replace(/{{link}}/g, link);
        }



    }else if(this.status == 404 && this.readyState == 4){
        divFeed.innerHTML =`
          <div class="feed_article">
            <h1 style="color:red">No resource "${this.responseURL}" found
            </h1>
          </div
        `
    }else if(this.status >= 500 ){
        divFeed.innerHTML =`
          <div class="feed_article">
           <h1 style="color:red">
             Service unvalible. Server error.
           </h1>
          </div
        `
    }else{
        divFeed.innerHTML =`
          <div class="feed_article">
           <h1 style="color:red">
             Unknown: ${this.status}
           </h1>
          </div
        `
    }

   }


   const xhr = new XMLHttpRequest();

   xhr.addEventListener("load", loadFeed);
   xhr.open("GET", "https://techcrunch.com/feed");
   xhr.send();

   //https://techcrunch.com/feed