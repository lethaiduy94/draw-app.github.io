    var canvas = document.querySelector('#draw');
    var ctx = canvas.getContext('2d');
    var bold = document.querySelector('input[name="bold"]')
    var color = document.querySelector('input[name="color"]')
    var restore_array = []
    var index = -1;
    //chọn màu ngẫu nhiên
    color.addEventListener('input',(e)=>{
        ctx.strokeStyle = e.target.value
        
    })
    // vẽ đường thẳng
    function drawCircle(x, y){
        
        ctx.lineWidth = bold.value;
        ctx.lineCap = 'round'
        ctx.lineTo(x,y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x,y)
    }

    var isMouseHold = false
    canvas.addEventListener('mousedown',(e)=>{
        isMouseHold = true
        drawCircle(e.offsetX,e.offsetY)
       
    })
    canvas.addEventListener('mouseup',(e)=>{
        
            isMouseHold = false
            ctx.beginPath()
            restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height))
            index += 1;
       e.preventDefault()
    })
    canvas.addEventListener('mousemove',(e)=>{
        if(isMouseHold){
            drawCircle(e.offsetX,e.offsetY)
        }
        
    })
   


//chọn màu
function pickColor(){
var colorPicks = document.querySelectorAll('.color__pick')
var colorArray = Array.from(colorPicks).slice()
colorArray.forEach(function(element,index){
    element.onclick = (e) =>{
        var color = e.target.style.backgroundColor
        ctx.strokeStyle = `${color}`;
    }
})
}
pickColor()

//reset lai canvas
var btn = document.querySelector('#clear')
btn.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    restore_array = []
    index = -1;
})
//nut undo
var undo = document.querySelector('#undo')
undo.addEventListener('click',(e)=>{
    if(index <= 0){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    restore_array = []
    index = -1;
    }else{
        index -= 1;
        restore_array.pop()
        ctx.putImageData(restore_array[index],0,0)
    }
})



