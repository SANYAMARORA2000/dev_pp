var noti=document.querySelector("h1");
var select=document.querySelector(".select");
var button=document.getElementsByTagName("button")
//console.log(noti);



for(but of button)
{
    but.addEventListener('click', (e)=>{
             
        var add = Number(noti.getAttribute('data-count') || 0);
        noti.setAttribute('data-count',add+1);
        noti.classList.add('zero');
        //console.log(add);
         
        var parent=e.target.parentNode;
        var clone=parent.cloneNode(true);
        select.appendChild(clone);
        clone.lastElementChild.innerText="Buy-Now";
        if(clone)
        {
            noti.onclick=()=>{
                select.classList.toggle('display');

            }
        }
        var image=e.target.parentNode.querySelector('img');
        

    });

}