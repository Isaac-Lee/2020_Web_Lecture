window.onload = function() {
  var paragraph = document.createElement("p");
  var node1 = document.createTextNode("웹의 표준인 ");
  var node2 = document.createElement("em");
  var textnode = document.createTextNode("HTML5");
  node2.appendChild(textnode);
  var node3 = document.createTextNode("에 대해 ");
  
  paragraph.appendChild(node1);
  paragraph.appendChild(node2);
  paragraph.appendChild(node3);

  document.getElementById('p').appendChild(paragraph);
}