const deepClone=(obj)=>{
    if(Object.prototype.toString.call(obj)!=="[object Object]" && !Array.isArray(obj)){
        return obj;
    }
    let data=Array.isArray(obj)?[]:{};
    for(let key in obj){
        data[key]=obj[key];
    }
    return data;
}


(function main(){
    let boolA=new Boolean(true);
    let boolB=deepClone(boolA);
    boolB=false;
    console.log(boolA);
    console.log(boolB);
    let objA={
        a:{b:1,c:{e:1,f:1}},
        d:[1,1,1],
        fn:val=>console.log(val)
    };
    let objB=deepClone(objA);
    objA.fn=val=>console.log("2:",val)
    objB.a.c.e=3;
    objB.d[2]=3;
    objB.fn(123);
    console.log(objA);
    console.log(objB);
})();