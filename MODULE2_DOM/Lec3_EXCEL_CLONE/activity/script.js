
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressinput=document.querySelector("#address");
let lastselectedcell;
let formulaInput=document.querySelector("#formula");

cellscontentdiv.addEventListener("scroll",function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;

    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";  
})

for(let i=0 ; i<allCells.length ; i++){
    allCells[i].addEventListener("click" , function(e){
        let rowId = Number(e.target.getAttribute("rowid"));
        let colId = Number(e.target.getAttribute("colid"));
      
       let cellObject = db[rowId][colId];
        let address = String.fromCharCode(65+colId)+(rowId+1)+"";
       
        addressinput.value=address;
        addressinput.value = address;
        formulaInput.value = cellObject.formula;
    })
    allCells[i].addEventListener("blur",function(e){
        lastselectedcell=e.target;
        let cellvalue=e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId =e.target.getAttribute("colid");
       
        let cellObject=db[rowId][colId];
       // console.log(cellObject);

        if(cellObject.value==cellvalue && !cellObject.formula)
        {
            return;
        }
        if(cellObject.formula)
        {
            removeformula(cellObject);
            //main yaha ab chahta hu ki address wale boxx se addres hata do
            formulaInput.value="";
        }

        //db update cellobject if not same
        cellObject.value=cellvalue;

        //update childdrens
        updatechildrens(cellObject);//yeh function humare liye jo yeh cell object hai uske children ko bolega ki tum update ho jao main update ho chuka hu
       

    })

    allCells[i].addEventListener("keydown",function(e){
        if(e.key=="Backspace")
        {
            let cell=e.target;
            let {rowId,colId}=getrowidcolidfromelement(cell);
            let cellObject=db[rowId][colId];
            if(cellObject.formula)
            {
                cellObject.formula="";
                formulaInput.value="";
                removeformula(cellObject);
                cell.textContent="";
            }
        }
        

    })
}

//when someone loves the formula input
formulaInput.addEventListener("blur",function(e){
    let formula=e.target.value;
     
    if(formula)
    {
        let {rowId,colId}=getrowidcolidfromelement(lastselectedcell);
        let cellObject=db[rowId][colId];
        //if cell object already had a formula
        if(cellObject.formula)
        {
           removeformula(cellObject);
        }
        let computedvalue=solveFormula(formula,cellObject);

        cellObject.formula=formula;

        //db updated
        cellObject.value=computedvalue;

        //ui update
       lastselectedcell.textContent=computedvalue;
       updatechildrens(cellObject);
    }
})