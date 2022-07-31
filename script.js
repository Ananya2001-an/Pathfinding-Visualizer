const rows = document.getElementsByTagName('tr')
let startRow
let startCol 
let destRow
let destCol

for(let i=0;i<rows.length;i++)
{
    for(let j=0;j<rows[i].getElementsByTagName('td').length;j++)
    {
        rows[i].getElementsByTagName('td')[j].innerHTML = `<button class="cell-btn"></button>`
    }
}


let count = 0
let path = new Array()
const btn = document.getElementsByClassName('cell-btn')

for(let i=0;i<btn.length;i++)
{  
    btn[i].addEventListener('click', ()=>{
        if(count == 0)
        {
            btn[i].style.backgroundColor = "green"
            for(let j=0;j<rows.length;j++)
            {
                for(let k=0;k<rows[j].getElementsByTagName('td').length;k++)
                {
                    if(i == (j*(rows[j].getElementsByTagName('td').length) + k))
                    {
                        startRow = j
                        startCol = k
                        path.push([startRow, startCol])
                        break
                    }
                }
            }
            count++
        } 
        else if(count == 1)
        {
            btn[i].style.backgroundColor = "red" 
            for(let j=0;j<rows.length;j++)
            {
                for(let k=0;k<rows[j].getElementsByTagName('td').length;k++)
                {
                    if(i == (j*(rows[j].getElementsByTagName('td').length) + k))
                    {
                        destRow = j
                        destCol = k
                        break
                    }
                }
            }
            count++
        }
        else
        {   //blocks
            btn[i].style.backgroundColor = "var(--grid)"
            btn[i].value = '-1'
        }
    })
}


//DFS 
function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
   
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}

const colorizeFindingPath = (sr, sc, t)=>{
    btn[sr*rows[0].getElementsByTagName('td').length + sc].style.animation = `findColor 1s ease-in-out ${t}ms 1 forwards`
}

// const colorizePath = (t)=>{

//     for(let i=0;i<path.length;i++)
//     {
//         let r = path[i][0]
//         let c = path[i][1]
//         if(i == 0)
//         {
//             btn[r*(rows[0].getElementsByTagName('td').length) + c].style.animation = `pathColor 1s ease-in-out ${t}ms 1 forwards`
//             t = 30
//         }
//         else{
//             btn[r*(rows[0].getElementsByTagName('td').length) + c].style.animation = `pathColor 1s ease-in-out ${t}ms 1 forwards`
//             t+=30
//         }
//     }
// }

let time = 10 //ms

const dfs = (sr, sc)=>{
    if(sr == destRow && sc == destCol)
    {
        return true
    }
    if(sr-1 != -1 && btn[(sr-1)*rows[0].getElementsByTagName('td').length + sc].value != '-1' && isArrayInArray(path, [sr-1, sc]) == false)
    {
        path.push([sr-1,sc])
        colorizeFindingPath(sr-1,sc, time)
        time+=10
        let res = dfs(sr-1, sc)
        if(res == true)
        {
            return true
        }
    }
    if(sc+1 != rows[0].getElementsByTagName('td').length && btn[(sr)*rows[0].getElementsByTagName('td').length + (sc+1)].value != '-1' && isArrayInArray(path, [sr, sc+1]) == false)
    {
        path.push([sr,sc+1])
        colorizeFindingPath(sr,sc+1, time)
        time+=10
        let res = dfs(sr, sc+1)
        if(res == true)
        {
            return true
        }
    }
    if(sr+1 != rows.length && btn[(sr+1)*rows[0].getElementsByTagName('td').length + sc].value != '-1' && isArrayInArray(path, [sr+1, sc]) == false)
    {
        path.push([sr+1,sc])
        colorizeFindingPath(sr+1,sc, time)
        time+=10
        let res = dfs(sr+1, sc)
        if(res == true)
        {
            return true
        }
    }
    if(sc-1 != -1 && btn[(sr)*rows[0].getElementsByTagName('td').length + (sc-1)].value != '-1' && isArrayInArray(path, [sr, sc-1]) == false)
    {
        path.push([sr,sc-1])
        colorizeFindingPath(sr,sc-1, time)
        time+=10
        let res = dfs(sr, sc-1)
        if(res == true)
        {
            return true
        }
    }

    path.pop()
    return false
}
    
const visual_btn = document.getElementsByClassName('visualise')[0]

visual_btn.addEventListener('click', function(){
    dfs(startRow, startCol)
    // setTimeout(colorizePath(), 5000)
})

