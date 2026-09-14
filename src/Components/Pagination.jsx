function getpagenum(current,total){
    const pag=[];
    let start=Math.max(1,current-2);
    let end=Math.min(total,current+2);
    for(let i=start;i<=end;i++){
        pag.push(i);
    }
    return pag;
}


function Pagination({currentpag,totalpag,on_pagchange}){
    return(
        <div className="paginate">
            <button  onClick={()=>on_pagchange(currentpag-1)} disabled={currentpag===1}>
               <b>&lt;</b> 
            </button>
            {getpagenum(currentpag,totalpag).map((pagnum)=>(
                <button key={pagnum}
                onClick={()=>on_pagchange(pagnum)}
                className={currentpag===pagnum?"active-pag":""}>
                    {pagnum}
                </button>
            ))}
            <button onClick={()=>on_pagchange(currentpag+1)} disabled={currentpag===totalpag}>
                <b>&gt;</b>
            </button>
        </div>
    );

}
export default Pagination;