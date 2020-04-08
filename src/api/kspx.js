function diedai(i,j,data){
    if(i<j){
        const middleValue = kuaishu(i,j,data)
        console.log(`"设置基准点为${data[i]},并通过函数得到基准点排序后的位置=>${middleValue}"`)
        console.log("此时data的排序：",data)
        diedai(i,middleValue-1,data)
        diedai(middleValue+1,j,data)
    }
}
function kuaishu(i,j,arr){ 
    var reference = arr[i]
    console.log('基准点reference=>',reference)
    while(i<j){
        while(arr[j]>reference&&i<j){
            console.log(`'从右边开始遍历，此时数据${arr[j]}比基准值${reference}大，继续向左移动，${j}减少1'`)
            j--
        }
        arr[i]=arr[j]
        while(arr[i]<=reference&&i<j){
            console.log(`'从左边开始遍历，此时数据${arr[i]}比基准值${reference}小，继续向右移动，${i}加加1'`)
            i++
            
        }
        console.log(`'此时${arr[j]}<基准数，${arr[i]}大于基准数'`)
        arr[j]=arr[i]
      
        console.log(`'此时i=${i},j=${j}'`)
     
        
    }
    arr[i]=reference
    return i
}

module.exports = diedai