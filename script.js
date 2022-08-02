const rows = document.getElementsByTagName('tr')
let startRow
let startCol 
let destRow
let destCol

for(let i=0;i<rows.length;i++)
{
    for(let j=0;j<rows[i].getElementsByTagName('td').length;j++)
    {
        rows[i].getElementsByTagName('td')[j].innerHTML = `<button class="cell-btn" value = 500000></button>`
    }
}


let count = 0
let path = new Array()
let min_heap = new Map()
const btn = document.getElementsByClassName('cell-btn')

for(let i=0;i<btn.length;i++)
{  
    btn[i].addEventListener('click', ()=>{
        if(count == 0)
        {
            btn[i].style.backgroundColor = "green"
            btn[i].value = 0
            
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

const colorizePath = (t=0)=>{

    if(document.getElementsByTagName('select')[0].value != 2)
    {
        for(let i=0;i<path.length;i++)
        {
            let r = path[i][0]
            let c = path[i][1]
            btn[r*(rows[0].getElementsByTagName('td').length) + c].style.animation = `pathColor 1s ease-in-out ${t}ms 1 forwards`
            t+=10
        }
    }
    else
    {
        for(let i=path.length-1;i>-1;i--)
        {
            let r = path[i][0]
            let c = path[i][1]
            btn[r*(rows[0].getElementsByTagName('td').length) + c].style.animation = `pathColor 1s ease-in-out ${t}ms 1 forwards`
            t+=100
        }
    }
    
}


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

let parent = new Map()

function setMaps(){
    for(let i=0;i<rows.length;i++)
    {
        for(let j=0;j<rows[0].getElementsByTagName('td').length;j++)
        {
            if(btn[i*rows[0].getElementsByTagName('td').length + j].value != '-1')
            {
                min_heap.set(`[${i}, ${j}]`, btn[i*rows[0].getElementsByTagName('td').length + j].value)
            }
        }
    }

}




function getByValue(searchValue) {
  for (let [key, value] of min_heap.entries()) {
    if (value == searchValue)
      return key;
  }
}

function findAllAncestors(arr) {
    let p = parent.get(arr)
    if(p != undefined)
    {
        path.push(p)
        findAllAncestors(`[${p[0]}, ${p[1]}]`)
    }
}

const dijkstra = ()=>{
        
    while(min_heap.size != 0)
    {
        let min = Math.min(...min_heap.values()) //min value
        let min_key = getByValue(min)
        let min_key_parsed = JSON.parse(min_key)

        if(min_key !== `[${destRow}, ${destCol}]`)
        {
            
            colorizeFindingPath(min_key_parsed[0], min_key_parsed[1], time)
            time+=10

            if(min_key_parsed[0]-1 != -1)
            {
                if((min_heap.get(min_key) + 1) < min_heap.get(`[${min_key_parsed[0]-1}, ${min_key_parsed[1]}]`))
                {
                    min_heap.set(`[${min_key_parsed[0]-1}, ${min_key_parsed[1]}]`, parseInt(min_heap.get(min_key)) + 1)
                    parent.set(`[${min_key_parsed[0]-1}, ${min_key_parsed[1]}]`, min_key_parsed)
                }
            }
            
            if(min_key_parsed[0]+1 != rows.length)
            {
                if((min_heap.get(min_key) + 1) < min_heap.get(`[${min_key_parsed[0]+1}, ${min_key_parsed[1]}]`))
                {
                    min_heap.set(`[${min_key_parsed[0]+1}, ${min_key_parsed[1]}]`, parseInt(min_heap.get(min_key)) + 1)
                    parent.set(`[${min_key_parsed[0]+1}, ${min_key_parsed[1]}]`, min_key_parsed)
                }
            }
            
            if(min_key_parsed[1]-1 != -1)
            {
                if((min_heap.get(min_key) + 1) < min_heap.get(`[${min_key_parsed[0]}, ${min_key_parsed[1]-1}]`))
                {
                    min_heap.set(`[${min_key_parsed[0]}, ${min_key_parsed[1]-1}]`, parseInt(min_heap.get(min_key)) + 1)
                    parent.set(`[${min_key_parsed[0]}, ${min_key_parsed[1]-1}]`, min_key_parsed)
                }
            }
            
            if(min_key_parsed[1]+1 != rows[0].getElementsByTagName('td').length)
            {
                if((min_heap.get(min_key) + 1) < min_heap.get(`[${min_key_parsed[0]}, ${min_key_parsed[1]+1}]`))
                {
                    min_heap.set(`[${min_key_parsed[0]}, ${min_key_parsed[1]+1}]`, parseInt(min_heap.get(min_key)) + 1)
                    parent.set(`[${min_key_parsed[0]}, ${min_key_parsed[1]+1}]`, min_key_parsed)
                }
            }

            min_heap.delete(min_key)
        }

        else{
            
            path.push([destRow, destCol])
            findAllAncestors(`[${destRow}, ${destCol}]`)
            colorizePath()
            min_heap.clear()
            
        }
    }
}

    
const visual_btn = document.getElementsByClassName('visualise')[0]

visual_btn.addEventListener('click', function(){
    let opt = document.getElementsByTagName('select')[0].value

    if(opt == 1)
    {   //DFS
        dfs(startRow, startCol)
        colorizePath()
    } 
    else if(opt == 2)
    {
        //Dijkstra
        setMaps()
        dijkstra()

    }
})

