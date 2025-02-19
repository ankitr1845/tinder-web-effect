let users = [
    {
        displayPic: "https://images.unsplash.com/photo-1644871295884-807319221418?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        pendingMessage: 4, 
        location: "Boston, USA", 
        name: "Emily", 
        age: 19, 
        interests: ["music", "painting", "hiking"],
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, deserunt asperiores. Asperiores porro dolorem vitae!",
        isFriend: null
    }, 
    {
        profilePic: "https://images.unsplash.com/photo-1469460340997-2f854421e72f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        displayPic: "https://images.unsplash.com/photo-1629080442475-4d7f4bb80dd6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        pendingMessage: 7, 
        location: "Chicago, USA", 
        name: "Angela", 
        age: 24, 
        interests: ["sports", "painting", "adventure"],
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, deserunt asperiores!",
        isFriend: null
    }, 
    {
        profilePic: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        displayPic: "https://images.unsplash.com/photo-1728035922414-08908e8272a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        pendingMessage: 10, 
        location: "Boston, USA", 
        name: "Britney", 
        age: 21, 
        interests: ["reading", "painting", "hiking"],
        bio: "Consequatur, deserunt asperiores. Asperiores porro dolorem vitae!",
        isFriend: null
    }, 
    {
        profilePic: "https://images.unsplash.com/photo-1469460340997-2f854421e72f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        displayPic: "https://images.unsplash.com/photo-1710262191150-63cdb0d5f3ab?q=80&w=2018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        pendingMessage: 14, 
        location: "New Jersey, USA", 
        name: "Zara", 
        age: 20, 
        interests: ["music", "sports", "hiking"],
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores porro dolorem vitae!",
        isFriend: null
    }
];


function select(elem){
    return document.querySelector(elem);
}

let curr = 0;
let isAnimating = false;     


function setData(index) {
    // Ensure index is valid before accessing user data
    if (users[index]) {
    
        select(".profileimg img").src = users[index].profilePic;
        select(".badge h5").textContent = users[index].pendingMessage;

        select(".location h3").textContent = users[index].location;
        select(".name h1:nth-child(1").textContent = users[index].name;
        select(".name h1:nth-child(2").textContent = users[index].age;

        let clutter = "";
        users[index].interests.forEach(function interest(interest) {
            clutter += `<div class="tag flex items-center bg-white/30 px-3 py-1 rounded-full gap-1">
            <i class="text-sm ri-music-fill"></i>
            <h3 class="text-sm tracking-tight capitalize">${interest}</h3>
        </div>`;
        });
        select(".tags").innerHTML = clutter;

        select(".bio p").textContent = users[index].bio;
    } else {
        console.error('User data not found at index:', index);
    }
}




(function setInitial(){
    select(".maincard img").src = users[curr].displayPic;
    select(".incomingcard img").src = users[curr+1]?.displayPic;
    setData(curr);
    curr = 2;
})();

function imgChange(){
    if(!isAnimating){
        isAnimating = true;
        let tl = gsap.timeline({
            onComplete: function(){
               isAnimating = false;
               let main =  select(".maincard")
               let incoming =  select(".incomingcard");
    
               incoming.classList.remove("z-[2]");
               incoming.classList.add("z-[3]");
               incoming.classList.remove("incomingcard");
    
               main.classList.remove("z-[3]");
               main.classList.add("z-[2]");
               gsap.set(main, {
                scale: 1,
                opacity: 1
               });
               if(curr >= users.length) {
                curr = 0;
            }
    
               if(curr === users.length) curr = 0;
               select(".maincard img").src = users[curr].displayPic;
               curr++; 
               main.classList.remove("maincard");
               incoming.classList.add("maincard");
               main.classList.add("incomingcard");  
            }
        });
        tl.to(".maincard", {
            scale: 1.1,
            opacity: 0,
            ease: Circ,
            duration: .9
        }, "start")
        .from(".incomingcard", {
            scale: .9,
            opacity: 0,
            ease: Circ,
            duration: 1.1
        }, "start")
    }
};

let reject = select(".reject");
let accept = select(".accept");

reject.addEventListener("click", function(){
    imgChange();
    setData(curr-1);
    gsap.from(".details .ele", {
        y: "100%",
        opacity: 0,
        stagger: .1,
        ease: Circ,
        duration: 1
    })
});

accept.addEventListener("click", function(){
    imgChange();
    setData(curr-1);
    gsap.from(".details .ele", {
        y: "100%",
        opacity: 0,
        stagger: .1,
        ease: Circ,
        duration: 1
    })
});

(function containerCreator(){
    document.querySelectorAll(".ele")
    .forEach(function(ele){
        let div = document.createElement("div");
        div.classList.add(`${ele.classList[1]}container`, 'overflow-hidden');
        div.appendChild(ele);
        select(".details").appendChild(div);
    })
})();

