let inputParam = Number(prompt());
let star = "*";
let blank = "#";
let result = "";

for(var i = 0; i < inputParam; i++) {

    for(var y = inputParam-i; y > 0; y--) {
        result += blank;
    }
    for(var z = 0; z <2*i+1; z++) {
        result += star;
    }
    console.log(result);
    result = "";

}

//     *
//    ***
//   *****
//  *******