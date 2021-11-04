function chunkArry(arr,len){
  const chunked = [];
  let subArry = [];
  for(let i = 1;i <= arr.length;i++){
    subArry.push(arr[i - 1]);
    if(i % len === 0){
      chunked.push(subArry);
      subArry = [];
    }
  }
  if(subArry.length) chunked.push(subArry);  
  return chunked;
}

module.exports = chunkArry;