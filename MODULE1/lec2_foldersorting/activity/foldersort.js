const fs= require("fs");
const path = require("path");
let extensions = require("./util");


let extfolderpath;

function checkfolder(extension,folderpath)
{
    //check if extension matches with anyfolder
    extfolderpath="../../../PRACTICE_1";
    //"/downloads"
    for(let key in extensions)
    {
      
        if(extensions[key].includes(extension))
        {
            //string interpolation
          extfolderpath=`${extfolderpath}/${key}`;
          //"/downloads/Images"
          break;
        }
    }

    return fs.existsSync(extfolderpath);//yeh check karega whether images ka folder bana hua ha ya nahi agar bana hua hai to true bhejega else false
}

function moveFile(filename,folderpath)
{
  //copy file
  let sourcefilepath=`${folderpath}/${filename}`;

  let destinationfilepath=`${extfolderpath}/${filename}`;
  fs.copyFileSync(sourcefilepath,destinationfilepath);

  fs.unlinkSync(sourcefilepath);

}
function createfolder()
{
    fs.mkdirSync(extfolderpath);
}

function sortfolder(folderpath)
{
  
    let content= fs.readdirSync(folderpath);
    //get extension on each
    for(let i=0;i<content.length;i++)
    {
      let isDirectory = fs.lstatSync(`${folderpath}/${content[i]}`).isDirectory();
      if(isDirectory){
        console.log("It is a folder");
        sortfolder(`${folderpath}/${content[i]}`); "./Downloads/Audio"
      }
      else
      {
        let extensionname=path.extname(content[i]);
        console.log(extensionname);
        let extfolderexist=checkfolder(extensionname,folderpath);
        if(extfolderexist)
        {
          moveFile(content[i],folderpath);
        }
        else
        {
          createfolder();
          moveFile(content[i],folderpath);
        }
      }
      
    }
}
sortfolder("../../../PRACTICE_1");


