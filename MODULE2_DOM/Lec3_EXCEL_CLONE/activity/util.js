
function solveFormula(formula,selfcellobject) {
    // "( A1 + A2 )" => "( 10 + 20 )"
    let formulaComps = formula.split(" ");
    // ["(" , "A1" , "+" , "A2" , ")"];
  
    //this loop replace value of A1 and A2 in formula with their respective cell values !!
    for (let i = 0; i < formulaComps.length; i++) {
      let formComp = formulaComps[i];
      if (formComp[0] >= "A" && formComp[0] <= "Z") {
        // valid formula component
        // A1 => Z100
        let { rowId, colId } = getRowIdColIdFromAddress(formComp);
        let cellObject = db[rowId][colId];
        let value = cellObject.value;
        //push yourself in the children of formula components
        if(selfcellobject)
        {
          cellObject.childrens.push(selfcellobject.name);
          selfcellobject.parents.push(cellObject.name);
        }
       
        formula = formula.replace(formComp, value);
      }
    }
  
    // Stack Infix Evaluation !!! => "( 10 + 20 )";
    let computedValue = eval(formula);
    return computedValue;
  }


function getrowidcolidfromelement(element)
{
   let rowId=element.getAttribute("rowid");
   let colId=element.getAttribute("colid");

   return {
       rowId,colId
   };
}

function removeformula(cellObject)
{  
  cellObject.formula="";

  for(let i=0;i<cellObject.parents.length;i++)
  {
     let parentname=cellObject.parents[i];
     let {rowId,colId}=getRowIdColIdFromAddress(parentname);
     parentcellobject=db[rowId][colId];

     let updatechildrens=parentcellobject.childrens.filter(function(children){
         return children!=cellObject.name;
     }) 
     parentcellobject.childrens=updatechildrens;
  }
  cellObject.parents=[];

}

function updatechildrens(cellObject)
{
   // {
  //     name:"A1",
  //     value:"100",
  //     formula:"",
  //     childrens:["B1",  "C1"]
  // }
    
  for(let i=0;i<cellObject.childrens.length;i++)
  {
     let childrenname=cellObject.childrens[i];

     let {rowId,colId}=getRowIdColIdFromAddress(childrenname);
     let childrencellobject=db[rowId][colId];
     // {
    //     name:"B1",
    //     value:"30",
    //     formula:"( A1 + A2 )",
    //     childrens:[]
    // }
    let newvalue=solveFormula(childrencellobject.formula);
    //ui update
    document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).textContent = newvalue;
    //db update
       childrencellobject.value=newvalue;
       updatechildrens(childrencellobject);
  }
   
}

function getRowIdColIdFromAddress(address) {
    // B2 => colid,rowId
    // B => 1
    let rowId = Number(address.substring(1)) - 1;
    let colId = address.charCodeAt(0) - 65;
   
    return {
      rowId,
      colId,
    };
  }
