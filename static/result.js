async function click() {
  var a = document.getElementById('data').innerHTML;
  var b= document.getElementById("input").value;
  document.getElementById("input").value="";
  var g= [document.createElement("p"),document.createElement("p")]
  g[0].innerHTML=b;
  g[0].className="qns";
  document.getElementById("ans").appendChild(g[0]);
  g[0].style.animation="show_q 300ms";
  g[1].className="as";
 try {
   const formData = new FormData();
   formData.append("data", a+b+"(answer in 100 characters)");
   const response = await fetch("/query", {
     method: "POST",
     body: formData,
   });
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
   }
   const textResponse = await response.text();
   g[1].innerHTML=textResponse;
   document.getElementById("ans").appendChild(g[1]);
    console.log(textResponse); // Do something with the text response
 } catch (error) {
 	alert(error);
 }
}
function p() {
	click();
}