interface aardioExternal {  
    /** 这是一个 aardio  函数 */
    getFields(str):Promise<string>; 
    getData(str):Promise<string>; 
}

declare var aardio: aardioExternal;

 