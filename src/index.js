
const content = document.querySelector('.content'); 

content.addEventListener('click', function() {
  console.log('content clicked');
  content.innerText += ' ' + helloWorld();
});

function helloWorld() {
  const msg = 'hello world';
  return msg;
}

export default helloWorld();
